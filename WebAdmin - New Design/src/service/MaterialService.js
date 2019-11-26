import {ConfigClass} from '../classes/ConfigClass'

let caminhousuario = `${ConfigClass.getUrlApi().toString()}/usuario`
let caminhotopico = `${ConfigClass.getUrlApi().toString()}/topico`
let caminholivro = `${ConfigClass.getUrlApi().toString()}/livro`
let caminhoavatar =`${ConfigClass.getUrlApi().toString()}/avatar`

export default class MaterialService {
    constructor(){

    }
    
    static getTodosLivro(){
        return fetch(caminholivro).then(response => {
            return response.json();
        })
    }

    static getTodosAvatar(){
        return fetch(caminhoavatar).then(response => {
            return response.json();
        })
    }

    static getTodosUsuario(){
        return fetch(caminhousuario).then(response => {
            return response.json();
        })
    }

    static getTodosTopico(){
        return fetch(caminhotopico).then(response => {
            return response.json();
        })
    }



    static adicionarLivro(data){
        return fetch(caminholivro,
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

    static adicionarUsuario(data){
        return fetch(caminhousuario,
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

    static adicionarTopico(data){
        return fetch(caminhotopico,
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

    static getIdLivro(id){
        return fetch(caminholivro+'/'+id).then(response => {
            
                return response.json();
            
                
        })
    }


    static getIdUsuario(id){
        return fetch(caminhousuario+'/'+id).then(response => {
            
                return response.json();
            
                
        })
    }

    static getIdTopico(id){
        return fetch(caminhotopico+'/'+id).then(response => {
            
                return response.json();
            
                
        })
    }


    static alterarTopico(data){
        return fetch(caminhotopico,
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data) 
            }).then(response => {
            return response.json();
        })
    }

    static alterarUsuario(data){
        return fetch(caminhousuario,
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data) 
            }).then(response => {
            return response.json();
        })
    }

    static alterarLivro(data){
        return fetch(caminholivro,
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data) 
            }).then(response => {
            return response.json();
        })
    }

    static deleteLivro(id){
        return fetch(caminholivro+'/'+id,{
            method: "DELETE"
        }
        ).then(response => {
            
                return response;
            
                
        })
    }

    static deleteUsuario(id){
        return fetch(caminhousuario+'/'+id,{
            method: "DELETE"
        }
        ).then(response => {
            
                return response;
            
                
        })
    }

    static deleteTopico(id){
        return fetch(caminhotopico+'/'+id,{
            method: "DELETE"
        }
        ).then(response => {
            
                return response;
            
                
        })
    }

}