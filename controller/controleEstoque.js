import { EstoqueService } from "../service/serviceEstoque";
import prompt from 'prompt-sync';
const service = new EstoqueService();
const input = prompt();
export function displayMenu() {
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
export async function addItem() {
    const name = input('Digite o nome do item: ');
    const weight = parseFloat(input('Digite o peso do item (kg): '));
    const value = parseFloat(input('Digite o valor do item (R$): '));
    const quantity = parseInt(input('Digite a quantidade do item: '), 10);
    const item = { name, weight, value, quantity };
    await service.addItem(item);
    console.log("Item adicionado com sucesso.");
}
export async function removeItem() {
    const index = parseInt(input('Digite o índice do item a ser removido: '), 10);
    await service.removeItem(index);
    console.log("Item removido com sucesso!");
}
export async function listItems() {
    const items = await service.listItems();
    console.log("Itens no estoque: ");
    items.forEach((item, index) => console.log(`${index}: ${item.name}, Peso: ${item.weight} kg, Valor: ${item.value} R$, Quantidade: ${item.quantity}`));
}
export async function showTotalValue() {
    const total = await service.totalValue();
    console.log(`Valor total do inventário: R$ ${total.toFixed(2)}`);
}
export async function showTotalWeight() {
    const total = await service.totalWeight();
    console.log(`Peso total do inverário: ${total.toFixed(2)} kg`);
}
export async function showAverageValue() {
    const average = await service.averageValue();
    console.log(`A média de valor dos itens do inventário é de: ${average.toFixed(2)}`);
}
export async function showAverageWeight() {
    const average = await service.averageWeight();
    console.log(`A média de peso dos itens do invertário é de: ${average.toFixed(2)}`);
}
export async function showTotalItemsQuantity() {
    const total = await service.totalItemsQuantity();
    console.log(`A quantidade total de itens no invertário é de: ${total}`);
}
export async function showTotalProductsQuantity() {
    const total = await service.totalProductsQuantity();
    console.log(`A quantidade total de produtos no invertário é de: ${total}`);
}
