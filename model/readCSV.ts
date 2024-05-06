import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { Item } from './types';

export const readCSV = async (filePath: string): Promise<Item[]> => {
    const results: Item[] = [];
    return new Promise((resolve, reject) => {
      createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: Item) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  };
