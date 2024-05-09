"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const readCSV_1 = require("../model/readCSV");
const writeCSV_1 = require("../model/writeCSV");
const path_1 = __importDefault(require("path"));
class EstoqueService {
    filePath = path_1.default.join(__dirname, '../../data/estoque.csv');
    // Método para adicionar um item
    async addItem(item) {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        if (item.name && item.weight && item.value && item.quantity) { // Verifica se o item tem todos os campos necessários
            items.push(item); // Adiciona o novo item à lista existente
            await (0, writeCSV_1.writeCSV)(this.filePath, items); // Escreve os itens de volta no arquivo CSV
        }
        else {
            throw new Error("Campos inválidos ao adicionar item"); // Lança um erro se os campos estiverem ausentes
        }
    }
    // Método para remover um item pelo índice
    async removeItem(index) {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        if (index >= 0 && index < items.length) { // Verifica se o índice está dentro dos limites
            const removedItem = items.splice(index, 1)[0]; // Remove o item do array
            await (0, writeCSV_1.writeCSV)(this.filePath, items); // Escreve os itens atualizados de volta no arquivo CSV
        }
        else {
            console.error("Índice fora dos limites, nenhuma remoção realizada."); // Exibe um erro se o índice estiver fora dos limites
        }
    }
    // Método para listar todos os itens
    async listItems() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        return items; // Retorna a lista de itens
    }
    // Método para encontrar um item pelo ID
    async findItemById(id) {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        return items.find((item, index) => index === id); // Retorna o item encontrado pelo ID
    }
    // Método para calcular o valor total dos itens em estoque
    async totalValue() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        return items.reduce((total, item) => total + (item.quantity * item.value), 0); // Calcula o valor total
    }
    // Método para calcular o peso total dos itens em estoque
    async totalWeight() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        return items.reduce((total, item) => total + (item.quantity * item.weight), 0); // Calcula o peso total
    }
    // Método para calcular o valor médio dos itens em estoque
    async averageValue() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        let totalValue = items.reduce((total, item) => total + (item.quantity * item.value), 0); // Calcula o valor total
        let totalItems = items.reduce((total, item) => total + item.quantity, 0); // Calcula o total de itens
        return totalItems > 0 ? totalValue / totalItems : 0; // Calcula o valor médio, se houver itens
    }
    // Método para calcular o peso médio dos itens em estoque
    async averageWeight() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        let totalWeight = items.reduce((total, item) => total + (item.quantity * item.weight), 0); // Calcula o peso total
        let totalItems = items.reduce((total, item) => total + item.quantity, 0); // Calcula o total de itens
        return totalItems > 0 ? totalWeight / totalItems : 0; // Calcula o peso médio, se houver itens
    }
    // Método para calcular a quantidade total de itens em estoque
    async totalItemsQuantity() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        return items.reduce((total, item) => total + item.quantity, 0); // Calcula a quantidade total de itens
    }
    // Método para calcular a quantidade total de produtos em estoque
    async totalProductsQuantity() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // Lê os itens do arquivo CSV
        return items.length; // Retorna o tamanho do array de itens, que representa a quantidade de produtos
    }
}
exports.EstoqueService = EstoqueService;
