<template>
  <div>
    <AppBar :page="page" :updateCart="carts"/>
    <v-container class="elevation-0 mt-12 mb-12">
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
                  <div class="text-center">
                    <v-dialog
                      v-model="dialog"
                      width="500"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="#139CA4"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          Details
                        </v-btn>
                        <v-btn
                          color="orange lighten-2"
                          dark
                          :to="'payment/'+item.id"
                        >
                          Checkout
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="headline grey lighten-2">
                          Detail Pesanan
                        </v-card-title>

                        <v-card-text>
                          <table class="table">
                            <tbody>
                              <tr>
                                <td>Nama Ternak</td>
                                <td> : </td>
                                <td>{{item.ternak_nama}}</td>
                              </tr>
                              <tr>
                                <td>Deskripsi</td>
                                <td> : </td>
                                <td>{{item.ternak_deskripsi}}</td>
                              </tr>
                              <tr>
                                <td>Harga</td>
                                <td> : </td>
                                <td>{{item.ternak_harga}}</td>
                              </tr>
                              <tr>
                                <td>Penerima</td>
                                <td> : </td>
                                <td>{{JSON.parse(item.transaksi_alamat).name}}</td>
                              </tr>
                              <tr>
                                <td>Detail Alamat</td>
                                <td> : </td>
                                <td>{{JSON.parse(item.transaksi_alamat).alamat}}, 
                                    {{JSON.parse(item.transaksi_alamat).detail_alamat}}
                                  </td>
                              </tr>
                              <tr>
                                <td>Note</td>
                                <td> : </td>
                                <td>{{JSON.parse(item.transaksi_alamat).note}}</td>
                              </tr>
                            </tbody>
                            </table>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <!-- <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                          >
                            I accept
                          </v-btn> -->
                          <v-btn
                          color="orange lighten-2"
                          dark
                          :to="'payment/'+item.id"
                        >
                          Checkout
                        </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
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
      .get("http://ternakmart.id/ternakmart_api/public/api/transaksi/"+this.$store.state.auth.user.id)
      .then((response) => this.setCarts(response.data.cart))
      .catch((error) => console.log(error));
  },
}
</script>
