<template>
  <v-app>
      <v-navigation-drawer
            v-model="drawer"
             absolute
        app
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src=""></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Prosperity Wealth Management
              </v-list-item-title>
              <v-list-item-subtitle>PWM.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link to="/analytics" >
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Analytics</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/live" >
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Live Data</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/analytics-form" >
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>analytics-form</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-app-bar
      dense
      dark
      app
    >
      <v-app-bar-nav-icon
        @click="drawerChange()"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Financial Market Analytics</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- -->

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <router-view> </router-view>
    </v-container>
  </v-main>

  <!-- <v-footer app> -->
    <!-- // vue2 -< --> 
  <!-- </v-footer> -->
</v-app>


</template>

<script>

  export default {
    name : 'App',
    components : {
    },
    data () {
      return {
        drawer : null
      }
    },
    methods : {
      drawerChange () {
        console.log(this.drawer, !this.drawer)
        this.drawer = !this.drawer
      }
    }
  }
</script>
<style>    
#app {    
  font-family: Avenir, Helvetica, Arial, sans-serif;    
  -webkit-font-smoothing: antialiased;    
  -moz-osx-font-smoothing: grayscale;    
  text-align: center;    
  color: #2c3e50;    
  margin-top: 10px;    
}    
</style> 
