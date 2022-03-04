import SidebarMenu from './components/SidebarMenu.vue'

export default {
    install(Vue) {
        // Let's register our component globally
        Vue.component('sidebar-menu', SidebarMenu);
    }
}

export { SidebarMenu }