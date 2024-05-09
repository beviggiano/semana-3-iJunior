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
    async addItem(item) {
        try {
            // Leia todos os itens do arquivo CSV
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            // Verifique se o novo item tem todos os campos necessários
            if (item.name && item.weight && item.value && item.quantity) {
                // Adicione o novo item ao final da lista de itens existentes
                items.push(item);
                // Escreva a lista atualizada de itens de volta ao arquivo CSV
                await (0, writeCSV_1.writeCSV)(this.filePath, items);
                console.log("Item adicionado com sucesso:", item);
            }
            else {
                throw new Error("Campos inválidos ao adicionar item");
            }
        }
        catch (error) {
            console.error("Erro ao adicionar item:", error);
            throw error;
        }
    }
    async removeItem(index) {
        try {
            console.log("Iniciando remoção do item no índice:", index);
            //Lendo todos os itens do arquivo CSV
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            console.log("Itens atuais no estoque:", items);
            //Verificando se o índice está dentro dos limites
            if (index >= 0 && index < items.length) {
                //Removendo o item do array pelo índice
                const removedItem = items.splice(index, 1)[0];
                console.log("Item removido:", removedItem);
                console.log("Itens após a remoção:", items);
                //Escrevendo o array atualizado de volta ao CSV
                await (0, writeCSV_1.writeCSV)(this.filePath, items);
                console.log("Lista de itens atualizada com sucesso.");
            }
            else {
                console.error("Índice fora dos limites, nenhuma remoção realizada.");
            }
        }
        catch (error) {
            console.error("Erro ao remover item:", error);
            throw error;
        }
    }
    async listItems() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            return items;
        }
        catch (error) {
            console.error("Erro ao listar itens:", error);
            return [];
        }
    }
    async findItemById(id) {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            return items.find((item, index) => index === id);
        }
        catch (error) {
            console.error("Erro ao encontrar item:", error);
            return undefined;
        }
    }
    async totalValue() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath); // Criando array de itens 
            return items.reduce((total, item) => total + (item.quantity * item.value), 0);
        }
        catch (error) {
            console.error("Erro ao calcular o valor total:", error);
            return 0;
        }
    }
    async totalWeight() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath); // Criando array de itens 
            return items.reduce((total, item) => total + (item.quantity * item.weight), 0);
        }
        catch (error) {
            console.error("Erro ao calcular o peso total:", error);
            return 0;
        }
    }
    async averageValue() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath); // Criando array de itens 
            let totalValue = items.reduce((total, item) => total + (item.quantity * item.value), 0);
            let totalItems = items.reduce((total, item) => total + item.quantity, 0);
            return totalItems > 0 ? totalValue / totalItems : 0;
        }
        catch (error) {
            console.error("Erro ao calcular o valor médio:", error);
            return 0;
        }
    }
    async averageWeight() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath); // Criando array de itens 
            let totalWeight = items.reduce((total, item) => total + (item.quantity * item.weight), 0);
            let totalItems = items.reduce((total, item) => total + item.quantity, 0);
            return totalItems > 0 ? totalWeight / totalItems : 0;
        }
        catch (error) {
            console.error("Erro ao calcular o peso médio:", error);
            return 0;
        }
    }
    async totalItemsQuantity() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath); // Criando array de itens 
            return items.reduce((total, item) => total + item.quantity, 0);
        }
        catch (error) {
            console.error("Erro ao calcular a quantidade total de itens:", error);
            return 0;
        }
    }
    async totalProductsQuantity() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath); // Criando array de itens 
            return items.length;
        }
        catch (error) {
            console.error("Erro ao calcular a quantidade total de produtos:", error);
            return 0;
        }
    }
}
exports.EstoqueService = EstoqueService;
