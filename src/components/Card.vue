<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-card
            :loading="loading"
            class="mx-auto"
            >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="150px"
                >
                    <v-card-title>{{ ternak.ternak_nama }}</v-card-title>
                </v-img>
                <v-card-text
                    align="left"
                >
                    <v-rating
                    align="left"
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>
                    <div class="subtitle font-weight-bold" color="#FF8F0B">
                        <!-- Rp. 15.500.000 -->
                        Rp. {{ formatPrice(ternak.ternak_harga) }}
                    </div>

                </v-card-text>
                <!-- <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                </v-card-actions> -->

                <v-fade-transition>
                    <v-overlay
                        v-if="hover"
                        absolute
                        color="grey"
                    >
                        <v-btn
                        color="#139CA4"
                        :to="'detail/'+ternak.id"
                        >Beli</v-btn>
                    </v-overlay>
                </v-fade-transition>
            </v-card>
        </template>
    </v-hover>
</template>
<script>
    export default {
        props: ["ternak"],
        data: () => ({
            loading: false,
            selection: 1,
            overlay: false,
        }),

        methods: {
            reserve () {
                this.loading = true

                setTimeout(() => (this.loading = false), 2000)
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
    }
</script>