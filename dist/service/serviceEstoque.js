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
        const items = await (0, readCSV_1.readCSV)(this.filePath);
        items.push(item);
        await (0, writeCSV_1.writeCSV)(this.filePath, items);
    }
    async removeItem(index) {
        let items = await (0, readCSV_1.readCSV)(this.filePath);
        items = items.filter((_, i) => i !== index);
        await (0, writeCSV_1.writeCSV)(this.filePath, items);
    }
    async listItems() {
        return (0, readCSV_1.readCSV)(this.filePath);
    }
    async findItemById(id) {
        const items = await (0, readCSV_1.readCSV)(this.filePath);
        return items.find((item, index) => index === id);
    }
    async totalValue() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // criando array de itens 
        return items.reduce((total, item) => total + (item.quantity * item.value), 0);
    }
    async totalWeight() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // criando array de itens 
        return items.reduce((total, item) => total + (item.quantity * item.weight), 0);
    }
    async averageValue() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // criando array de itens 
        let totalValue = items.reduce((total, item) => total + (item.quantity * item.value), 0); // calcula valor total de itens do invertário 
        let totalItems = items.reduce((total, item) => total + item.quantity, 0); // calcula quantidade total de itens no inventário 
        return totalItems > 0 ? totalValue / totalItems : 0; //verificação para evitar divisão pro 0
    }
    async averageWeight() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // criando array de itens 
        let totalWeight = items.reduce((total, item) => total + (item.quantity * item.weight), 0); // calcula peso total de itens do invertário 
        let totalItems = items.reduce((total, item) => total + item.quantity, 0); // calcula quantidade total de itens no inventário 
        return totalItems > 0 ? totalWeight / totalItems : 0; //verificação para evitar divisão pro 0
    }
    async totalItemsQuantity() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // criando array de itens 
        return items.reduce((total, item) => total + item.quantity, 0); // calcula quantidade total de itens no inventário 
    }
    async totalProductsQuantity() {
        const items = await (0, readCSV_1.readCSV)(this.filePath); // criando array de itens 
        return items.length;
    }
}
exports.EstoqueService = EstoqueService;
