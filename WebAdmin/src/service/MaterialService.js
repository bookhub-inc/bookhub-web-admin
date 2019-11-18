import {ConfigClass} from '../classes/ConfigClass'
let caminho = `${ConfigClass.getUrlApi().toString()}/livro`

export default class MaterialService {
    constructor(){

    }
    
    static getTodos(){
        return fetch(caminho).then(response => {
            return response.json();
        })
    }

    static adicionar(data){
        return fetch(caminho,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data) 
            }).then(response => {
            return response.json();
        })
    }

    static getId(id){
        return fetch(caminho+'/'+id).then(response => {
            
                return response.json();
            
                
        })
    }
}