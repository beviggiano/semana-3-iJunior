import { createReadStream } from 'fs';
import csv from 'csv-parser';
export const readCSV = async (filePath) => {
    const results = [];
    return new Promise((resolve, reject) => {
        createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};
