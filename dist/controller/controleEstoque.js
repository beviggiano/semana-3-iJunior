"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.program = void 0;
const serviceEstoque_1 = require("../service/serviceEstoque");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const service = new serviceEstoque_1.EstoqueService();
const input = (0, prompt_sync_1.default)();
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
    const name = input('Digite o nome do item: ');
    const weight = parseFloat(input('Digite o peso do item (kg): '));
    const value = parseFloat(input('Digite o valor do item (R$): '));
    const quantity = parseInt(input('Digite a quantidade do item: '), 10);
    const item = { name, weight, value, quantity };
    await service.addItem(item);
    console.log("Item adicionado com sucesso.");
}
async function removeItem() {
    const index = parseInt(input('Digite o índice do item a ser removido: '), 10);
    await service.removeItem(index);
    console.log("Item removido com sucesso!");
}
async function listItems() {
    const items = await service.listItems();
    console.log("Itens no estoque: ");
    items.forEach((item, index) => console.log(`${index}: ${item.name}, Peso: ${item.weight} kg, Valor: ${item.value} R$, Quantidade: ${item.quantity}`));
}
async function showTotalValue() {
    const total = await service.totalValue();
    console.log(`Valor total do inventário: R$ ${total.toFixed(2)}`);
}
async function showTotalWeight() {
    const total = await service.totalWeight();
    console.log(`Peso total do inverário: ${total.toFixed(2)} kg`);
}
async function showAverageValue() {
    const average = await service.averageValue();
    console.log(`A média de valor dos itens do inventário é de: ${average.toFixed(2)}`);
}
async function showAverageWeight() {
    const average = await service.averageWeight();
    console.log(`A média de peso dos itens do invertário é de: ${average.toFixed(2)}`);
}
async function showTotalItemsQuantity() {
    const total = await service.totalItemsQuantity();
    console.log(`A quantidade total de itens no invertário é de: ${total}`);
}
async function showTotalProductsQuantity() {
    const total = await service.totalProductsQuantity();
    console.log(`A quantidade total de produtos no invertário é de: ${total}`);
}
async function program() {
    const input = (0, prompt_sync_1.default)();
    let running = true;
    while (running) {
        displayMenu();
        let choice = input("Digite sua opção: ");
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
    }
}
exports.program = program;
