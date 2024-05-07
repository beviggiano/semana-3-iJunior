import { Item } from '../model/types';
import { readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import path from 'path'

export class EstoqueService {
    filePath = path.join(__dirname, '../../data/estoque.csv');

    async addItem(item: Item): Promise<void> {
        const items = await readCSV(this.filePath);
        items.push(item);
        await writeCSV(this.filePath, items);
    }

    async removeItem(index: number): Promise<void> {
        let items = await readCSV(this.filePath);
        items = items.filter((_, i) => i !== index);
        await writeCSV(this.filePath, items);
      }

    async listItems(): Promise<Item[]> {
        return readCSV(this.filePath);
    }

    async findItemById(id:number): Promise<Item | undefined> {
        const items = await readCSV(this.filePath);
        return items.find((item,index) => index === id);
    } 

    async totalValue(): Promise<number> {
        const items: Item[] = await readCSV(this.filePath); // criando array de itens 
        return items.reduce((total, item) => total + (item.quantity * item.value), 0); 
    }

    async totalWeight(): Promise<number>{
        const items: Item[] = await readCSV(this.filePath); // criando array de itens 
        return items.reduce((total, item) => total + (item.quantity * item.weight), 0);
    }

    async averageValue(): Promise<number>{
        const items: Item[] = await readCSV(this.filePath); // criando array de itens 
        let totalValue: number = items.reduce((total, item) => total + (item.quantity * item.value), 0); // calcula valor total de itens do invertário 
        let totalItems: number = items.reduce((total, item) => total + item.quantity, 0); // calcula quantidade total de itens no inventário 
        return totalItems > 0 ? totalValue/totalItems : 0; //verificação para evitar divisão pro 0
    }

    async averageWeight(): Promise<number>{
        const items: Item[] = await readCSV(this.filePath); // criando array de itens 
        let totalWeight: number = items.reduce((total, item) => total + (item.quantity * item.weight), 0); // calcula peso total de itens do invertário 
        let totalItems: number = items.reduce((total, item) => total + item.quantity, 0); // calcula quantidade total de itens no inventário 
        return totalItems > 0 ? totalWeight/totalItems : 0; //verificação para evitar divisão pro 0
    }

    async totalItemsQuantity(): Promise<number> {
        const items: Item[] = await readCSV(this.filePath); // criando array de itens 
        return items.reduce((total, item) => total + item.quantity, 0); // calcula quantidade total de itens no inventário 
    }

    async totalProductsQuantity(): Promise<number> {
        const items: Item[] = await readCSV(this.filePath); // criando array de itens 
        return items.length; 
    }

}
