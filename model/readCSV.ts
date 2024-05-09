import { promises as fsPromises } from 'fs'; 
import csv from 'csv-parser'; 
import { Item } from './types'; 

// Função para ler o arquivo CSV e retornar uma lista de itens
export const readCSV = async (filePath: string): Promise<Item[]> => { 
  const results: Item[] = []; // Inicializa um array vazio para armazenar os itens lidos
  return new Promise((resolve, reject) => { // Retorna uma nova Promise para operações assíncronas
    fsPromises.readFile(filePath, 'utf-8') // Lê o conteúdo do arquivo CSV
      .then((data: string) => { // Quando a leitura é concluída com sucesso
        const lines = data.trim().split('\n'); // Divide as linhas do arquivo
        for (let i = 1; i < lines.length; i++) { // Itera sobre as linhas, começando da segunda linha (a primeira é o cabeçalho)
          const line = lines[i].trim(); // Remove espaços em branco da linha
          const [name, weight, value, quantity] = line.split(','); // Divide a linha em campos com base na vírgula
          if (name && weight && value && quantity) { // Verifica se todos os campos estão presentes
            results.push({ // Adiciona um novo objeto Item ao array results
              name: name.trim(), // Define o nome do item
              weight: parseFloat(weight.trim()), // Converte o peso para um número decimal
              value: parseFloat(value.trim()), // Converte o valor para um número decimal
              quantity: parseInt(quantity.trim()) // Converte a quantidade para um número inteiro
            });
          }
        }
        resolve(results); // Resolve a Promise com a lista de itens lidos
      })
      .catch((error) => { // Se houver um erro durante a leitura do arquivo
        console.error("Erro na leitura do CSV:", error); // Exibe o erro
        reject(error); // Rejeita a Promise com o erro
      });
  });
};
