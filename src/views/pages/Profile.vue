<template>
<v-container fluid mt-5>
    <!-- <div class="home">
        <div class="row">
            <div class="col-5">
                <v-avatar
                color="primary"
                size="100"
                >asd</v-avatar>
            </div>
            <div class="col-1">asdasd</div>
        </div>
        
    <h4>Profile</h4>
  </div> -->
  <v-row class="justify-md" mt-8 >
      <v-col cols="4">
              <v-avatar 
                color="primary"
                size="100"
                >{{profile.name}}</v-avatar>
      </v-col>
      <v-col cols="8">
          <h2>{{profile.name}}</h2>
          <subtitle-1>{{profile.email}}</subtitle-1>
      </v-col >
  </v-row>
      <v-divider inset></v-divider>
    <div class="row mt-3">
        <v-tabs v-model="tab">
            <v-tab :key=1>Activity</v-tab>
            <v-tab :key=2>Transaksi</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item :key=1>
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

                        <!-- <v-card-subtitle v-text="item.ternak_deskripsi"></v-card-subtitle> -->
                        <v-card-subtitle>
                          <div class="subtitle font-weight-bold" color="#FF8F0B">
                            Rp. {{ formatPrice(item.ternak_harga) }}
                        </div>
                        </v-card-subtitle>
                        <v-card-actions>
                          <div class="text-center">
                            <v-btn small
                                  color="orange lighten-2"
                                  dark
                                  :to="'payment/'+item.id"
                                >
                                  Konfirmasi Pembayaran
                                </v-btn>
                              
                          </div>
                        </v-card-actions>
                      </div>

                      
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item :key=2>
              
            </v-tab-item>
        </v-tabs-items>
    </div>
        
</v-container>
  
</template>

<script>

import axios from "axios"

export default {
  name: 'Profile',
  components: {
    
  },
  data() {
    return {
      profile: [],
      carts:{}
    };
  },
  methods: {
    setProfile(data) {
      this.profile = data;
    },
    setCarts(data) {
    this.carts = data;
    console.log(this.carts);
    },
    formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
  },
  mounted(){
      this.setProfile(this.$store.state.auth.user)
      console.log(this.$store.state.auth.user);

      axios
      .get("http://ternakmart.id/ternakmart_api/public/api/transaksi/"+this.$store.state.auth.user.id+"/waiting")
      .then((response) => this.setCarts(response.data.cart))
      .catch((error) => console.log(error));
  
  },
}
</script>
