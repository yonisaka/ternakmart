<template>
    <!-- <v-bottom-navigation
        v-model="value"
        :background-color="color"
        shift
    > -->
    <v-bottom-navigation
        background-color="#139CA4"
        color="dark-grey"
        class="nav-bottom"
    >
        <v-btn :to="{ name: 'home' }">
        <span>Home</span>

        <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn>
        <span>Activity</span>

        <v-icon>mdi-clipboard-list-outline</v-icon>
        </v-btn>

        <v-btn :to="{ name: 'cart' }">
        <span>Cart</span>

        <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-btn :to="{ name: 'login' }">
        <span>Account</span>

        <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>
<script>
export default {
    name: 'app-footer',
    data() {
        return {
            // value: 1,
            year: new Date().getFullYear()
        }
    },
    computed: {
        // color () {
        //     switch (this.value) {
        //     case 0: return 'blue-grey'
        //     case 1: return 'teal'
        //     case 2: return 'brown'
        //     case 3: return 'indigo'
        //     default: return 'blue-grey'
        //     }
        // },
    },
};
</script>
<style>

.nav-bottom {
    border-radius: 1rem 1rem 0 0;
}
</style>
