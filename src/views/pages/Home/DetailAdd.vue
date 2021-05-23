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
                                    v-model="order.nama_penerima"
                                    label="Nama Penerima"
                                    type="text"
                                >
                                </v-text-field>
                                <v-select
                                v-model="order.province_id"
                                :items="provinces"
                                item-text="province"
                                item-value="province_id"
                                label="Provinsi"
                                append-outer-icon="mdi-map"
                                @change="getkotabyidProv"
                                >
                                </v-select>
                                <v-select
                                v-model="order.city_id"
                                :items="cities"
                                item-text="city_name"
                                item-value="city_id"
                                label="Kabupaten/Kota"
                                append-outer-icon="mdi-map"
                                @change="gethargaOngkir"
                                ></v-select>
                                <v-text-field
                                    append-icon="mdi-map-marker"
                                    v-model="order.detail_alamat"
                                    label="Alamat"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-note"
                                    v-model="order.transaksi_note"
                                    label="Note to Driver"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-dollar"
                                    v-model="harga_ongkir"
                                    label="Harga Ongkir"
                                    type="text"
                                    readonly
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
            // alamat:{},
            order:{},
            parameter:{},
            profile:[],
            cities:[],
            provinces:[],
            costData:{},
            distance: '',
            harga_ongkir: ''
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
        // this.order.transaksi_alamat = JSON.stringify(this.alamat);
        this.order.order_id = "ORDER-"+(new Date().getTime());
        this.order.origin_id = this.ternak.city_id;
        this.order.destination_id = 472;
        // ongkir
        this.order.distance = this.distance;
        this.order.harga_ongkir = this.harga_ongkir;
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
                    .post("transaksi", this.order)
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
            .get("lokasi/kota/"+this.order.province_id)
            .then((response) => {
                this.cities = response.data.kota
            })
            .catch((error) => console.log(error));
        },
        gethargaOngkir(){
            //get data kota
            axios
            .get("lokasi/kota/"+this.order.city_id+"/detail")
            .then((response) => {
                let start_point = (response.data.kota.latitude + "," + response.data.kota.longitude)
                let end_point = (this.ternak.latitude + "," + this.ternak.longitude)
                
                axios.get("https://distance-calculator.p.rapidapi.com/v1/one_to_one?start_point="+start_point+"&end_point="+end_point+"&unit=kilometers", {
                    headers: {
                        'x-rapidapi-key': '38066ec1d5msh0c6db7b7abef6cap10f235jsn47d20ec77887',
                        'x-rapidapi-host': 'distance-calculator.p.rapidapi.com',
                        'useQueryString': 'true'
                    }
                }).then((res) => {
                    this.distance = Math.round(res.data.distance)
                    this.harga_ongkir = Math.round(res.data.distance)*5620
                })
            })
            .catch((error) => console.log(error));
        }
    },
    mounted() {
        this.setProfile(this.$store.state.auth.user)
        //get data terbaj by id ternak
    axios
      .get("ternak/" + this.$route.params.id)
      .then((response) => this.setTernak(response.data.ternak))
      .catch((error) => console.log(error));

    
  },

    created: function () {
     //get data provinsi
    axios
      .get("lokasi/provinsi")
      .then((response) => {
            this.provinces = response.data.provinsi
      })
      .catch((error) => console.log(error));
    }
  }

</script>
<style scoped>

</style>