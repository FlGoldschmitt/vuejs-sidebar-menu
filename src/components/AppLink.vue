<template>
    <a v-if="isExternalLink" :href="href" target="_blank">
        <slot />
    </a>

    <router-link v-else :to="href">
        <slot />
    </router-link>
</template>

<script>
export default {
    name: 'AppLink',
    props: {
        href: String
    },
    computed: {
        isExternalLink() {
            return typeof this.href === 'string' && this.href.startsWith('http')
        }
    }
}
</script>