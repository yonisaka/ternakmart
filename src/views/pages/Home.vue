<template>
  <div class="home">
    <app-header/>
      <v-container>
        <v-row no-gutters height="100">
          <v-col>
            <Carousel/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="subtitle font-weight-bold">
              Category
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" class="text-center">
              <ButtonCategory v-bind:data="{
                icon: 'mdi-account',
                title: 'qurban',
                to: 'url'
              }"/>
          </v-col>
          <v-col cols="3" class="text-center">
              <ButtonCategory v-bind:data="{
                icon: 'mdi-account',
                title: 'qurban',
                to: 'url'
              }"/>
          </v-col>
          <v-col cols="3" class="text-center">
              <ButtonCategory v-bind:data="{
                icon: 'mdi-account',
                title: 'qurban',
                to: 'url'
              }"/>
          </v-col>
          <v-col cols="3" class="text-center">
              <ButtonCategory v-bind:data="{
                icon: 'mdi-account',
                title: 'qurban',
                to: 'url'
              }"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="subtitle font-weight-bold">
              Qurban Premium
            </div>
          </v-col>
        </v-row>
        <slider ref="slider" :options="options" class="mt-5">
            <!-- slideritem wrapped package with the components you need -->
            <slideritem v-for="n in 5" :key="n" style="width:48%; margin-right:2%">
              <Card/>
            </slideritem>
            <!-- Customizable loading -->
            <div slot="loading">loading...</div>
        </slider>
        <!-- <v-row dense>
          <v-col
            v-for="n in 5"
            :key="n"
            cols="6"
          >
            <Card/>
          </v-col>
        </v-row> -->
      </v-container>
  </div>
</template>

<script>
import { slider, slideritem } from 'vue-concise-slider'
import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
import ButtonCategory from "@/components/ButtonCategory";
import AppHeader from '@/layout/AppHeader.vue';

export default {
  name: 'Home',
  components: {
    AppHeader,
    Carousel,
    Card,
    slider,
    slideritem,
    ButtonCategory
  },
  data () {
    return {
      //Slider configuration [obj]
      options: {
        pagination: true,
        thresholdDistance: 100, // Sliding distance threshold
        thresholdTime: 300, // Sliding time threshold decision
        grabCursor: true, // Scratch style
        speed: 300 // Sliding speed
        // timingFunction: 'ease', // Sliding mode
        // loop: false, // Infinite loop
        // autoplay: 0 // Auto play[ms]
      }
    }
  },
}
</script>
