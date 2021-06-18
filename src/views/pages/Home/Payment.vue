<template>
    <div>
        <AppBar :page="page"/>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm12 md12>
                    
                    <v-row class="mt-12">
                        <v-col cols="12">
                            <v-card>
                        

                        <v-card-text>
                            <h3 class="subtitle font-weight-bold"
                                    > Detail Pemesanan </h3>
                          <table class="table">
                            <tbody>
                              <tr>
                                <td>Penerima</td>
                                <td> : </td>
                                <td>{{data.nama_penerima}}</td>
                              </tr>
                              <tr>
                                <td>Detail Alamat</td>
                                <td> : </td>
                                <td>{{data.detail_alamat}}</td>
                              </tr>
                              <tr>
                                <td>Note</td>
                                <td> : </td>
                                <td>{{data.transaksi_note}}</td>
                              </tr>
                              <tr>
                                <td>Nama</td>
                                <td> : </td>
                                <td>{{data.ternak_nama}}</td>
                              </tr>
                              <tr>
                                <td>Masa perawatan</td>
                                <td> : </td>
                                <td>{{data.masa_perawatan}} Hari</td>
                              </tr>
                              <tr>
                                <td>Harga Ternak</td>
                                <td> : </td>
                                <td>Rp. {{formatPrice(data.ternak_harga)}}</td>
                              </tr>
                              <tr>
                                <td>Harga Perawatan</td>
                                <td> : </td>
                                <td>Rp. {{formatPrice(data.perawatan_harga*data.masa_perawatan)}}</td>
                              </tr>
                              
                            </tbody>
                            </table>
                        </v-card-text>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <span class="subtitle font-weight ml-auto mr-3"
                                    > Total Pembayaran</span>
                                    <span class="subtitle font-weight-bold ml-auto mr-3">
                                        Rp {{formatPrice(data.total_harga)}}
                                    </span>
                                    
                        </v-card-actions>
                        <v-btn
                          color="orange lighten-2"
                          dark
                          class="mb-3 ml-3"
                          v-on:click="createInvoice()"
                          :loading="loading3"
                          :disabled="loading3"
                          @click="loader = 'loading3'">
                        
                            Bayar Sekarang
                        </v-btn>
                      </v-card>
                        </v-col>
                    </v-row>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>


<script>
import AppBar from '@/components/AppBar.vue';
import axios from 'axios';


export default {
    components: {
        AppBar,
    },
    data: () => ({
        page: {
            link: '/cart',
            title: 'Metode Pembayaran',
        },
        data:{},
        selectedPayment:null,
        radios: null,
        parameter: {},
        token:"",
        profile: [],
        loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
        loading5: false,
    }),
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },

    methods:{
    setData(data) {
    this.data = data;
    console.log(this.data)
    },

    setProfile(data) {
      this.profile = data;
    },  

    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    // testPay(){
    //     this.parameter.order_id = this.data.order_id;
    //     this.parameter.gross_amount = this.data.ternak_harga;
    //     this.parameter.name = this.profile.name;
    //     this.parameter.email = this.profile.email;

    //     axios
    //         .post("http://ternakmart.id/ternakmart_api/public/api/transaksi_getToken",  this.parameter)
    //         .then((response) => {
    //             window.snap.pay(response.data.token);
    //         })
        
        // console.log(this.parameter.customer_details)

        // window.snap.pay(this.data.transaksi_token);
    // },

    createInvoice(){
      this.parameter.external_id = "Invoice-"+(new Date().getTime());
      this.parameter.amount = this.data.total_harga;
      this.parameter.payer_email = this.data.email;
      this.parameter.description = "Order Id "+ this.data.order_id;
      this.parameter.order_id = this.data.order_id;

      axios
            .post("transaksi_createinvoice",  this.parameter)
            .then((response) => {
              console.log(response.data)
              window.location = response.data.Response.invoice_url;
                
            })
    }

  },
  mounted() {
      this.setProfile(this.$store.state.auth.user)
            
      //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
        //change this according to your client-key
        const myMidtransClientKey = 'SB-Mid-client-oFw30zXYyh5KvFiA'; 

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
        document.body.removeChild(scriptTag);
        },

    axios
      .get("transaksi/"+this.$route.params.id+"/detail")
      .then((response) => {
          this.setData(response.data.cart)
          
      })
      .catch((error) => console.log(error));

    

  },
}
</script>