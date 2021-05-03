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
            order:{}
        }
    },
    methods:{
        setTernak(data) {
        this.ternak = data;
        console.log(this.ternak);
        },
        pemesanan() {
        
        this.order.id_ternak = this.ternak.id;
        this.order.id_user =  this.$store.state.auth.user.id;
        this.order.ternak_harga = this.ternak.ternak_harga;  
        this.order.masa_perawatan = 12; //contoh
        this.order.total_harga = 1444455;
        this.order.transaksi_st = "cart";
        this.order.transaksi_alamat = JSON.stringify(this.alamat);

        console.log(this.order);
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
     
    },
    },
    mounted() {
    axios
      .get("http://ternakmart.id/ternakmart_api/public/api/ternak/" + this.$route.params.id)
      .then((response) => this.setTernak(response.data.ternak))
      .catch((error) => console.log(error));
  },
}
</script>
<style scoped>

</style>