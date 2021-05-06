<template>
    <div>
        <AppBar :page="page"/>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm12 md12>
                    <v-row>
                        <v-col cols="12">
                            <v-card class="elevation-2 mt-15" >
                                <v-card-text>
                                    <span class="subtitle font-weight-bold"
                                    > Total Pembayaran </span> <br>
                                    <span class="title font-weight-bold">
                                        Rp {{formatPrice(data.ternak_harga)}}
                                    </span>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-card class="elevation-2 mt-1" >
                                <v-card-text>
                                    <span class="subtitle font-weight-bold"
                                    > Pilih Metode Pembayaran </span>
                                    <v-list flat>
                                        <v-radio-group v-model="selectedPayment">
                                        <v-list-item-group
                                        >
                                            <v-list-item>
                                            <v-list-item-avatar>
                                            <v-avatar
                                                size="32px"
                                                tile>
                                                <img
                                                src="icon/cash.png"
                                                >
                                            </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title >Tunai</v-list-item-title>
                                            </v-list-item-content>
                                            <v-radio
                                                value="tunai"
                                            ></v-radio>
                                            </v-list-item>
                                            

                                            <v-list-item>
                                            <v-list-item-avatar>
                                            <v-avatar
                                                size="32px"
                                                >
                                                <img
                                                src="icon/bca.png"
                                                >
                                            </v-avatar>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title >Bank Transfer</v-list-item-title>
                                            </v-list-item-content>
                                            <v-radio
                                                value="bank"
                                            ></v-radio>

                                            </v-list-item>
                                        </v-list-item-group>
                                        </v-radio-group>
                                        </v-list>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-btn
                          color="orange lighten-2"
                          dark
                          v-on:click="addBilling()"
                          class="ml-auto mr-3"
                        >
                          Konfirmasi dan Buat Pesanan
                        </v-btn>
                    </v-row>
                    <v-row class="mt-8">
                        <v-btn
                          color="orange lighten-2"
                          dark
                          v-on:click="testPay()"
                          class="ml-auto mr-3"
                        >
                            Cek Payment
                        </v-btn>
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
        parameter: {
            "transaction_details": {
                "order_id": "ORDER-FAKE-01",
                "gross_amount": 10000
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "Bowo",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        },
    }),

    methods:{
    setData(data) {
    this.data = data;
    console.log(this.data);
    },

    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    addBilling(){
        axios
            .put("http://ternakmart.id/ternakmart_api/public/api/transaksi/"+this.$route.params.id+"/billing")
            .then(() => {
          
              this.$router.push({ path: "/"})

      })
      .catch((error) => console.log(error));
    },

    testPay(){
        
            // window.snap.pay(transactionToken);
            // console.log('test')
    },

  },
  mounted() {
      axios
            .post("http://ternakmart.id/ternakmart_api/public/api/transaksi/getToken",  this.parameter)
            .then((response) => {
                console.log(response)
            })
            
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
      .get("http://ternakmart.id/ternakmart_api/public/api/transaksi/"+this.$route.params.id+"/detail")
      .then((response) => this.setData(response.data.cart))
      .catch((error) => console.log(error));

    

  },
}
</script>