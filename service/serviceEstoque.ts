import { Item } from '../model/types';
import { readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import path from 'path';

export class EstoqueService {
    filePath = path.join(__dirname, '../../data/estoque.csv');

    async addItem(item: Item): Promise<void> {
        try {
            // Leia todos os itens do arquivo CSV
            const items = await readCSV(this.filePath);

            // Verifique se o novo item tem todos os campos necessários
            if (item.name && item.weight && item.value && item.quantity) {
                // Adicione o novo item ao final da lista de itens existentes
                items.push(item);
                
                // Escreva a lista atualizada de itens de volta ao arquivo CSV
                await writeCSV(this.filePath, items);
                
                console.log("Item adicionado com sucesso:", item);
            } else {
                throw new Error("Campos inválidos ao adicionar item");
            }
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
            throw error;
        }
    }

    async removeItem(index: number): Promise<void> {
        try {
            console.log("Iniciando remoção do item no índice:", index);

            // Leia todos os itens do arquivo CSV
            const items = await readCSV(this.filePath);
            console.log("Itens atuais no estoque:", items);

            // Verifique se o índice está dentro dos limites
            if (index >= 0 && index < items.length) {
                // Remova o item do array pelo índice
                const removedItem = items.splice(index, 1)[0];
                console.log("Item removido:", removedItem);

                // Escreva o array atualizado de volta ao CSV
                await writeCSV(this.filePath, items);
                console.log("Lista de itens atualizada com sucesso.");
            } else {
                console.error("Índice fora dos limites, nenhuma remoção realizada.");
            }
        } catch (error) {
            console.error("Erro ao remover item:", error);
            throw error;
        }
    }

    async listItems(): Promise<Item[]> {
        try {
            const items: Item[] = await readCSV(this.filePath);
            return items;
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
