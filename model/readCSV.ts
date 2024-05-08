import { promises as fsPromises } from 'fs';
import csv from 'csv-parser';
import { Item } from './types';

export const readCSV = async (filePath: string): Promise<Item[]> => {
  const results: Item[] = [];
  return new Promise((resolve, reject) => {
    fsPromises.readFile(filePath, 'utf-8')
      .then((data: string) => {
        const lines = data.trim().split('\n');
        for (let i = 1; i < lines.length; i++) { 
          const line = lines[i].trim();
          const [name, weight, value, quantity] = line.split(',');
          if (name && weight && value && quantity) {
            results.push({
              name: name.trim(),
              weight: parseFloat(weight.trim()),
              value: parseFloat(value.trim()),
              quantity: parseInt(quantity.trim())
            });
          }
        }
        resolve(results);
      })
      .catch((error) => {
        console.error("Erro na leitura do CSV:", error);
        reject(error);
      });
  });
};
