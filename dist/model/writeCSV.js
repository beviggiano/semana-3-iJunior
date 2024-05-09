"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCSV = void 0;
const fs_1 = require("fs");
const writeCSV = async (filePath, items) => {
    try {
        // Preparar o cabeçalho e os dados em formato CSV
        const header = 'Name,Weight,Value,Quantity';
        const data = items.map(item => `${item.name},${item.weight},${item.value},${item.quantity}`).join('\n');
        // Combina o cabeçalho com os dados
        const csvContent = `${header}\n${data}`;
        // Escreve todo o conteúdo de uma vez, substituindo o arquivo existente
        await fs_1.promises.writeFile(filePath, csvContent, 'utf8');
    }
    catch (error) {
        throw error;
    }
};
exports.writeCSV = writeCSV;
