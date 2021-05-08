<template>
<v-card
    elevation="12"
    class="mx-auto"
  >
    <v-carousel
    cycle
    height="150px"
    hide-delimiter-background
    show-arrows-on-hover
    class="shadow-md"
    delimiter-icon="mdi-minus"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      
    >
    <v-img :src=slide
    width="100%"
    height="100%"></v-img>
    </v-carousel-item>
  </v-carousel>
  
  </v-card>
    
</template>




<script>
  export default {
    data: () => ({
      model: 0,
      colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'http://ternakmart.id/ternakmart_api/public/carousel/cr1.jpeg',
          'http://ternakmart.id/ternakmart_api/public/carousel/cr2.jpeg',
          'http://ternakmart.id/ternakmart_api/public/carousel/cr3.jpeg',
          'http://ternakmart.id/ternakmart_api/public/carousel/cr4.jpeg',
          'http://ternakmart.id/ternakmart_api/public/carousel/cr5.jpeg',
        ],
    }),
  }
</script>