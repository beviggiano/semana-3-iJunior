import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { Item } from './types';

export const readCSV = async (filePath: string): Promise<Item[]> => {
  const results: Item[] = [];
  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: Item) => {
        console.log("Dado lido:", data); // Log cada item lido
        results.push(data);
      })
      .on('end', () => {
        console.log("Leitura completa. Total de itens lidos:", results.length);
        resolve(results);
      })
      .on('error', (error) => {
        console.error("Erro na leitura do CSV:", error);
        reject(error);
      });
  });
};
