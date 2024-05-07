import { Item } from '../model/types';
import { readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import path from 'path'

export class EstoqueService {
    filePath = path.join(__dirname, '../../data/estoque.csv');

    async addItem(item: Item): Promise<void> {
        const items = (await readCSV(this.filePath)).filter(i => i && i.name && i.weight && i.value && i.quantity); // Limpa itens inválidos
        if (item.name && item.weight && item.value && item.quantity) {
            items.push(item);
            await writeCSV(this.filePath, items);
        } else {
            console.error("Erro ao adicionar item: Campos inválidos", item);
        }
    }        

    async removeItem(index: number): Promise<void> {
        const items = await readCSV(this.filePath);  // Leia todos os itens
        if (index >= 0 && index < items.length) {
            items.splice(index, 1);  // Remove o item do array pelo índice
            await writeCSV(this.filePath, items);  // Escreve o array atualizado de volta ao CSV
            console.log(`Item no índice ${index} removido.`);
        } else {
            console.error("Índice fora dos limites, nenhuma remoção realizada.");
        }
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
