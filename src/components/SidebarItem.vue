<template>
    <li>
        <app-link :href="href">
            <i class="bx" :class="icon" />
            <span :title="tooltip ?? name">{{ name }}</span>
        </app-link>
    </li>
</template>

<script>
import AppLink from '@/components/AppLink.vue'

export default {
    name: 'SidebarItem',
    components: {
        AppLink
    },
    props: {
        name: String,
        tooltip: String,
        icon: String,
        href: String
    }
}
</script>

<style scoped lang="scss">
    @import url('https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css');
    
    .sidebar {
        &.open {
            span {
                opacity: 1;
            }
        }

        .sidebar-content.scroll li{
            margin: 5px;
        }

        li {
            line-height: 50px;
            margin: 5px 10px;
            list-style: none;

            a {
                display: flex;
                align-items: center;
                color: var(--text-color);
                border-radius: 10px;
                text-decoration: none;

                i {
                    line-height: 50px;
                    min-width: 50px;
                    font-size: 20px;
                }

                span {
                    opacity: 0;
                    white-space: nowrap;
                    transition: opacity .5s linear;
                }

                &:hover,
                &.router-link-active,
                &.router-link-exact-active {
                    background-color: var(--bg-color-hover);
                    transition: all .6s ease;
                }
            }
        }
    }
</style>