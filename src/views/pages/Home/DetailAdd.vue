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
                                    append-icon="mdi-map-marker"
                                    v-model="alamat.alamat"
                                    label="Alamat"
                                    type="text"
                                >
                                </v-text-field>
                                <v-select
                                v-model="alamat.selectedProv"
                                :items="provinces"
                                item-text="province"
                                item-value="province_id"
                                label="Provinsi"
                                append-outer-icon="mdi-map"
                                @change="getkotabyidProv"
                                >
                                </v-select>
                                <v-select
                                v-model="alamat.selectedCity"
                                :items="cities"
                                item-text="city_name"
                                item-value="city_id"
                                label="Kabupaten/Kota"
                                append-outer-icon="mdi-map"
                                ></v-select>
                                <v-text-field
                                    append-icon="mdi-note"
                                    v-model="alamat.note"
                                    label="Note to Driver"
                                    type="text"
                                >
                                </v-text-field>
                                
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
            provinces:[],
            costData:{}
        }
    },
    methods:{
        setProfile(data) {
        this.profile = data;
        }, 
        setTernak(data) {
        this.ternak = data;
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
        this.order.origin_id = this.ternak.city_id;
        this.order.destination_id = 472;

        //set data parameter getToken
        this.parameter.order_id = this.order.order_id;
        this.parameter.gross_amount = this.order.total_harga;
        this.parameter.name = this.profile.name;
        this.parameter.email = this.profile.email;
        this.parameter.phone = "089602015445";

        // set data parameter ger Cost Rajaognkri
        this.costData.origin = this.ternak.city_id;
        this.costData.destination = this.order.destination_id;
        this.costData.weight = 800;
        this.costData.courier = "jne";

        console.log(this.costData)
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

            // var instance = axios.create();
            // delete instance.defaults.headers.common['Authorization'];
            //     instance.post("https://api.rajaongkir.com/starter/cost",  
            //         {
            //             headers: {
            //             'content-type': 'application/x-www-form-urlencoded',
            //             'key': 'acbbd724a63c95cde3c321e1edafee7c',
            //             },
            //             data:this.costData
            //         })
            //         .then(() => {
            //             console.log(this.costData)
            //             });

        },

        getkotabyidProv(){
            //get data kota
            axios
            .get("http://ternakmart.id/ternakmart_api/public/api/lokasi/kota/"+this.alamat.selectedProv)
            .then((response) => {
                    this.cities = response.data.kota
                    console.log(this.cities)
            })
            .catch((error) => console.log(error));
                }
    },
    mounted() {
        this.setProfile(this.$store.state.auth.user)
        //get data terbaj by id ternak
    axios
      .get("http://ternakmart.id/ternakmart_api/public/api/ternak/" + this.$route.params.id)
      .then((response) => this.setTernak(response.data.ternak))
      .catch((error) => console.log(error));

    
  },

    created: function () {
     //get data provinsi
    axios
      .get("http://ternakmart.id/ternakmart_api/public/api/lokasi/provinsi")
      .then((response) => {
            this.provinces = response.data.provinsi
      })
      .catch((error) => console.log(error));
    }
  }

</script>
<style scoped>

</style>