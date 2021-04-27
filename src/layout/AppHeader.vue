<template>
    <v-card class="overflow-hidden">
        <v-app-bar
        color="#139CA4"
        flat
        >
            <v-img
            src="img/brand/ternakmart.png"
            max-height="30"
            max-width="30"
            ></v-img>
            <v-card-text>
                <v-text-field
                    class="ml-2 mt-7"
                    label="Cari"
                    single-line
                    solo
                    style="
width: 240px;
                    "
                ></v-text-field>
            </v-card-text>
            <v-btn 
            color="white"
            icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn 
            color="white"
            icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
        </v-app-bar>
    </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.type";

export default {
    computed: {
        ...mapGetters(["currentUser", "isAuthenticated"])
    },
    methods: {
        logout() {
            this.$store.dispatch(LOGOUT).then(() => {
                this.$router.push({ name: "home" });
            });
        }
    }
};
</script>
<style>
</style>
