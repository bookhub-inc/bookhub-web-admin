import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    
            primary: "#3f51b5",
            secondary: "#009688",
            accent: "#00bcd4",
            error: "#e91e63",
            warning: "#f44336",
            info: "#cddc39",
            success: "#673ab7",
            },
        }
)