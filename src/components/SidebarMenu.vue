<template>
    <div class="sidebar" :class="isOpened ? 'open' : ''" :style="cssVars">
        <div class="sidebar-header">
            <slot name="header">
                <img id="sidebar-logo" alt="Vue logo" :src="require(`@/assets/${logo}`)">
                <i class="bx" :class="isOpened ? 'bx-menu-alt-right' : 'bx-menu'" @click="isOpened = !isOpened" />
            </slot>
        </div>

        <div class="sidebar-content" :class="hasScroll ? 'scroll': ''">
            <ul>
                <slot>
                    <sidebar-item v-for="item in contentItems" :key="item" 
                        :name="item.name" 
                        :tooltip="item.tooltip" 
                        :icon="item.icon" 
                        :href="item.href" />
                </slot>
            </ul>
        </div>

        <div class="sidebar-footer" v-if="hasFooter">
            <ul>
                <slot name="footer">
                    <sidebar-item v-for="item in footerItems" :key="item" 
                        :name="item.name" 
                        :tooltip="item.tooltip" 
                        :icon="item.icon" 
                        :href="item.href" />
                </slot>
            </ul>
        </div>
    </div>
</template>

<script>
import SidebarItem from '@/components/SidebarItem.vue'

export default {
    name: 'SidebarMenu',
    components: {
        SidebarItem
    },
    props: {
        /* Menu settings */
        items:{
            type: Array,
            default: () => []
        },
        isOpened: {
            type: Boolean,
            default: true
        },
        width: {
            type: Number,
            default: 250
        },
        logo: {
            type: String,
            default: "logo.png"
        },

        /* Style settings */
        textColor: {
            type: String,
            default: "white"
        },

        bgColorPrimary: {
            type: String,
            default: "rgb(41, 40, 40)"
        },

        bgColorSecondary: {
            type: String,
            default: "#080a0c"
        },

        bgColorHover: {
            type: String,
            default: "#41b883"
        }
    },
    methods: {
        hasVerticalScroll() {
            if (this.$el === undefined) return false;
            var el = this.$el.getElementsByClassName('sidebar-content')[0];
            return this.hasScroll = el.scrollHeight > el.clientHeight;
        }
    },
    data() {
        return {
            hasScroll: false
        }
    },
    mounted() {
        // Force the recalculation of the hasVerticalScroll method after the component is loaded
        this.hasVerticalScroll();
    },
    created() {
        window.addEventListener("resize", this.hasVerticalScroll);
    },
    unmounted() {
        window.removeEventListener("resize", this.hasVerticalScroll);
    },
    computed: {
        cssVars() {
            return {
                '--menu-width': this.width + 'px',
                '--text-color': this.textColor,
                '--bg-color-primary': this.bgColorPrimary,
                '--bg-color-secondary': this.bgColorSecondary,
                '--bg-color-hover': this.bgColorHover
            }
        },
        contentItems: function() {
            return this.items.filter(function(i) {
                return !i.isFooter
            });
        },
        footerItems: function() {
            return this.items.filter(function(i) {
                return i.isFooter
            });
        },
        hasFooter: function() {
            return this.$slots.footer !== undefined || this.footerItems.length > 0;
        }
    }
}
</script>

<style scoped lang="scss">
    .sidebar {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 70px;
        color: var(--text-color);
        background-color: var(--bg-color-primary);
        transition: width .6s ease;
        
        &.open {
            width: var(--menu-width);
            
            .sidebar-header {
                #sidebar-logo {
                    opacity: 1 !important;
                    transition: opacity 1s linear;
                }

                i {
                    position: relative;
                }
            }

            .sidebar-footer {
                opacity: 1;
                width: var(--menu-width);

                ul {
                    display: flex;
                    justify-content: center;
                }
            }
        }

        .sidebar-header {
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: var(--bg-color-secondary);
            box-shadow: 0 4px 2px -2px gray;
            padding: 10px 0;

            #sidebar-logo {
                height: 40px;
                opacity: 0;
            }

            i {
                font-size: 25px;
                position: absolute;
            }
        }

        .sidebar-content {
            flex-basis: 100%;
            padding-top: 3px;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .sidebar-footer {
            width: 0;
            opacity: 0;
            box-shadow: 0 -4px 2px -2px gray;
            background-color: var(--bg-color-secondary);
            transition: all .6s ease;

            ul {
                display: none;
            }
        }
    }

    /* Custom scrollbar for WebKit and Chromiums */
    ::-webkit-scrollbar {
        width: 10px;          
    }
 
    ::-webkit-scrollbar-thumb {   
        border-radius: 30px;
        background: var(--bg-color-hover);
        box-shadow: inset 2px 2px 2px rgba(255,255,255,.25), inset -2px -2px 2px rgba(0,0,0,.25);
    }
 
    ::-webkit-scrollbar-track {     
        background-color: #fff;
        background: linear-gradient(to right,#201c29,#201c29 1px,#100e17 1px,#100e17);
        margin: 5px 0;
    }

    /* Custom scrollbar for Firefox */
    * {
        scrollbar-color: var(--bg-color-hover) black;
        scrollbar-width: thin;
    }
</style>