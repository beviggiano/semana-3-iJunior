import { createObjectCsvWriter } from 'csv-writer';
export const writeCSV = async (filePath, records) => {
    const csvWriter = createObjectCsvWriter({
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
