import axios from "axios";
import express from "express";

const urlApiExterna = 'https://jsonplaceholder.typicode.com/users'

export const importUsersService = (async (prisma) => {

    try {
        console.log('Buscando dados de usuários no JSONPlaceholder...');
        const response = await axios.get(urlApiExterna)
        const usersFromApi = response.data

        console.log(`Encontrados ${usersFromApi.length} usuários para importar.`);

        for (const user of usersFromApi) {
            try {
                console.log(`Processando usuário ID: ${user.id} - Nome: ${user.name}`);
                //Retira de usersFromApi os dados de companhia da API externa e salva ou atualiza no banco de dados.
                const savedCompany = await prisma.company.upsert({
                    where: {
                        name: user.company.name || '',
                    },
                    update: {
                        catchPhrase: user.company.catchPhrase,
                        bs: user.company.bs,
                    },
                    create: {
                        name: user.company.name,
                        catchPhrase: user.company.catchPhrase,
                        bs: user.company.bs,
                    },
                });
                // Coleta o ID da companhia que foi criada ou encontrada.
                const companyId = savedCompany.id;
                console.log(`  Companhia (${user.company.name}) salva com ID: ${companyId}`);
                
                //Retira de usersFromApi os dados de Geo da API externa e salva ou atualiza no banco de dados.
                const savedGeo = await prisma.geo.upsert({
                    where: {
                        lat_lng: {
                            lat: user.address.geo.lat || '',
                            lng: user.address.geo.lng || '',
                        },
                    },
                    update: {
                        lat: user.address.geo.lat,
                        lng: user.address.geo.lng,
                    },
                    create: {
                        lat: user.address.geo.lat,
                        lng: user.address.geo.lng,
                    },
                });
                // Coleta o ID da geolocalização que foi criada ou encontrada.
                const geoId = savedGeo.id;
                console.log(`  Geo (lat:${user.address.geo.lat}, lng:${user.address.geo.lng}) salva com ID: ${geoId}`);

                //Retira de usersFromApi os dados de endereço da API externa e salva ou atualiza no banco de dados.
                const savedAddress = await prisma.address.upsert({
                    where: {
                        geoId: geoId,
                    },
                    update: {
                        street: user.address.street,
                        suite: user.address.suite,
                        city: user.address.city,
                        zipcode: user.address.zipcode,
                        geoId: geoId,
                    },
                    create: {
                        street: user.address.street,
                        suite: user.address.suite,
                        city: user.address.city,
                        zipcode: user.address.zipcode,
                        geoId: geoId,
                    },
                });
                // Coleta o ID do endereço que foi criado ou encontrado.
                const addressId = savedAddress.id;
                console.log(`  Endereço (${user.address.street}) salvo com ID: ${addressId}`);

                //Retira de usersFromApi os dados de usuario da API externa e salva ou atualiza no banco de dados.
                await prisma.user.upsert({
                    where: {
                        id: user.id,
                    },
                    update: {
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        website: user.website,
                        companyId: companyId,
                        addressId: addressId,
                    },
                    create: {
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        website: user.website,
                        companyId: companyId,
                        addressId: addressId,
                    },
                });
                console.log(`  Usuário (${user.name}) salvo/atualizado.`);

            } catch (userError) {
                // Em caso de erro ao processar um usuário específico, loga o erro
                // e continua para o próximo usuário.
                console.error(`!!!! Erro ao processar o usuário ${user.id} (${user.name}):`, userError);
            }
        }

        // 3. Enviando uma resposta de sucesso após todos os usuários serem processados
        console.log('Importação de todos os usuários concluída.');
        return { success: true, message: 'Importação de usuários concluída com sucesso!' };

    } catch (apiError) {
        // 4. Tratando erros gerais (ex: falha na requisição ao JSONPlaceholder, erro de DB inesperado)
        console.error('!!!! Erro geral durante a importação:', apiError);
        throw new Error('Falha na importação dos usuários. Verifique os logs do servidor.');
    }
});