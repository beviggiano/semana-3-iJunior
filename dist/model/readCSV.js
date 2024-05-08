"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCSV = void 0;
const fs_1 = require("fs");
const readCSV = async (filePath) => {
    const results = [];
    return new Promise((resolve, reject) => {
        fs_1.promises.readFile(filePath, 'utf-8')
            .then((data) => {
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
exports.readCSV = readCSV;
