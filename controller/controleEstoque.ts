import { EstoqueService } from "../service/serviceEstoque";
import { Item } from "../model/types";
import prompt from 'prompt-sync';

const service = new EstoqueService();
const input = prompt();

(
    async() => {
        while(true) {
            console.log("\nEscolha uma opção:");
            console.log("0: Sair do programa");
            console.log("1: Adicionar item");
            console.log("2: Remover item");
            console.log("3: Listar todos os itens");
            //valor total
            //peso total
            //média valor
            //média peso
            //quantidade total itens
            //quantidade total de produtos 
            

            const action = input('Opção: ');

            switch(action){
                case '1':           
                case '2':
                case '3':
                case '4':
            }
        }
    }
)