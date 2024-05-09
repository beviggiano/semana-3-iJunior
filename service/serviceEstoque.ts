import { Item } from '../model/types';
import { readCSV } from '../model/readCSV';
import { writeCSV } from '../model/writeCSV';
import path from 'path';

export class EstoqueService {
    filePath = path.join(__dirname, '../../data/estoque.csv');

    // Método para adicionar um item
    async addItem(item: Item): Promise<void> {
        const items = await readCSV(this.filePath); // Lê os itens do arquivo CSV

        if (item.name && item.weight && item.value && item.quantity) { // Verifica se o item tem todos os campos necessários
            items.push(item); // Adiciona o novo item à lista existente
            await writeCSV(this.filePath, items); // Escreve os itens de volta no arquivo CSV
        } else {
            throw new Error("Campos inválidos ao adicionar item"); // Lança um erro se os campos estiverem ausentes
        }
    }

    // Método para remover um item pelo índice
    async removeItem(index: number): Promise<void> { 
        const items = await readCSV(this.filePath); // Lê os itens do arquivo CSV

        if (index >= 0 && index < items.length) { // Verifica se o índice está dentro dos limites
            const removedItem = items.splice(index, 1)[0]; // Remove o item do array
            await writeCSV(this.filePath, items); // Escreve os itens atualizados de volta no arquivo CSV
        } else {
            console.error("Índice fora dos limites, nenhuma remoção realizada."); // Exibe um erro se o índice estiver fora dos limites
        }
    }

    // Método para listar todos os itens
    async listItems(): Promise<Item[]> { 
        const items: Item[] = await readCSV(this.filePath); // Lê os itens do arquivo CSV
        return items; // Retorna a lista de itens
    }

    // Método para encontrar um item pelo ID
    async findItemById(id: number): Promise<Item | undefined> { 
        const items = await readCSV(this.filePath); // Lê os itens do arquivo CSV
        return items.find((item, index) => index === id); // Retorna o item encontrado pelo ID
    }

    // Método para calcular o valor total dos itens em estoque
    async totalValue(): Promise<number> { 
        const items: Item[] = await readCSV(this.filePath); // Lê os itens do arquivo CSV
        return items.reduce((total, item) => total + (item.quantity * item.value), 0); // Calcula o valor total
    }

    // Método para calcular o peso total dos itens em estoque
    async totalWeight(): Promise<number> { 
        const items: Item[] = await readCSV(this.filePath); // Lê os itens do arquivo CSV
        return items.reduce((total, item) => total + (item.quantity * item.weight), 0); // Calcula o peso total
    }

    // Método para calcular o valor médio dos itens em estoque
    async averageValue(): Promise<number> { 
        const items: Item[] = await readCSV(this.filePath); // Lê os itens do arquivo CSV
        let totalValue: number = items.reduce((total, item) => total + (item.quantity * item.value), 0); // Calcula o valor total
        let totalItems: number = items.reduce((total, item) => total + item.quantity, 0); // Calcula o total de itens
        return totalItems > 0 ? totalValue / totalItems : 0; // Calcula o valor médio, se houver itens
    }

    // Método para calcular o peso médio dos itens em estoque
    async averageWeight(): Promise<number> { 
        const items: Item[] = await readCSV(this.filePath); // Lê os itens do arquivo CSV
        let totalWeight: number = items.reduce((total, item) => total + (item.quantity * item.weight), 0); // Calcula o peso total
        let totalItems: number = items.reduce((total, item) => total + item.quantity, 0); // Calcula o total de itens
        return totalItems > 0 ? totalWeight / totalItems : 0; // Calcula o peso médio, se houver itens
    }

    // Método para calcular a quantidade total de itens em estoque
    async totalItemsQuantity(): Promise<number> { 
        const items: Item[] = await readCSV(this.filePath); // Lê os itens do arquivo CSV
        return items.reduce((total, item) => total + item.quantity, 0); // Calcula a quantidade total de itens
    }

    // Método para calcular a quantidade total de produtos em estoque
    async totalProductsQuantity(): Promise<number> { 
        const items: Item[] = await readCSV(this.filePath); // Lê os itens do arquivo CSV
        return items.length; // Retorna o tamanho do array de itens, que representa a quantidade de produtos
    }
}
