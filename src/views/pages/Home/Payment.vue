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
                                        Rp. 68.000
                                    </span>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-bottom-sheet v-model="sheet">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    color="primary"
                                    dark
                                    outlined
                                    block
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    Pilih Metode Pembayaran
                                    </v-btn>
                                </template>
                                <BottomSheet :tiles="tiles"/>
                            </v-bottom-sheet>
                        </v-col>
                    </v-row>
                </v-flex>
                
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import BottomSheet from '@/components/BottomSheet.vue';

export default {
    components: {
        AppBar,
        BottomSheet,
    },
    data: () => ({
        page: {
            link: '/detail/add',
            title: 'Metode Pembayaran',
        },
        sheet: false,
        tiles: [
            { img: 'keep.png', title: 'Keep' },
            { img: 'inbox.png', title: 'Inbox' },
            { img: 'hangouts.png', title: 'Hangouts' },
            { img: 'messenger.png', title: 'Messenger' },
            { img: 'google.png', title: 'Google+' },
        ],
    }),
}
</script>