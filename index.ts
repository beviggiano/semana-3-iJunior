import { displayMenu, addItem, removeItem,listItems, showTotalValue, showTotalWeight,showAverageValue, showAverageWeight, showTotalItemsQuantity, showTotalProductsQuantity } from "./controller/controleEstoque";
import prompt from 'prompt-sync';

async function main() {
    const input = prompt();
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