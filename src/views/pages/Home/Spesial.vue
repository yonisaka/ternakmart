<template>
    <div>
        <AppBar :page="page"/>
        <v-container fluid fill-height>
            <v-row class="my-10">
                <v-col 
                cols="12" 
                v-for="(img, i) in images"
                :key="i"
                >
                    <img :src="img" width="100%">
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import AppBar from '@/components/AppBar.vue';

export default {
    components: {
        AppBar,
    },
    data: () => ({
        page: {
            link: '/',
            title: 'Spesial Promo',
        },
        images: [
          'https://api.caltymart.com/promo/pr1.jpeg',
          'https://api.caltymart.com/promo/pr2.jpeg',
        ],
    })
}
</script>