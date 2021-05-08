<template>
    <div>
    <v-app-bar
      color="#139CA4"
      flat
    >
         <v-img
            src="img/brand/ternakmart.png"
            max-height="30"
            max-width="30"
            ></v-img>
<v-spacer></v-spacer>
      <v-text-field
      v-model="search"
      @keyup="searchTernak"
            class="ml-2 mt-7"
            label="Cari"
            single-line
            solo
            dense
            append-icon="mdi-magnify"
            color="#FFFFFF"
          ></v-text-field>
      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            @click="() => {this.$router.push({ path: '/profile' })}"
          >
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  <v-container>
    <v-row>
      <div v-for="ternak in ternaks" :key="ternak.id" style="width:44%; margin-left:4%; margin-top:4%; margin-bottom:2%">
              <Card :ternak="ternak"/>
    </div>
    </v-row>

    
    <div class="text-center mt-4">
    <v-pagination
      v-model="page"
      :length="ternaks.length"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
  </v-container>
  </div>
</template>

<script>

import Card from "@/components/Card";
import axios from "axios";
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.type";

  export default {
    name: 'Qurban',
  components: {
    Card,
  },
  computed: {
        ...mapGetters(["currentUser", "isAuthenticated"])
    },
    data () {
      return {
        page: 1,
        ternaks: [],
        search: '',
      }
    },

    methods: {
    setternaks(data) {
      this.ternaks = data;
      console.log(this.ternaks);
    },
      logout() {
      this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push({ name: "login" });
      });
    },
    searchTernak() {
    axios
      .get("http://ternakmart.id/ternakmart_api/public/api/cariternak/?search="+this.search)
      .then((response) => this.setternaks(response.data.ternak))
      .catch((error) => console.log(error))
  },
  },
  mounted() {
    axios
      .get("http://ternakmart.id/ternakmart_api/public/api/ternak")
      .then((response) => this.setternaks(response.data.ternak))
      .catch((error) => console.log(error))
  },
  }
</script>