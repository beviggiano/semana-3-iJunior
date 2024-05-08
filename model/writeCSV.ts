import { promises as fsPromises } from 'fs';
import { Item } from './types';

export const writeCSV = async (filePath: string, items: Item[]): Promise<void> => {
  try {
    console.log("Iniciando escrita no arquivo CSV...");

    // Gere a string CSV para o novo item
    const newItemCsv = `${items[items.length - 1].name},${items[items.length - 1].weight},${items[items.length - 1].value},${items[items.length - 1].quantity}`;
    
    // Verifique se o arquivo CSV já contém itens
    const fileExists = await fsPromises.access(filePath)
      .then(() => true)
      .catch(() => false);

    // Se o arquivo existir e já contiver itens, apenas adicione o novo item
    if (fileExists) {
      await fsPromises.appendFile(filePath, '\n' + newItemCsv);
    } else {
      // Caso contrário, adicione o cabeçalho junto com o novo item
      const header = 'Name,Weight,Value,Quantity';
      await fsPromises.writeFile(filePath, header + '\n' + newItemCsv);
    }

    console.log("Escrita concluída.");
  } catch (error) {
    console.error("Erro na escrita do CSV:", error);
    throw error;
  }
};
