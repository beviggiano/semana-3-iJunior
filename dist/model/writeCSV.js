"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCSV = void 0;
const csv_writer_1 = require("csv-writer");
const writeCSV = async (filePath, records) => {
    const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
        path: filePath,
        header: [
            { id: 'name', title: 'Name' },
            { id: 'weight', title: 'Weight' },
            { id: 'value', title: 'Value' },
            { id: 'quantity', title: 'Quantity' }
        ],
        append: true // Garanta que isso está configurado para true se quiser adicionar ao arquivo existente
    });
    console.log("Escrevendo para o CSV. Número de registros:", records.length);
    await csvWriter.writeRecords(records)
        .then(() => console.log("Escrita completa."))
        .catch((error) => console.error("Erro ao escrever no CSV:", error));
};
exports.writeCSV = writeCSV;
