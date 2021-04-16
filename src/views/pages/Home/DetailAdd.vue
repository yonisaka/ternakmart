<template>
    <div>
        <AppBar :page="page"/>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-0 mt-10" >
                        <v-card-text>
                            <ul v-if="errors" class="red--text my-3">
                                <li v-for="(v, k) in errors" :key="k"> {{ v[0] | error }}</li>
                            </ul>
                            <v-form @submit.prevent="onSubmit" id="register">
                                <v-text-field
                                    append-icon="mdi-account"
                                    v-model="name"
                                    label="Nama Lengkap"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-map"
                                    v-model="alamat"
                                    label="Address"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-map-marker"
                                    v-model="alamat"
                                    label="Detail Address"
                                    type="text"
                                >
                                </v-text-field>
                                <v-text-field
                                    append-icon="mdi-note"
                                    v-model="note"
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

export default {
    components: {
        AppBar,
    },
    data() {
        return {
            page: {
                link: '/detail',
                title: 'Add Address',
            }
        }
    }
}
</script>
<style scoped>

</style>