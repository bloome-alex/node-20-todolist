<template>
    <v-app-bar color="blue">
        <span class="px-4 text-h5">TODO LIST</span>
        <v-spacer/>
        <v-btn text to="/tasks">
            <v-icon start>shopping_cart</v-icon>Listado de compras
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: 'Navbar'
    }
</script>

<style lang="scss" scoped>

</style>