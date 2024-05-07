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
        append: false // false -> substituir o arquivo existente; true -> adicionar ao existente
    });
    await csvWriter.writeRecords(records); // escreve os dados no arquivo CSV
};
exports.writeCSV = writeCSV;
