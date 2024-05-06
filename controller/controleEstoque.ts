import { EstoqueService } from "../service/serviceEstoque";
import { Item } from "../model/types";
import prompt from 'prompt-sync';

const service = new EstoqueService();
const input = prompt();

function displayMenu(){
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
    const item: Item = { name, weight, value, quantity };
    await service.addItem(item);
    console.log("Item adicionado com sucesso.");
}
