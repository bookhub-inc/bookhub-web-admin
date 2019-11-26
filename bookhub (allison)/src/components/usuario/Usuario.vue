<template>
  <div>
    <h1>Usuários</h1>
    <div id="msg" v-html="mensagem"></div>
    

    <div id="listagem" class="format" v-show="exibirListagemForm">
      <input type= "text" v-model="search" placeholder="Pesquisa" /><p></p>
      <button id="btn-exibir-formulario" type="button" class="btn btn-primary"
      v-on:click="prepararFormCadastro()">Cadastrar</button>
      <br />

      <div id="usuario-listagem" class="format">
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-hover table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Id Avatar</th>               
                <th>Avatar</th>
                <th>Usuário</th>
                <th>Senha</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in filterUsuarios" :key="usuario.id">
                <th>{{usuario.id}}</th>
                <th>
                  <div v-if= "usuario.idAvatar == 1"> 
                   <img class="img-circle" v-bind:src="'https://images-na.ssl-images-amazon.com/images/I/81opKw7oHQL._SY445_.jpg'" height="52px" width="52px">
                  </div>
                  <div v-if= "usuario.idAvatar == 2">
                      <img class="img-circle" v-bind:src="'https://cdn.onebauer.media/one/empire-tmdb/films/10996/images/dZIRC5SwtfScz3DSSsMPqyTjsni.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg'" height="52px" width="52px">
                  </div>
                  <div v-if= "usuario.idAvatar == 3">
                    <img class="img-circle" v-bind:src="'https://vignette.wikia.nocookie.net/cartooncharacters/images/2/2b/Jerrythemouse.jpg/revision/latest?cb=20180711194126'" height="52px" width="52px">
                  </div>
                  <div v-if= "usuario.idAvatar == 4">
                    <img class="img-circle" v-bind:src="'https://lumiere-a.akamaihd.net/v1/images/ct_mickeymouseandfriends_mickey_ddt-16970_4e99445d.jpeg?region=0,0,600,600&width=480'" height="52px" width="52px">
                  </div>
                  </th>
                 <th>{{usuario.idAvatar}}</th>
                <th>{{usuario.login}}</th>
                <th>{{usuario.senha}}</th>
                <th>{{usuario.nome + " " + usuario.sobrenome}}</th>
                <th>{{usuario.email}}</th>
                <th>{{usuario.telefone}}</th>
                <th><button id="btn-exibir-formulario" type="button" class="btn btn-success"
      v-on:click="prepararFormEditar(usuario.id)">Editar</button></th>
                <th><button id="btn-exibir-formulario" type="button" class="btn btn-danger"
      v-on:click="deletar(usuario.id)">Excluir</button></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="formulario" class="format" v-show="formularioeditar" v-on:submit.prevent="salvareditar()">
      <div class="row">
        <div class="col-sm">
          <form action="/" method="PUT" id="galeriaForm">
             

            <div class="form-group">
              <label for="usuario">Usuário</label>
              <input
                type="text"
                class="form-control"
                id="usuario"
                name="usuario"
                v-model="registro.login"
              />
            </div>

            <div class="form-group">
              <label for="usuario">Avatar</label>
              <input
                type="text"
                class="form-control"
                id="avatar"
                name="avatar"
                v-model="registro.idAvatar"
              />
            </div>
            <div v-if= "this.registro.idAvatar == 1"> 
            <img class="img-circle" v-bind:src="'https://images-na.ssl-images-amazon.com/images/I/81opKw7oHQL._SY445_.jpg'" width="150px" height="100px">
            </div>
            <div v-if= "this.registro.idAvatar == 2">
              <img class="img-circle" v-bind:src="'https://cdn.onebauer.media/one/empire-tmdb/films/10996/images/dZIRC5SwtfScz3DSSsMPqyTjsni.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg'" width="150px" height="100px">
            </div>
            <div v-if= "this.registro.idAvatar == 3">
              <img class="img-circle" v-bind:src="'https://vignette.wikia.nocookie.net/cartooncharacters/images/2/2b/Jerrythemouse.jpg/revision/latest?cb=20180711194126'" width="150px" height="100px">
            </div>
            <div v-if= "this.registro.idAvatar == 4">
              <img class="img-circle" v-bind:src="'https://lumiere-a.akamaihd.net/v1/images/ct_mickeymouseandfriends_mickey_ddt-16970_4e99445d.jpeg?region=0,0,600,600&width=480'" width="150px" height="100px">
            </div>
            <div class="form-group">
              <label for="senha">Senha</label>
              <input
                type="text"
                class="form-control"
                id="senha"
                name="senha"
                v-model="registro.senha"
              />
            </div>

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
              <label for="sobrenome">Sobrenome</label>
              <input
                type="text"
                class="form-control"
                id="sobrenome"
                name="sobrenome"
                v-model="registro.sobrenome"
              />
            </div>

            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                type="text"
                class="form-control"
                id="email"
                name="email"
                v-model="registro.email"
              />
            </div> 

          
            <div class="form-group">
              <label for="telefone">Telefone</label>
              <input
                type="text"
                class="form-control"
                id="telefone"
                name="telefone"
                v-model="registro.telefone"
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



    <div id="formulario" class="format" v-show="formulariocadastrar" v-on:submit.prevent="salvar()">
      <div class="row">
        <div class="col-sm">
          <form action="/" method="POST" id="galeriaForm">
            
            <div class="form-group">
              <label for="usuario">Usuário</label>
              <input
                type="number"
                class="form-control"
                id="usuario"
                name="usuario"
                v-model="registro.login"
              />
            </div>

            <div class="form-group">
              <label for="usuario">Senha</label>
              <input
                type="text"
                class="form-control"
                id="usuario"
                name="usuario"
                v-model="registro.senha"
              />
            </div>

            <div class="form-group">
              <label for="usuario">Foto</label>
              <input
                type="number"
                min="0"
                class="form-control"
                id="usuario"
                name="usuario"
                v-model="registro.idAvatar"
              />
            </div>
          

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
              <label for="sobrenome">Sobrenome</label>
              <input
                type="text"
                class="form-control"
                id="sobrenome"
                name="sobrenome"
                v-model="registro.sobrenome"
              />
            </div>

            <div class="form-group">
              <label for="email">E-mail</label>
              <input
                type="text"
                class="form-control"
                id="email"
                name="email"
                v-model="registro.email"
              />
            </div> 

            

            <div class="form-group">
              <label for="telefone">Telefone</label>
              <input
                type="text"
                class="form-control"
                id="telefone"
                name="telefone"
                v-model="registro.telefone"
              />
            </div> 

            <div class="form-inline">
              <button id="btn-cadastrar" type="submit" class="btn btn-primary mr-sm-2" v-on:click= salvar()>Salvar</button>
              <button id="btn-cadastrar-operacao" type="button" class="btn btn-primary" v-on:click= retonarTela()>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Usuario",
  props: {},
  data() {
    return {
      search:'',
      formulariocadastrar:false,
      formularioeditar:false,
      exibirListagemForm: true,
      listagem: [],
      mensagem:"",
      registro: {id:null,login:"",nome:"",email:"",idAvatar:""},
      registroJson : null
    }
  },
  methods: {

    retonarTela(){
      this.formulariocadastrar = false;
      this.formularioeditar = false;
      this.limpaForm();
      this.exibirListagemForm = true;
    },
    listarDados(){
      this.$materialService.getTodosUsuario().then(response => {
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
      this.formularioeditar = false;
      this.exibirListagemForm = false;
      this.formulariocadastrar = true;

    },

    salvareditar(){
      this.$materialService.alterarUsuario(this.registro).then(response => {
         this.listarDados();
        this.retonarTela();
        this.exibirMsgAlert(response.id + " salvo com sucesso! ","sucesso");
      }).catch(response => {
        this.exibirMsgAlert("Erro ao atualizar: "+response,"erro");
      });
    }, 

    getAvatar(){
    this.$materialService.getTodosAvatar().then(response => {
        this.registro.id = response.id;
        this.registro.url = response.url;
    }).catch(response => {
        this.exibirMsgAlert("Avatar não cadastrado" + response +"erro");
    });
    },

    salvar(){
      this.$materialService.adicionarUsuario(this.registro).then(response => {
        this.listarDados();
        this.exibirMsgAlert(response.nome + " salvo com sucesso! ","sucesso");
        this.exibirListagemForm = true;
      }).catch(response => {
        this.exibirMsgAlert("Erro ao inserir: "+response,"erro");
      });
    }, 
    limpaForm(){
      this.registro = {id:null,login:"",nome:"",sobrenome:"",telefone:""};
    },
    prepararFormEditar(id){
      this.limparMsgAlert();
      this.exibirListagemForm = false;
      this.formularioeditar = true;
      this.$materialService.getIdUsuario(id).then(response => {
        this.registro.id = response.id;
        this.registro.nome = response.nome;
        this.registro.senha = response.senha;
        this.registro.sobrenome = response.sobrenome;
        this.registro.email = response.email;
        this.registro.login = response.login;
        this.registro.telefone = response.telefone;
        this.registro.idAvatar = response.idAvatar;
        this.registro.dataUltimoAcesso = response
        }).catch(response => {
        this.exibirMsgAlert(response,"erro");
      })
    },
    deletar(id){
       this.$materialService.deleteUsuario(id).then(response => {
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
          filterUsuarios:function(){
              return this.listagem.filter((usuario) => {
              return usuario.login.match(this.search);
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
