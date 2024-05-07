import { createObjectCsvWriter } from 'csv-writer';
import { Item } from './types';

export const writeCSV = async (filePath: string, records: Item[]): Promise<void> => {
  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      {id: 'name', title: 'Name'},
      {id: 'weight', title: 'Weight'},
      {id: 'value', title: 'Value'},
      {id: 'quantity', title: 'Quantity'}
    ],
    append: true // Garanta que isso está configurado para true se quiser adicionar ao arquivo existente
  });

  console.log("Escrevendo para o CSV. Número de registros:", records.length);
  await csvWriter.writeRecords(records)
    .then(() => console.log("Escrita completa."))
    .catch((error) => console.error("Erro ao escrever no CSV:", error));
};
