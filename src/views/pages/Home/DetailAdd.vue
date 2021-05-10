<template>
    <div>
        <AppBar :page="page"/>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-0 mt-10" >
                        <v-card-text>
                            <!-- <ul v-if="errors" class="red--text my-3">
                                <li v-for="(v, k) in errors" :key="k"> {{ v[0] | error }}</li>
                            </ul> -->
                            <v-form @submit.prevent="pemesanan" id="register">
                                <v-text-field
                                    append-icon="mdi-account"
                                    v-model="alamat.name"
                                    label="Nama Lengkap"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-map"
                                    v-model="alamat.alamat"
                                    label="Address"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-map-marker"
                                    v-model="alamat.detail_alamat"
                                    label="Detail Address"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-note"
                                    v-model="alamat.note"
                                    label="Note to Driver"
                                    type="text"
                                >
                                </v-text-field>
                                <v-select
                                :items="provinces"
                                label="Provinsi"
                                append-outer-icon="mdi-map"
                                >
                                </v-select>
                                <v-select
                                :items="cities"
                                label="Kabupaten/Kota"
                                append-outer-icon="mdi-map"
                                ></v-select>
                            </v-form> 
                        </v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-btn 
                                type="submit"
                                class="white--text font-weight-bold"
                                color="#139CA4"
                                block
                                form="register"
                                >
                                Save
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-btn 
                                type="submit"
                                class="white--text font-weight-bold"
                                color="red"
                                block
                                outlined
                                form="register"
                                >
                                Remove
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import axios from "axios";

export default {
    components: {
        AppBar,
    },
    data() {
        return {
            page: {
                link: '/detail/'+this.$route.params.id,
                title: 'Add Address',
            },
            ternak:{},
            alamat:{},
            order:{},
            parameter:{},
            profile:[],
            cities:[],
            city_id:[],
            province_id:[],
            provinces:[],
            raw_id:[],
            raw_name:[],
            kota:[]
        }
    },
    methods:{
        setProfile(data) {
        this.profile = data;
        console.log(this.profile)
        }, 
        setTernak(data) {
        this.ternak = data;
        console.log(this.ternak);
        },
        pemesanan() {
        
        //set data ke tabel transaksi
        this.order.id_ternak = this.ternak.id;
        this.order.id_user =  this.$store.state.auth.user.id;
        this.order.ternak_harga = this.ternak.ternak_harga;  
        this.order.masa_perawatan = 12; //contoh
        this.order.total_harga = 80*this.ternak.ternak_harga;
        this.order.transaksi_st = "cart";
        this.order.transaksi_alamat = JSON.stringify(this.alamat);
        this.order.order_id = "ORDER-"+(new Date().getTime());

        //set data parameter getToken
        this.parameter.order_id = this.order.order_id;
        this.parameter.gross_amount = this.order.total_harga;
        this.parameter.name = this.profile.name;
        this.parameter.email = this.profile.email;
        this.parameter.phone = "089602015445";

        

        axios
            .post("http://ternakmart.id/ternakmart_api/public/api/transaksi_getToken",  this.parameter)
            .then((response) => {
                // window.snap.pay(response.data.token);
                // console.log(response)

                this.order.transaksi_token = response.data.token;

                axios
                    .post("http://ternakmart.id/ternakmart_api/public/api/transaksi", this.order)
                    .then(() => {
                        this.$router.push({ path: "/cart"})
                        this.$toast.success("Sukses Masuk Keranjang", {
                        type: "success",
                        position: "top-right",
                        duration: 3000,
                        dismissible: true,
                        });
                    })
                    .catch((err) => console.log(err));

            })
    
     
    },
  
    },
    mounted() {
        this.setProfile(this.$store.state.auth.user)
        //get data terbaj by id ternak
    axios
      .get("http://ternakmart.id/ternakmart_api/public/api/ternak/" + this.$route.params.id)
      .then((response) => this.setTernak(response.data.ternak))
      .catch((error) => console.log(error));

  },

    created: async function () {
     //get data provinsi dan kota
    axios
      .get("http://ternakmart.id/ternakmart_api/public/api/lokasi")
      .then((response) => {
            
            for(let i=0; i<response.data.daftar_kota.length; i++){
                this.city_id[i] =response.data.daftar_kota[i].city_id,
                this.cities[i] =response.data.daftar_kota[i].city_name,
                this.raw_id[i] = response.data.daftar_kota[i].province_id,
                this.raw_name[i] = response.data.daftar_kota[i].province
            }

            this.province_id = [...new Set(this.raw_id)];
            this.provinces = [...new Set(this.raw_name)];
            this.cities = [...new Set(this.cities)];
            console.log(response.data.daftar_kota)
      })
      .catch((error) => console.log(error));
  }
}
</script>
<style scoped>

</style>