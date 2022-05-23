const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        console.log('Inicializando llamado a bd');
        await mongoose.connect('mongodb://inventarios:oJ3hs5dgn1ohgrKr@clusterinventarios-shard-00-00.frv0y.mongodb.net:27017,clusterinventarios-shard-00-01.frv0y.mongodb.net:27017,clusterinventarios-shard-00-02.frv0y.mongodb.net:27017/inventariosdb?ssl=true&replicaSet=atlas-l192xm-shard-0&authSource=admin&retryWrites=true&w=majority');
        console.log('Estoy conectado');
    } catch(error) {
        console.log('Fallo la conexión a la base de datos');
    }
}

module.exports = {
    getConnection,
}