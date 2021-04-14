<template>
    <v-card
        max-width="100%"
        class="mx-auto"
    >
        <v-img
        src="https://cdn.vuetifyjs.com/images/lists/ali.png"
        height="300px"
        dark
        >
        <v-row>
            <v-card-title>
            <v-btn
                :to="{ name: 'home' }"
                class="mt-3 ml-3"
                dark
                icon
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <!-- <v-btn
                dark
                icon
                class="mr-4"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn
                dark
                icon
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->
            </v-card-title>

            <!-- <v-spacer></v-spacer> -->

            <!-- <v-card-title class="white--text pl-12 pt-12">
            <div class="display-1 pl-12 pt-12">
                Ali Conners
            </div>
            </v-card-title> -->
        </v-row>
        </v-img>
        <v-card-text>
            <v-row>
                <v-col>
                    <div class="title font-weight-bold text-center"
                    >
                        <span class="cyan--text">Sapi Qurban Premium</span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <div class="subtitle font-weight-bold text-center">
                        147 KG<br>
                        Berat Hidup
                    </div>
                </v-col>
                <v-col cols="4">
                    <div class="subtitle font-weight-bold text-center">
                        147 CM<br>
                        Tinggi Badan
                    </div>
                </v-col>
                <v-col cols="4">
                    <div class="subtitle font-weight-bold text-center">
                        14 Bulan <br>
                        Umur
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                        color="grey lighten-2"
                        elevation="2"
                        outlined
                        shaped
                    >
                        <v-card-title>
                            <div class="subtitle font-weight-bold">
                                Deskripsi
                            </div>
                        </v-card-title>
                        <v-card-text
                            class="text-justify"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Quis quam urna id viverra netus et quis pharetra et. Suscipit pellentesque volutpat sit libero in amet. 
                            Lorem tincidunt enim imperdiet ut. Lacinia nisi, nisi elit sit. Ullamcorper non sit orci vitae vitae. 
                            Sit consectetur lorem ut turpis faucibus iaculis mattis aliquam.
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <!-- <v-list two-line>
        <v-list-item>
            <v-list-item-content
            position="center"
            >
            <v-list-item-title>(650) 555-1234</v-list-item-title>
            <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

        </v-list-item>
        </v-list> -->
        <v-card
        elevation="2"
        outlined
        class="rounded-card"
        >
        <v-card-text>
            <v-row
            class="my-1 mx-3"
            >
            <div class="title font-weight-bold ml-3">
                Rp 13.500.000
            </div>
            <v-spacer></v-spacer>
            <v-btn
            color="#139CA4"
            class="white--text px-10"
            >
                Beli
            </v-btn>
            </v-row>
        </v-card-text>
        </v-card>
    </v-card>
</template>

<script>

export default {
  name: 'Detail',
  components: {
    
  },
}
</script>
<style scoped>
.rounded-card {
    border-radius: 1rem 1rem 0 0;
}
</style>
