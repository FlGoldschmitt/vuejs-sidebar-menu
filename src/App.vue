<template>
    <sidebar-menu :items="items" />

    <div class="container">
      <router-view/>  
    </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue'

export default {
  name: 'App',
  components: {
    SidebarMenu
  },
  data() {
    return {
      items: [
        { name:"My space", tooltip:"Mon tooltip Spécifique", icon:"bx-user", href:"/" },
        { name:"My Favorites", icon:"bxs-star", href:"/favorites" },
        { name:"Players", icon:"bxs-user-detail", href:"/players" },
        { name:"Clubs", icon:"bxs-school", href:"/clubs" },
        { name:"Competitions", icon:"bxs-trophy", href:"/competitions" },
        { isFooter:true, tooltip:"Vue.js Facebook page", icon:"bxl-facebook", href:"https://fr-fr.facebook.com/vuejsdevelopers" },
        { isFooter:true, tooltip:"Vue.js Twitter page", icon:"bxl-twitter", href:"https://twitter.com/vuejs" },
        { isFooter:true, tooltip:"Vue.js LinkedIn page", icon:"bxl-linkedin", href:"https://www.linkedin.com/company/vuejsdevelopers" }
      ]
    }
  }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    /* Remove cursor "|" in html balise */
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  flex-basis: 100%;
  background-color: white;
  height: 100vh;
  overflow-y: auto;
}
</style>