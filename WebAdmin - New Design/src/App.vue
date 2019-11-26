<template>
  
  <div>
   <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary" >
    

      <router-link class="navbar-brand" to="Home">Home</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
         
         
          <li class="nav-item active">
              <router-link to="Livro"  class="nav-link" >Livros</router-link>
          </li>

          <li class="nav-item active">
              <router-link to="Usuario"  class="nav-link" >Usuários</router-link>
          </li>

          <li class="nav-item active">
              <router-link to="Topico"  class="nav-link" >Tópicos</router-link>
         </li>
          
        </ul>
        
            <div class= "bookhub2">BOOKHUB</div>

       <b-navbar type="dark" variant="dark">
        <form class="form-inline mt-2 mt-md-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-primary my-2 my-sm-2" type="submit">IR</button>
        </form>
      </b-navbar>
        
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import Home from "./components/home/Home.vue";
// import ManterGaleria from "./components/galeria/ManterGaleria.vue";

export default {
  name: "app",
  components: {
    // Home,
    // ManterGaleria
  }

};
</script>

<style>
 .bookhub2 {
  color:white;
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 33px;
  margin-right: auto;
 }

 .checkbox{
  margin: 15px;
  padding: 20px 12px 10px 20px;
  position: unset;



 }
 body {
   padding-top: 70px; 
   
 }
</style>
