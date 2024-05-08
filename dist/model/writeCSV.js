"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCSV = void 0;
const fs_1 = require("fs");
const writeCSV = async (filePath, items) => {
    try {
        console.log("Iniciando escrita no arquivo CSV...");
        // Gere a string CSV para o novo item
        const newItemCsv = `${items[items.length - 1].name},${items[items.length - 1].weight},${items[items.length - 1].value},${items[items.length - 1].quantity}`;
        // Verifique se o arquivo CSV já contém itens
        const fileExists = await fs_1.promises.access(filePath)
            .then(() => true)
            .catch(() => false);
        // Se o arquivo existir e já contiver itens, apenas adicione o novo item
        if (fileExists) {
            await fs_1.promises.appendFile(filePath, '\n' + newItemCsv);
        }
        else {
            // Caso contrário, adicione o cabeçalho junto com o novo item
            const header = 'Name,Weight,Value,Quantity';
            await fs_1.promises.writeFile(filePath, header + '\n' + newItemCsv);
        }
        console.log("Escrita concluída.");
    }
    catch (error) {
        console.error("Erro na escrita do CSV:", error);
        throw error;
    }
};
exports.writeCSV = writeCSV;
