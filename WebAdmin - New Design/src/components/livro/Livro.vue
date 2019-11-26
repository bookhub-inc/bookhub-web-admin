<template>
  <div>
    <h1>Livros</h1>
    <div id="msg" v-html="mensagem"></div>
    

    <div id="listagem" class="format" v-show="exibirListagemForm">
      <input type= "text" v-model="search" placeholder="Pesquisa" /><p></p>
      <button id="btn-exibir-formulario" type="button" class="btn btn-primary" v-on:click="prepararFormCadastro()">Cadastrar</button>
      <br />

      <div id="livro-listagem" class="format">
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-hover table-sm">
            <thead>
              <tr>
                <th>Capa</th>
                <th>Id</th>
                <th>Nome</th>
                <th>Autor</th>
                <th>Editora</th>
                <th>Nº Páginas</th>
                <th>Status</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="livro in filterLivros" :key="livro.id">
                <th><img class="img-circle" v-bind:src="livro.url" width="52px"></th>
                <th>{{livro.id}}</th>
                <th>{{livro.nome}}</th>
                <th>{{livro.autor}}</th>
                <th>{{livro.editora}}</th>
                <th>{{livro.npaginas}}</th>
                <th><button id="aprovado" type="button" class="btn btn-info">Aprovado</button></th>
                <th><button id="btn-exibir-formulario" type="button" class="btn btn-success"
                v-on:click="FormEditar(livro.id)">Editar</button></th>
                <div v-if="livro.aprovado = true">
                </div>
                <div v-if="livro.aprovado = false">
                  <th><button id="rejeitado" type="button" class="btn btn-primary">Rejeitado</button></th>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="formularioedicao" class="format" v-show="formularioedicao" v-on:submit.prevent="salvar()">
      <div class="row">
        <div class="col-sm">
          <form action="/" method="PUT" id="galeriaForm">

            <div class="form-group">
              <label for="url">Capa</label>
              <input
                type="text"
                class="form-control"
                id="url"
                name="url"
                v-model="registro.url"
              />
            </div>

             <img class="img-circle" v-bind:src="registro.url" width="100px" height="150px">
          

            <div class="form-group">
              <label for="nome">Nome</label>
              <input
                type="text"
                class="form-control"
                id="nome"
                name="nome"
                v-model="registro.nome"
              />
            </div>

             <div class="form-group">
              <label for="autor">Autor</label>
              <input
                type="text"
                class="form-control"
                id="autor"
                name="autor"
                v-model="registro.autor"
              />
            </div>

             <div class="form-group">
              <label for="editora">Editora</label>
              <input
                type="text"
                class="form-control"
                id="editora"
                name="editora"
                v-model="registro.editora"
              />
            </div>

            <div class="form-group">
              <label for="autor">Numero páginas</label>
              <input
                type="number"
                class="form-control"
                id="npaginas"
                name="npaginas"
                min="0"
                v-model="registro.npaginas"
              />
            </div>

            <div v-if="registro.aprovado==true" class="form-group">
              <label for="aprovado">Aprovado ? </label>
              <input type="checkbox"
                class="checkbox"
                id="aprovado"
                name="aprovado"
                value="true"
                v-model="registro.aprovado"
              />
            </div>

            <div v-else class="form-group">
              <label for="aprovado">Aprovado ? </label>
              <input type="checkbox"
                class="checkbox"
                id="aprovado"
                name="aprovado"
                value="false"
                v-model="registro.aprovado"
              />
            </div>

            <div class="form-inline">
              <button id="btn-cadastrar" type="submit" class="btn btn-primary mr-sm-2" v-on:click = salvareditar()>Salvar</button>
              <button id="btn-cadastrar-operacao" type="button" class="btn btn-primary" v-on:click = retonarTela() >Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="formulariocadastro" class="format" v-show="formulariocadastro" v-on:submit.prevent="salvar()">
      <div class="row">
        <div class="col-sm">
          <form action="/" method="POST" id="galeriaForm">
            
            <div class="form-group">
              <label for="capa">Capa</label>
              <input
                type="text"
                class="form-control"
                id="capa"
                name="capa"
                v-model="registro.url"
              />
            </div>

            <img class="img-circle" v-bind:src="registro.url" width="100px" height="150px">
            
            <div class="form-group">
              <label for="nome">Nome</label>
              <input
                type="text"
                class="form-control"
                id="nome"
                name="nome"
                v-model="registro.nome"
              />
            </div>



             <div class="form-group">
              <label for="autor">Autor</label>
              <input
                type="text"
                class="form-control"
                id="autor"
                name="autor"
                v-model="registro.autor"
              />
            </div>

            <div class="form-group">
              <label for="editora">Editora</label>
              <input
                type="text"
                class="form-control"
                id="editora"
                name="editora"
                v-model="registro.editora"
              />
            </div>

            <div class="form-group">
              <label for="autor">Numero páginas</label>
              <input
                type="number"
                min="0"
                class="form-control"
                id="npaginas"
                name="npaginas"
                v-model="registro.npaginas"
              />
            </div>

            <div class="form-group">
              <label for="autor">Editora</label>
              <input
                type="text"
                class="form-control"
                id="editora"
                name="editora"
                v-model="registro.editora"
              />
            </div>


            <div class="form-inline">
              <button id="btn-cadastrar" type="submit" class="btn btn-primary mr-sm-2" v-on:click ="salvar()">Salvar</button>
              <button id="btn-cadastrar-operacao" type="button" class="btn btn-primary" v-on:click = retonarTela() >Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>


     

  </div>
