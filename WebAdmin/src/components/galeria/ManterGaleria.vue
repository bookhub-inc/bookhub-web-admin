<template>
  <div>
    <h1>Cadastro de livros</h1>
    <div id="msg" v-html="mensagem"></div>

    <div id="listagem" class="format" v-show="exibirListagemForm">
      <button id="btn-exibir-formulario" type="button" class="btn btn-primary"
      v-on:click="prepararFormCadastro()">Cadastrar</button>
      <br />

      <div id="galeria-listagem" class="format">
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-hover table-sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Autor</th>
                <th>Número de Páginas</th>
                <th>Editora</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="livro in listagem" :key="livro.id">
                <th>{{livro.nome}}</th>
                <th>{{livro.autor}}</th>
                <th>{{livro.npaginas}}</th>
                <th>{{livro.editora}}</th>
                <th><button id="btn-exibir-formulario" type="button" class="btn btn-success"
      v-on:click="prepararFormEditar(livro.id)">Editar</button></th>
                <th><button id="btn-exibir-formulario" type="button" class="btn btn-danger"
      v-on:click="deletar(livro.id)">Excluir</button></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="formulario" class="format" v-show="!exibirListagemForm" v-on:submit.prevent="salvar()">
      <div class="row">
        <div class="col-sm">
          <form action="/" method="POST" id="galeriaForm">
            <div class="form-group">
              <label for="id">Código</label>
              <input
                type="number"
                class="form-control"
                id="id_galeria_video"
                name="id_galeria_video"
                disabled="disabled"
                v-model="registro.id"
              />
            </div>

            <div class="form-group">
              <label for="nome">Nome do livro</label>
              <input
                type="text"
                class="form-control"
                id="nome"
                name="nome"
                v-model="registro.nome"
              />
            </div>

             <div class="form-group">
              <label for="editora">Descricao </label>
              <input
                type="text"
                class="form-control"
                id="editora"
                name="editora"
                v-model="registro.descricao"
              />
            </div>

            <div class="form-inline">
              <button id="btn-cadastrar" type="submit" class="btn btn-primary mr-sm-2">Salvar</button>
              <button id="btn-cadastrar-operacao" type="button" class="btn btn-primary">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManterGaleria",
  props: {},
  data() {
    return {
      exibirListagemForm: true,
      listagem: null,
      mensagem:"",
      registro: {id:null,nome:"",autor:""},
      registroJson : null
    }
  },
  methods: {
    listarDados(){
      this.$materialService.getTodos().then(response => {
        if(response.erro){
          //alert
          // console.log("deu erro");
        }else{
         
          this.listagem = response;
        }
      }).catch(response => {
        // erro
        response.erro
      });
    },
    exibirMsgAlert(msg,tipo){
      let dados ="";
      if(tipo== "sucesso"){
        dados = `<div class='alert alert-success' role='alert'>
                  <strong>${msg}</strong>
                  </div>`
      }else{
         dados = `<div class='alert alert-danger' role='alert'>
                  <strong>${msg}</strong>
                  </div>`
      }
      this.mensagem = dados;
    },
    limparMsgAlert(){
      this.mensagem = "";
    },
    prepararFormCadastro(){
      this.limparMsgAlert();
      this.exibirListagemForm = false;

    },
    salvar(){
      
      this.$materialService.adicionar(this.registro).then(response => {
        this.listarDados();
        this.exibirListagemForm = true;
        this.exibirMsgAlert(response.nome + " salvo com sucesso! ","sucesso");
      }).catch(response => {
        this.exibirMsgAlert("Erro ao inserir: "+response,"erro");
      });
    }, 
    limpaForm(){
      this.registro = {id:null,nome:"",descricao:""};
    },
    prepararFormEditar(id){
      this.limparMsgAlert();
      this.exibirListagemForm = false;
      this.$materialService.getId(id).then(response => {
        this.registro.id = response.id;
        this.registro.nome = response.nome;
        this.registro.descricao = response.descricao;
      }).catch(response => {
        this.exibirMsgAlert(response,"erro");
      })
    },
    deletar(id){
       this.$materialService.delete(id).then(response => {
         if(response.ok){
           this.exibirMsgAlert("Excluido com sucesso!","sucesso");
           this.listarDados();
         }
       })
    }
  },mounted() {
    this.listarDados() 
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.format {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
