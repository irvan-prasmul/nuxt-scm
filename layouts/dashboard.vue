<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer">
            <!--  -->
        </v-navigation-drawer>

        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig()
const drawer = ref(true)
</script>