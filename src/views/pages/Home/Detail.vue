<template>
    <v-card
        max-width="100%"
        class="mx-auto"
    >
        <v-img
        :src="data.file_path"
        height="300px"
        dark
        >
        <v-row>
            <v-card-title>
            <v-btn
                :to="{ name: 'home' }"
                class="mt-3 ml-3"
                dark
                icon
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <!-- <v-btn
                dark
                icon
                class="mr-4"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn
                dark
                icon
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->
            </v-card-title>

            <!-- <v-spacer></v-spacer> -->

            <!-- <v-card-title class="white--text pl-12 pt-12">
            <div class="display-1 pl-12 pt-12">
                Ali Conners
            </div>
            </v-card-title> -->
        </v-row>
        </v-img>
        <v-card-text>
            <v-row>
                <v-col>
                    <div class="title font-weight-bold text-center"
                    >
                        <span class="cyan--text">{{data.ternak_nama}}</span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <div class="subtitle font-weight-bold text-center">
                        {{data.ternak_berat}} KG<br>
                        Berat Hidup
                    </div>
                </v-col>
                <v-col cols="4">
                    <div class="subtitle font-weight-bold text-center">
                        {{data.ternak_tinggi}} CM<br>
                        Tinggi Badan
                    </div>
                </v-col>
                <v-col cols="4">
                    <div class="subtitle font-weight-bold text-center">
                        {{data.ternak_umur}} Bulan <br>
                        Umur
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                        color="grey lighten-2"
                        elevation="2"
                        outlined
                        shaped
                    >
                        <v-card-title>
                            <div class="subtitle font-weight-bold">
                                Deskripsi
                            </div>
                        </v-card-title>
                        <v-card-text
                            class="text-justify"
                        >
                            {{data.ternak_deskripsi}}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <!-- <v-list two-line>
        <v-list-item>
            <v-list-item-content
            position="center"
            >
            <v-list-item-title>(650) 555-1234</v-list-item-title>
            <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

        </v-list-item>
        </v-list> -->
        <v-card
        elevation="2"
        outlined
        class="rounded-card"
        >
        <v-card-text>
            <v-row
            class="my-1 mx-3"
            >
            <div class="title font-weight-bold ml-3">
                Rp 13.500.000
            </div>
            <v-spacer></v-spacer>
            <v-btn
            color="#139CA4"
            class="white--text px-10"
            :to="{ name: 'detail_add'}"
            >
                Beli
            </v-btn>
            </v-row>
        </v-card-text>
        </v-card>
    </v-card>
</template>

<script>

import axios from "axios";

export default {
  name: 'Detail',
  components: {
    
  },
  data(){
      return{
          data:{}
      }
  },
  methods:{
    setData(data) {
    this.data = data;
    console.log(this.data);
    },
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/ternak/" + this.$route.params.id)
      .then((response) => this.setData(response.data.ternak))
      .catch((error) => console.log(error));
  },
}
</script>
<style scoped>
.rounded-card {
    border-radius: 1rem 1rem 0 0;
}
</style>
