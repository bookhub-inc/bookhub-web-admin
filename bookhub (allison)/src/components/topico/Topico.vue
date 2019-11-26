<template>
  <div>
    <h1>Tópicos</h1>
    <div id="msg" v-html="mensagem"></div>
              
              <!--<v-layout>
                  <v-dialog v-model="confirmacaoexcluirtopico" persistent max-width="290">
                    <v-card>
                      <v-card-actions>
                        <v-card-title class="error headline" style="font-weight:bold; color:white;">Confirmar a exclusão</v-card-title>
                        <v-card-text>Tem certeza que deseja excluir o tópico ?</v-card-text>
                        <v-btn color="error" flat v-on:click="deletar(this.id)">Confirmar exclusão</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout> -->

    <div id="listagem" class="format" v-show="exibirListagemForm">
      <input type= "text" v-model="search" placeholder="Pesquisa" /><p></p>
      <button id="btn-exibir-formulario" type="button" class="btn btn-primary"
      v-on:click="FormCadastrar()">Cadastrar</button>
      <br />

      <div id="topico-listagem" class="format">
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-hover table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Descrição</th>
                <th>Data de Criação</th>
                <th>Criador</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <v-flex>
              <Popup/>
            </v-flex>

            <tbody>
              <tr v-for="topico in filterTopicos" :key="topico.id">
                <th>{{topico.id}}</th>
                <th>{{topico.titulo}}</th>
                <th>{{topico.descricao}}</th>
                <th>{{topico.dataCriacao}}</th>
                <th>{{topico.login}}</th>
                <th><button id="btn-exibir-formulario" type="button" class="btn btn-success"
                    v-on:click="prepararFormEditar(topico.id)">Editar</button></th>
                <th><button id="btn-exibir-formulario" type="button" class="btn btn-danger"
                    v-on:click="deletar(topico.id)">Excluir</button>

                          <!--Código confirmar excluir-->


              </th>
                <!--<th><button id="btn-exibir-formulario" type="button" class="btn btn-danger"
        v-on:click="deletar(topico.id)">Excluir</button></th>-->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <div id="formularioeditar" class="format" v-show="FormularioEditar" v-on:submit.prevent="salvar()"> 
      <div class="row">
        <div class="col-sm">
          <form action="/" method="PUT" id="galeriaForm">
            <div class="form-group">
              <label for="id">Id</label>
              <input
                type="number"
                class="form-control"
                id="id"
                name="id"
                disabled="disabled"
                v-model="registro.id"
              />
            </div>
            
            <div class="form-group">
              <label for="titulo">Título</label>
              <input
                type="text"
                class="form-control"
                id="titulo"
                name="titulo"
                v-model="registro.titulo"
              />
            </div>

            <div class="form-group">
              <label for="descricao">Descrição</label>
              <input
                type="text"
                class="form-control"
                id="descricao"
                name="descricao"
                v-model="registro.descricao"
              />
            </div>

            <div class="form-inline">
              <button id="btn-cadastrar" type="submit" class="btn btn-primary mr-sm-2" v-on:click= salvareditar()>Salvar</button>
              <button id="btn-cadastrar-operacao" type="button" class="btn btn-primary" v-on:click= retonarTela()>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="formulariocadastrar" class="format" v-show="FormularioCadastrar" v-on:submit.prevent="salvar()">
      <div class="row">
        <div class="col-sm">
          <form action="/" method="POST" id="galeriaForm">

            <div class="form-group">
              <label for="titulo">Título</label>
              <input
                type="text"
                class="form-control"
                id="titulo"
                name="titulo"
                v-model="registro.titulo"
              />
            </div>
            
            
            <div class="form-group">
              <label for="descricao">Descrição</label>
              <input
                type="text"
                class="form-control"
                id="descricao"
                name="descricao"
                v-model="registro.descricao"
              />
            </div>


            <div class="form-group">
              <label for="login">Criador - ID</label>
              <input
                type="number"
                min="0"
                class="form-control"
                id="login"
                name="login"
                v-model="registro.idUsuario"
              />
            </div>
            
            <div class="form-inline">
              <button id="btn-cadastrar" type="submit" class="btn btn-primary mr-sm-2">Salvar</button>
              <button id="btn-cadastrar-operacao" type="button" class="btn btn-primary" v-on:click="retonarTela()">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Topico",
  props: {},
  data() {
    return {
      dialog :false,
      search:'',
      listagem:[],
      exibirListagemForm: true,
      FormularioEditar: false,
      FormularioCadastrar: false,
      mensagem:"",
      registro: {id:null,titulo:"",dataCriacao:"",login:""},
      registroJson : null
    }
  },
  methods: {

    retonarTela(){
        this.FormularioEditar = false;
        this.FormularioCadastrar = false;
        this.limpaForm();
        this.exibirListagemForm = true;
    },

    listarDados(){
      this.$materialService.getTodosTopico().then(response => {
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
      this.FormularioCadastrar = true;
    },

    salvareditar(){
      this.$materialService.alterarTopico(this.registro).then(response => {
         this.listarDados();
        this.retonarTela();
        this.exibirMsgAlert(response.id + " salvo com sucesso! ","sucesso");
      }).catch(response => {
        this.exibirMsgAlert("Erro ao inserir: "+response,"erro");
      });
      
    }, 

    salvar(){
      this.$materialService.adicionarTopico(this.registro).then(response => {
        this.listarDados();
        this.exibirListagemForm = true;
        this.FormularioEditar = false;
        this.exibirMsgAlert(response.nome + " salvo com sucesso! ","sucesso");
      }).catch(response => {
        this.exibirMsgAlert("Erro ao inserir: "+response,"erro");
      });
    }, 
    limpaForm(){
      this.registro = {id:null,titulo:"",dataCriacao:"",login:"",descricao:""};
    },
    prepararFormEditar(id){
      this.limparMsgAlert();
      this.exibirListagemForm = false;
      this.FormularioCadastrar = false;
      this.FormularioEditar = true;
      this.$materialService.getIdTopico(id).then(response => {
        this.registro.id = response.id;
        this.registro.dataCriacao = response.dataCriacao;
        this.registro.login = response.login;
        this.registro.titulo = response.titulo;
        this.registro.descricao = response.descricao;
      }).catch(response => {
        this.exibirMsgAlert(response,"erro");
      })
    },

    FormCadastrar(id){
      this.limparMsgAlert();
      this.prepararFormCadastro();
      this.$materialService.adicionarTopico(id).then(response => {
        this.registro.id = response.id;
        this.registro.titulo = response.titulo;
        this.registro.dataCriacao = response.dataCriacao;
        this.registro.login = response.login;
      }).catch(response => {
        this.exibirMsgAlert(response,"erro");
      })
    },
    deletar(id){
       this.$materialService.deleteTopico(id).then(response => {
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
          filterTopicos:function(){
              return this.listagem.filter((topico) => {
              return topico.titulo.match(this.search);
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
