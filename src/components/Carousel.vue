<template>
    <v-carousel
    elevation="24"
    cycle
    height="150"
    width="150"
    hide-delimiter-background
    show-arrows-on-hover
    class="shadow-md"
    :rounded="rounded"
    delimiter-icon="mdi-minus"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      :src=slide
      
    >

    </v-carousel-item>
  </v-carousel>
  
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