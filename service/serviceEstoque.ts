import { Item } from '../model/types';
import { readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import path from 'path';

export class EstoqueService {
    filePath = path.join(__dirname, '../../data/estoque.csv');

    async addItem(item: Item): Promise<void> {
        try {
            const items = (await readCSV(this.filePath)).filter(i => i && i.name && i.weight && i.value && i.quantity); // Limpa itens inválidos
            if (item.name && item.weight && item.value && item.quantity) {
                items.push(item);
                await writeCSV(this.filePath, items);
            } else {
                throw new Error("Campos inválidos ao adicionar item");
            }
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
        }
    }

    async removeItem(index: number): Promise<void> {
        try {
            const items = await readCSV(this.filePath);  // Leia todos os itens
            if (index >= 0 && index < items.length) {
                items.splice(index, 1);  // Remove o item do array pelo índice
                await writeCSV(this.filePath, items);  // Escreve o array atualizado de volta ao CSV
                console.log(`Item no índice ${index} removido.`);
            } else {
                throw new Error("Índice fora dos limites, nenhuma remoção realizada.");
            }
        } catch (error) {
            console.error("Erro ao remover item:", error);
        }
    }

    async listItems(): Promise<Item[]> {
        try {
            return await readCSV(this.filePath);
        } catch (error) {
            console.error("Erro ao listar itens:", error);
            return [];
        }
    }

    async findItemById(id: number): Promise<Item | undefined> {
        try {
            const items = await readCSV(this.filePath);
            return items.find((item, index) => index === id);
        } catch (error) {
            console.error("Erro ao encontrar item:", error);
            return undefined;
        }
    }

    async totalValue(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath); // Criando array de itens 
            return items.reduce((total, item) => total + (item.quantity * item.value), 0);
        } catch (error) {
            console.error("Erro ao calcular o valor total:", error);
            return 0;
        }
    }

    async totalWeight(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath); // Criando array de itens 
            return items.reduce((total, item) => total + (item.quantity * item.weight), 0);
        } catch (error) {
            console.error("Erro ao calcular o peso total:", error);
            return 0;
        }
    }

    async averageValue(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath); // Criando array de itens 
            let totalValue: number = items.reduce((total, item) => total + (item.quantity * item.value), 0);
            let totalItems: number = items.reduce((total, item) => total + item.quantity, 0);
            return totalItems > 0 ? totalValue / totalItems : 0;
        } catch (error) {
            console.error("Erro ao calcular o valor médio:", error);
            return 0;
        }
    }

    async averageWeight(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath); // Criando array de itens 
            let totalWeight: number = items.reduce((total, item) => total + (item.quantity * item.weight), 0);
            let totalItems: number = items.reduce((total, item) => total + item.quantity, 0);
            return totalItems > 0 ? totalWeight / totalItems : 0;
        } catch (error) {
            console.error("Erro ao calcular o peso médio:", error);
            return 0;
        }
    }

    async totalItemsQuantity(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath); // Criando array de itens 
            return items.reduce((total, item) => total + item.quantity, 0);
        } catch (error) {
            console.error("Erro ao calcular a quantidade total de itens:", error);
            return 0;
        }
    }

    async totalProductsQuantity(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath); // Criando array de itens 
            return items.length;
        } catch (error) {
            console.error("Erro ao calcular a quantidade total de produtos:", error);
            return 0;
        }
    }}
