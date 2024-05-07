"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCSV = void 0;
const fs_1 = require("fs");
const csv_parser_1 = __importDefault(require("csv-parser"));
const readCSV = async (filePath) => {
    const results = [];
    return new Promise((resolve, reject) => {
        (0, fs_1.createReadStream)(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => {
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
exports.readCSV = readCSV;
