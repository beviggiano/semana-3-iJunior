import { readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
export class EstoqueService {
    filePath = '../data/estoque.csv';
    async addItem(item) {
        const items = await readCSV(this.filePath);
        items.push(item);
        await writeCSV(this.filePath, items);
    }
    async removeItem(index) {
        let items = await readCSV(this.filePath);
        items = items.filter((_, i) => i !== index);
        await writeCSV(this.filePath, items);
    }
    async listItems() {
        return readCSV(this.filePath);
    }
    async findItemById(id) {
        const items = await readCSV(this.filePath);
        return items.find((item, index) => index === id);
    }
    async totalValue() {
        const items = await readCSV(this.filePath); // criando array de itens 
        return items.reduce((total, item) => total + (item.quantity * item.value), 0);
    }
    async totalWeight() {
        const items = await readCSV(this.filePath); // criando array de itens 
        return items.reduce((total, item) => total + (item.quantity * item.weight), 0);
    }
    async averageValue() {
        const items = await readCSV(this.filePath); // criando array de itens 
        let totalValue = items.reduce((total, item) => total + (item.quantity * item.value), 0); // calcula valor total de itens do invertário 
        let totalItems = items.reduce((total, item) => total + item.quantity, 0); // calcula quantidade total de itens no inventário 
        return totalItems > 0 ? totalValue / totalItems : 0; //verificação para evitar divisão pro 0
    }
    async averageWeight() {
        const items = await readCSV(this.filePath); // criando array de itens 
        let totalWeight = items.reduce((total, item) => total + (item.quantity * item.weight), 0); // calcula peso total de itens do invertário 
        let totalItems = items.reduce((total, item) => total + item.quantity, 0); // calcula quantidade total de itens no inventário 
        return totalItems > 0 ? totalWeight / totalItems : 0; //verificação para evitar divisão pro 0
    }
    async totalItemsQuantity() {
        const items = await readCSV(this.filePath); // criando array de itens 
        return items.reduce((total, item) => total + item.quantity, 0); // calcula quantidade total de itens no inventário 
    }
    async totalProductsQuantity() {
        const items = await readCSV(this.filePath); // criando array de itens 
        return items.length;
    }
}