</template>

<script>
export default {
  name: "Livro",
  props: {},
  data() {
    return {
      search:'',
      exibirListagemForm: true,
      formulariocadastro: false,
      formularioedicao: false,
      listagem: [],
      mensagem:"",
      registro: {id:null,nome:"",autor:"",npaginas:"",editora:"",url:"",aprovado:""},
      registroJson : null
    }
  },
  methods: {

    retonarTela(){
      this.formulariocadastro = false;
      this.formularioedicao = false;
      this.limpaForm();
      this.exibirListagemForm = true;
    },
    listarDados(){
      this.$materialService.getTodosLivro().then(response => {
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
      this.formularioeditar = false;
      this.exibirListagemForm = false;
      this.formulariocadastro = true;
    },

    salvar(){
      this.$materialService.adicionarLivro(this.registro).then(response => {
        this.listarDados();
        this.exibirListagemForm = true;
        this.formulariocadastro = false;
        this.exibirMsgAlert(response.nome + " Alterado com sucesso! ","sucesso");
      }).catch(response => {
        this.exibirMsgAlert("Erro ao inserir: "+response,"erro");
      });
    }, 
    limpaForm(){
      this.registro = {id:null,nome:"",autor:"",npaginas:"",editora:"",url:""};
    },

      salvareditar(){
      this.$materialService.alterarLivro(this.registro).then(response => {
         this.listarDados();
        this.retonarTela();
        this.exibirMsgAlert(response + " Alterado com sucesso! " + this.registro.nome ,"sucesso");
      }).catch(response => {
        this.exibirMsgAlert("Erro ao inserir: "+response,"erro");
      });
      
    },

    FormEditar(id){
      this.limparMsgAlert();
      this.exibirListagemForm = false;
      this.formulariocadastro = false;
      this.formularioedicao = true;
      this.$materialService.getIdLivro(id).then(response => {
        this.registro.url = response.url;
        this.registro.nome = response.nome;
        this.registro.autor = response.autor;
        this.registro.editora = response.editora;
        this.registro.aprovado = response.aprovado;
        this.registro.npaginas = response.npaginas;
      }
      ).catch(response => {
        this.exibirMsgAlert(response,"erro");
      })
    },
    deletar(id){
       this.$materialService.deleteLivro(id).then(response => {
         if(response.ok){
           this.exibirMsgAlert("Excluido com sucesso!","sucesso");
           this.listarDados();
         }
       })
    }
  },mounted() {
    this.listarDados() 
  },
  computed:{
          filterLivros:function(){
              return this.listagem.filter((livro) => {
              return livro.nome.match(this.search)
                });
          }
      }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.format {
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>
