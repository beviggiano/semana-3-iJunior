import { promises as fsPromises } from 'fs';
import { Item } from './types';

export const writeCSV = async (filePath: string, items: Item[]): Promise<void> => {
  try {
    console.log("Iniciando reescrita do arquivo CSV...");

    // Preparar o cabeçalho e os dados em formato CSV
    const header = 'Name,Weight,Value,Quantity';
    const data = items.map(item => `${item.name},${item.weight},${item.value},${item.quantity}`).join('\n');

    // Combina o cabeçalho com os dados
    const csvContent = `${header}\n${data}`;

    // Escreve todo o conteúdo de uma vez, substituindo o arquivo existente
    await fsPromises.writeFile(filePath, csvContent, 'utf8');
    
    console.log("Arquivo CSV atualizado com sucesso.");
  } catch (error) {
    console.error("Erro na reescrita do CSV:", error);
    throw error;
  }
};
