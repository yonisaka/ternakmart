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
            <v-btn 
                icon
                @click="extend()"
            >
                <v-icon color="white">mdi-magnify</v-icon>
            </v-btn>
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
                    <v-icon color="white">mdi-dots-vertical</v-icon>
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
        <v-expand-transition>
            <v-sheet
                v-if="searchbar"
                color="#139CA4"
                height="150"
            >
                <v-container>
                    <v-row
                    class="fill-height"
                    no-gutters
                    >
                        <v-col cols="12">
                            <v-text-field
                            v-model="search.nama"
                            @keyup="searchTernak"
                                label="Cari Ternak"
                                solo
                                dense
                                append-icon="mdi-magnify"
                                color="white"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select
                            v-model="search.ukuran"
                            item-text="text"
                            item-value="value"
                            :items="ukuran"
                            label="Ukuran Ternak"
                            solo
                            dense
                            @change="searchTernak"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-sheet>
        </v-expand-transition>
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
        search: {},
        searchbar: false,
        ukuran:[
            {
                'text' : 'Kurban Sedang',
                'value' : '<400'
            },
            {
                'text' : 'Kurban Spesial',
                'value' : '<500'
            },
            {
                'text' : 'Kurban Premium',
                'value' : '<650'
            },
            {
                'text' : 'Kurban Super',
                'value' : '>651'
            }
        ],
      }
    },

    methods: {
    extend(){
        if (this.searchbar == false){
            this.searchbar = true
        } else {
            this.searchbar = false
        }
    },
    setternaks(data) {
      this.ternaks = data;
    },
      logout() {
      this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push({ name: "login" });
      });
    },
    searchTernak() {
        console.log(this.search)
        axios
        // .post("cariternak/?nama="+this.search.nama+"&ukuran="+this.search.ukuran)
        .post("cariternak",this.search)
        .then((response) => this.setternaks(response.data.ternak.filter(ternak => {
                return ternak.ternak_st == '1'
            })))
        .catch((error) => console.log(error))
    },
  },
  mounted() {
    this.search.nama = ''
    this.search.ukuran = ''
    axios
      .get("ternak")
      .then((response) => this.setternaks(response.data.ternak.filter(ternak => {
            return ternak.ternak_st == '1'
        })))
      .catch((error) => console.log(error))
  },
  }
</script>