# vuejs-sidebar-menu

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![Vue 3.x](https://img.shields.io/badge/vue-3.x-brightgreen.svg?style=flat-square)](https://vuejs.org)

A simple Vue 3 plugin to create a sidebar menu.  

## Demo

[View a demo](https://zj1fty.csb.app/) | [Sandbox](https://codesandbox.io/s/zj1fty?file=/src/App.vue)

## Dependencies

The plugin was created with `Vue 3` and is designed to work with `vue-router`.  

| Name              | Version   |
| ----------------- |---------- |
| `core-js`         | `3.8.3`   |
| `vue`             | `3.2.13`  |
| `vue-router`      | `4.0.13`  |

## Project setup

```bash
npm install --save vuejs-sidebar-menu
```

### Global registration

*main.js:* 
```js
import { createApp } from 'vue'
import App from './App.vue'

import SidebarMenu from 'vuejs-sidebar-menu'
import 'vuejs-sidebar-menu/dist/vuejs-sidebar-menu.css'

createApp(App).use(SidebarMenu).mount('#app')
```

### Local registration

*App.vue:* 
```vue
<script>
import { SidebarMenu } from 'vuejs-sidebar-menu'
import 'vuejs-sidebar-menu/dist/vuejs-sidebar-menu.css'

export default {
    components: {
        SidebarMenu
    }
}
</script>
```

## Basic usage

*App.vue:* 
```vue
<template>
    <sidebar-menu :items="items" />

    <div class="container">
        <router-view/>  
    </div>
</template>

<script>
import { SidebarMenu } from 'vuejs-sidebar-menu'
import 'vuejs-sidebar-menu/dist/vuejs-sidebar-menu.css'

export default {
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

<style>
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
```

## Component properties

| Name              | Type      | Default  | Example  |
| ----------------- |:--------- | -------- | -------- |
| `items`           | `String[] :`<br />`{`<br />`name: String,`<br />`tooltip: String,`<br />`icon: String,`<br />`href: String,`<br />`isFooter: Boolean`<br />`}` | `[]` | `{`<br />`name:"My Favorites",`<br />`tooltip:"Mon tooltip Spécifique",`<br />`icon:"bxs-star",`<br />`href:"/favorites",`<br />`isFooter:false`<br />`}`|
| `isOpened`        | `Boolean` | `true`   |          |
| `width`           | `Number`  | `250`    |          |
| `logo`            | `String`  | `logo.png (image in src/assets)` |          |
| `textColor`       | `String`  | `white`           |          |
| `bgColorPrimary`  | `String`  | `rgb(41, 40, 40)` |          |
| `bgColorSecondary`| `String`  | `#080a0c`         |          |
| `bgColorHover`    | `String`  | `#41b883`         |          |

**Explanations of the properties of `items`:**  
*If the `tooltip` property is not set, the `name` property is used by default.*  

*By default, the icons in the sidebar use the [boxicons' library](https://boxicons.com)  
The value of the `icon` property takes a class name defined in this library.  
It is possible to use another icon library such as Font Awesome but you will need to import the necessary files for this library.*  

*The `href` property can contain a relative link or a http link.  
In the case of the relative link, the vue-router plugin is used.  
In the case of the http link, it will be opened in a new tab.*  

*If the `isFooter` property is not set, the element will be placed in the sidebar content*  

*Example with custom parameters:*
```vue
<template>
    <sidebar-menu 
      :items="items" 
      :isOpened="true"
      :width="300"
      logo="logo.png"  
      textColor="#41b883"
      bgColorPrimary="rgb(41, 40, 40)"
      bgColorSecondary="#080a0c"
      bgColorHover="white"
      />
</template>
```
## Slots

### Override sidebar header

By default, the sidebar header contains the logo "logo.png" present in the assets and an icon allowing to reduce/enlarge the panel.

*SidebarMenu.vue:*
```vue
<template>
    ...
    <div class="sidebar-header">
        <slot name="header">
            <img id="sidebar-logo" alt="Vue logo" :src="require(`@/assets/${logo}`)">
            <i class="bx" :class="isOpened ? 'bx-menu-alt-right' : 'bx-menu'" @click="isOpened = !isOpened" />
        </slot>
    </div>
</template>
```

You can totally change this behaviour:

*App.vue:* 
```vue
<template>
    <sidebar-menu :items="items">
        <!-- Add custom header -->
        <template #header>
            <img id="sidebar-logo" alt="Vue logo" style="height:60px" :src="require(`@/assets/logo.png`)">
            <div>
                <p>My scrollbar title</p>
            </div>
      </template>
    </sidebar-menu>
</template>
```

### Override sidebar content

By default, the sidebar content is filled with `items` whose `isFooter` property is unspecified or set to `false`.

*SidebarMenu.vue:*
```vue
<template>
    ...
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
    ...
</template>
```

You can totally change this behaviour:

*App.vue:* 
```vue
<template>
    <sidebar-menu :items="items">
        <!-- Add custom content -->
        <li class="sidebar-item"><a>My link 1</a></li>
        <li class="sidebar-item"><a>My link 2</a></li>
        <li class="sidebar-item"><a>My link 3</a></li>
        <li class="sidebar-item"><a>My link 4</a></li>
    </sidebar-menu>
</template>
```

### Override sidebar footer

By default, the sidebar footer is filled with `items` whose `isFooter` property is set to `true`.

*SidebarMenu.vue:*
```vue
<template>
    ...
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
</template>
```

You can totally change this behaviour:

*App.vue:* 
```vue
<template>
    <sidebar-menu :items="items">
        <!-- Add custom footer -->
        <template #footer>
            <p class="sidebar-footer-content">(c) My company 2022</p>
        </template>
    </sidebar-menu>
</template>
```