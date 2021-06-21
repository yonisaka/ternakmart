<template>
    <div>
        <AppBar :page="page" :updateCart="carts"/>
        <v-container fluid mt-12 mb-12 mx-0>
            <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
            >
                <v-tab>Dalam Proses</v-tab>
                <v-tab>History</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item class="mt-3">
                    <v-row dense>
                        <v-col 
                            v-for="(item, i) in proses"
                            :key="i"
                            cols="12">
                            <v-card
                                elevation="1"
                                outlined
                            >
                                <div class="d-flex flex-no-wrap justify-space-between">
                                    <div>
                                        <v-card-title
                                        class="text-h6"
                                        >{{item.ternak_nama}}</v-card-title>

                                        <v-card-subtitle>Harga : Rp. {{formatPrice(item.total_harga)}}</v-card-subtitle>
                                        <v-card-subtitle>Status Pemesanan : {{ toUpperCase(item.transaksi_st) }}</v-card-subtitle>
                                    </div>

                                    <v-avatar
                                        class="ma-3"
                                        size="125"
                                        tile
                                    >
                                        <v-img :src="item.file_path" ></v-img>
                                    </v-avatar>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row dense>
                        <v-col 
                            v-for="(item, i) in history"
                            :key="i"
                            cols="12">
                            <v-card
                                elevation="1"
                                outlined
                            >
                                <div class="d-flex flex-no-wrap justify-space-between">
                                    <div>
                                        <v-card-title
                                        class="text-h6"
                                        >{{item.ternak_nama}}</v-card-title>

                                        <v-card-subtitle>Harga : Rp. {{formatPrice(item.total_harga)}}</v-card-subtitle>
                                        <v-card-subtitle>Status Pemesanan : {{ toUpperCase(item.transaksi_st) }}</v-card-subtitle>
                                    </div>

                                    <v-avatar
                                        class="ma-3"
                                        size="125"
                                        tile
                                    >
                                        <v-img :src="item.file_path" ></v-img>
                                    </v-avatar>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs-items>
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
    data(){
        return{
            tab: null,
            page: {
                link: '/',
                title: 'Activity',
            },
            proses: [],
            history: [],
        }
    },
    methods:{
        setProses(data) {
            this.proses = data;
        },
        setHistory(data) {
            this.history = data;
        },
        subStr(value) {
            return value.substring(0,100) + '...';
        },
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        toUpperCase(value){
            if(!value) return ''
                value = value.toString()
            return value.toUpperCase()
        },
    },

    mounted() {
        axios
        .get("transaksi/"+this.$store.state.auth.user.id+"/cart")
        .then((response) => this.setProses(response.data.cart.filter(cart => {
            return cart.transaksi_st != 'PAID' 
        })))
        .catch((error) => console.log(error));

        axios
        .get("transaksi/"+this.$store.state.auth.user.id+"/cart")
        .then((response) => this.setHistory(response.data.cart.filter(cart => {
            return cart.transaksi_st == 'PAID' 
        })))
        .catch((error) => console.log(error));
    },
}

</script>
