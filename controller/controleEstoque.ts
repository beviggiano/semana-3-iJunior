import { EstoqueService } from "../service/serviceEstoque";
import { Item } from "../model/types";
import prompt from 'prompt-sync';

const service = new EstoqueService();
const input = prompt();

function displayMenu() {
    console.log("\nEscolha uma das seguintes opções:");
    console.log("1: Adicionar item ao estoque");
    console.log("2: Remover item do estoque");
    console.log("3: Listar todos os itens do estoque");
    console.log("4: Ver valor total do inventário");
    console.log("5: Ver peso total do inventário");
    console.log("6: Calcular média de valor dos itens");
    console.log("7: Calcular média de peso dos itens");
    console.log("8: Ver quantidade total de itens no inventário");
    console.log("9: Ver quantidade total de produtos no inventário");
    console.log("0: Sair");
}

async function addItem() {
    try {
        const name = input('Digite o nome do item: ');
        const weight = parseFloat(input('Digite o peso do item (kg): '));
        const value = parseFloat(input('Digite o valor do item (R$): '));
        const quantity = parseInt(input('Digite a quantidade do item: '), 10);
        const item: Item = { name, weight, value, quantity };
        await service.addItem(item);
        console.log("Item adicionado com sucesso.");
    } catch (error) {
        console.error("Erro ao adicionar o item: ", error);
    }
}

async function removeItem() {
    try {
        const index = parseInt(input('Digite o índice do item a ser removido: '), 10);
        await service.removeItem(index);
        console.log("Item removido com sucesso!");
    } catch (error) {
        console.error("Erro ao remover o item: ", error);
    }
}

async function listItems() {
    try {
        const items = await service.listItems();
        console.log("Itens no estoque: ");
        items.forEach((item, index) => console.log(`${index}: ${item.name}, Peso: ${item.weight} kg, Valor: ${item.value} R$, Quantidade: ${item.quantity}`));
    } catch (error) {
        console.error("Erro ao listar os itens: ", error);
    }
}

async function showTotalValue() {
    try {
        const total = await service.totalValue();
        console.log(`Valor total do inventário: R$ ${total.toFixed(2)}`);
    } catch (error) {
        console.error("Erro ao mostrar o valor total do inventário: ", error);
    }
}

async function showTotalWeight() {
    try {
        const total = await service.totalWeight();
        console.log(`Peso total do inverário: ${total.toFixed(2)} kg`);
    } catch (error) {
        console.error("Erro ao mostrar o peso total do inventário: ", error);
    }
}

async function showAverageValue() {
    try {
        const average = await service.averageValue();
        console.log(`A média de valor dos itens do inventário é de: ${average.toFixed(2)}`);
    } catch (error) {
        console.error("Erro ao calcular a média de valor dos itens: ", error);
    }
}

async function showAverageWeight() {
    try {
        const average = await service.averageWeight();
        console.log(`A média de peso dos itens do inventário é de: ${average.toFixed(2)}`);
    } catch (error) {
        console.error("Erro ao calcular a média de peso dos itens: ", error);
    }
}

async function showTotalItemsQuantity() {
    try {
        const total = await service.totalItemsQuantity();
        console.log(`A quantidade total de itens no inventário é de: ${total}`);
    } catch (error) {
        console.error("Erro ao mostrar a quantidade total de itens: ", error);
    }
}

async function showTotalProductsQuantity() {
    try {
        const total = await service.totalProductsQuantity();
        console.log(`A quantidade total de produtos no inventário é de: ${total}`);
    } catch (error) {
        console.error("Erro ao mostrar a quantidade total de produtos: ", error);
    }
}

export async function program() {
    let running = true;
    while (running) {
        displayMenu();
        let choice = input("Digite sua opção: ");
        console.log(" ");
        try {
            switch (choice) {
                case '1':
                    await addItem();
                    break;
                case '2':
                    await removeItem();
                    break;
                case '3':
                    await listItems();
                    break;
                case '4':
                    await showTotalValue();
                    break;
                case '5':
                    await showTotalWeight();
                    break;
                case '6':
                    await showAverageValue();
                    break;
                case '7':
                    await showAverageWeight();
                    break;
                case '8':
                    await showTotalItemsQuantity();
                    break;
                case '9':
                    await showTotalProductsQuantity();
                    break;
                case '0':
                    console.log("Saindo...");
                    running = false;
                    break;
                default:
                    console.log("Opção inválida. Por favor, tente novamente.");
            }
        } catch (error) {
            console.error("Um erro ocorreu durante a execução: ", error);
        }
    }
}
