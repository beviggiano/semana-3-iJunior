import { Item } from '../model/types';
import { readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import path from 'path';

export class EstoqueService {
    filePath = path.join(__dirname, '../../data/estoque.csv');

    async addItem(item: Item): Promise<void> {
        try {
            const items = await readCSV(this.filePath);

            if (item.name && item.weight && item.value && item.quantity) {
                items.push(item);
                await writeCSV(this.filePath, items);
            } else {
                throw new Error("Campos inválidos ao adicionar item");
            }
        } catch (error) {
            throw error;
        }
    }

    async removeItem(index: number): Promise<void> {
        try {
            const items = await readCSV(this.filePath);

            if (index >= 0 && index < items.length) {
                const removedItem = items.splice(index, 1)[0];
                await writeCSV(this.filePath, items);
            } else {
                console.error("Índice fora dos limites, nenhuma remoção realizada.");
            }
        } catch (error) {
            throw error;
        }
    }

    async listItems(): Promise<Item[]> {
        try {
            const items: Item[] = await readCSV(this.filePath);
            return items;
        } catch (error) {
            return [];
        }
    }

    async findItemById(id: number): Promise<Item | undefined> {
        try {
            const items = await readCSV(this.filePath);
            return items.find((item, index) => index === id);
        } catch (error) {
            return undefined;
        }
    }

    async totalValue(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath);
            return items.reduce((total, item) => total + (item.quantity * item.value), 0);
        } catch (error) {
            return 0;
        }
    }

    async totalWeight(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath);
            return items.reduce((total, item) => total + (item.quantity * item.weight), 0);
        } catch (error) {
            return 0;
        }
    }

    async averageValue(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath);
            let totalValue: number = items.reduce((total, item) => total + (item.quantity * item.value), 0);
            let totalItems: number = items.reduce((total, item) => total + item.quantity, 0);
            return totalItems > 0 ? totalValue / totalItems : 0;
        } catch (error) {
            return 0;
        }
    }

    async averageWeight(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath);
            let totalWeight: number = items.reduce((total, item) => total + (item.quantity * item.weight), 0);
            let totalItems: number = items.reduce((total, item) => total + item.quantity, 0);
            return totalItems > 0 ? totalWeight / totalItems : 0;
        } catch (error) {
            return 0;
        }
    }

    async totalItemsQuantity(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath);
            return items.reduce((total, item) => total + item.quantity, 0);
        } catch (error) {
            return 0;
        }
    }

    async totalProductsQuantity(): Promise<number> {
        try {
            const items: Item[] = await readCSV(this.filePath);
            return items.length;
        } catch (error) {
            return 0;
        }
    }
}
