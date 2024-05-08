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
            const items = (await (0, readCSV_1.readCSV)(this.filePath)).filter(i => i && i.name && i.weight && i.value && i.quantity); // Limpa itens inválidos
            if (item.name && item.weight && item.value && item.quantity) {
                items.push(item);
                await (0, writeCSV_1.writeCSV)(this.filePath, items);
            }
            else {
                throw new Error("Campos inválidos ao adicionar item");
            }
        }
        catch (error) {
            console.error("Erro ao adicionar item:", error);
        }
    }
    async removeItem(index) {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath); // Leia todos os itens
            if (index >= 0 && index < items.length) {
                items.splice(index, 1); // Remove o item do array pelo índice
                await (0, writeCSV_1.writeCSV)(this.filePath, items); // Escreve o array atualizado de volta ao CSV
                console.log(`Item no índice ${index} removido.`);
            }
            else {
                throw new Error("Índice fora dos limites, nenhuma remoção realizada.");
            }
        }
        catch (error) {
            console.error("Erro ao remover item:", error);
        }
    }
    async listItems() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            console.log("Itens lidos:", items); // Verifique se os itens estão sendo lidos corretamente
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
