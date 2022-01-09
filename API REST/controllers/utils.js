const moment = require('moment');
const os = require('os');

const getHostInfo = () => {
    let date = moment().format('Do MMMM YYYY, h:mm:ss a');
    let hostInfo = `Fecha: ${date}\nHost: ${os.hostname()}\nSistema Operativo: ${os.type()}\nArquitectura: ${os.arch()}\nMemoria: ${os.totalmem()}\nServidor: NodeJS ${process.version}\n`;
    return hostInfo;
}


module.exports = {
    getHostInfo
}