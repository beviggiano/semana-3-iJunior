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
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            if (item.name && item.weight && item.value && item.quantity) {
                items.push(item);
                await (0, writeCSV_1.writeCSV)(this.filePath, items);
            }
            else {
                throw new Error("Campos inválidos ao adicionar item");
            }
        }
        catch (error) {
            throw error;
        }
    }
    async removeItem(index) {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            if (index >= 0 && index < items.length) {
                const removedItem = items.splice(index, 1)[0];
                await (0, writeCSV_1.writeCSV)(this.filePath, items);
            }
            else {
                console.error("Índice fora dos limites, nenhuma remoção realizada.");
            }
        }
        catch (error) {
            throw error;
        }
    }
    async listItems() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            return items;
        }
        catch (error) {
            return [];
        }
    }
    async findItemById(id) {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            return items.find((item, index) => index === id);
        }
        catch (error) {
            return undefined;
        }
    }
    async totalValue() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            return items.reduce((total, item) => total + (item.quantity * item.value), 0);
        }
        catch (error) {
            return 0;
        }
    }
    async totalWeight() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            return items.reduce((total, item) => total + (item.quantity * item.weight), 0);
        }
        catch (error) {
            return 0;
        }
    }
    async averageValue() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            let totalValue = items.reduce((total, item) => total + (item.quantity * item.value), 0);
            let totalItems = items.reduce((total, item) => total + item.quantity, 0);
            return totalItems > 0 ? totalValue / totalItems : 0;
        }
        catch (error) {
            return 0;
        }
    }
    async averageWeight() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            let totalWeight = items.reduce((total, item) => total + (item.quantity * item.weight), 0);
            let totalItems = items.reduce((total, item) => total + item.quantity, 0);
            return totalItems > 0 ? totalWeight / totalItems : 0;
        }
        catch (error) {
            return 0;
        }
    }
    async totalItemsQuantity() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            return items.reduce((total, item) => total + item.quantity, 0);
        }
        catch (error) {
            return 0;
        }
    }
    async totalProductsQuantity() {
        try {
            const items = await (0, readCSV_1.readCSV)(this.filePath);
            return items.length;
        }
        catch (error) {
            return 0;
        }
    }
}
exports.EstoqueService = EstoqueService;
