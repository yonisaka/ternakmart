<template>
  <div>
    <AppBar :page="page" :updateCart="carts"/>
    <v-container class="elevation-0 mt-12">
      <v-row dense>

        <v-col
          v-for="(item, i) in carts"
          :key="i"
          cols="12"
        >
          <v-card>
            <div class="d-flex flex-no-wrap">
              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.file_path"></v-img>
              </v-avatar>
              <div>
                
                <v-card-title
                  class="text-h5"
                  v-text="item.ternak_nama"
                ></v-card-title>

                <v-card-subtitle v-text="item.ternak_deskripsi"></v-card-subtitle>
                <v-card-subtitle>
                  <div class="subtitle font-weight-bold" color="#FF8F0B">
                    Rp. {{ formatPrice(item.ternak_harga) }}
                </div>
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-2"
                    outlined
                    rounded
                    small
                  >
                    Details
                  </v-btn>
                </v-card-actions>
              </div>

              
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import AppBar from '@/components/AppBar.vue';
import axios from "axios";

export default {
  name: 'Cart',
  components: {
    AppBar,
    
  },
  data(){
    return{
      page: {
            link: '/',
            title: 'Keranjang',
        },
            carts: [],
    }
  },
  methods:{
    setCarts(data) {
    this.carts = data;
    console.log(this.carts);
    },
    formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
  },

  mounted() {
    axios
      .get("http://api.ternakmart.id/api/transaksi/"+this.$store.state.auth.user.id)
      .then((response) => this.setCarts(response.data.cart))
      .catch((error) => console.log(error));
  },
}
</script>
