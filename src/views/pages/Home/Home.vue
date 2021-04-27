<template>
  <div class="home">
    <app-header/>
    <div class="oval">
  <div class="square">
  </div>
  
  </div>
    
      <v-container>
        <div class="wrapper"><subtitle style="color:white">Selamat Datang, </subtitle>
        <h4 style="color:white">{{profile.name}}</h4>
    <v-row no-gutters height="100">
          <v-col>
            <Carousel/>
          </v-col>
        </v-row>
  </div>
        
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
            <slideritem v-for="ternak in ternaks" :key="ternak.id" style="width:48%; margin-right:2%">
              <Card :ternak="ternak"/>
            </slideritem>
            <!-- Customizable loading -->
            <div slot="loading">
                <v-sheet
              :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
              class="pa-3"
            >
              <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                type="card"
              ></v-skeleton-loader>
            </v-sheet>
            </div>
            
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

<style>
.oval {
  height: 200px;
  width: 110%;
  background-color: #139CA4;
  border-radius: 50%;
  margin-left: -5%;
}
.square {
  height: 110px;
  width: 100%;
  background-color: #139CA4;
  margin-top: -2em;
  /* border:solid; */
}
.wrapper{
  padding: 10px;
  padding-top:0px;
  padding-bottom: 0px;
  margin-bottom: 10px;
  margin-top: -10em;
  /* border:solid; */
}
</style>

<script>
import { slider, slideritem } from 'vue-concise-slider'
import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
import ButtonCategory from "@/components/ButtonCategory";
import AppHeader from '@/layout/AppHeader.vue';
import axios from "axios";

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
      ternaks: [],
      profile:[],
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
  methods: {
    setternaks(data) {
      this.ternaks = data;
      console.log(this.ternaks);
    },
    setProfile(data) {
      this.profile = data;
    },
  },
  mounted() {
    // console.log(this.$cookie.get('user'));
    this.setProfile(this.$store.state.auth.user)
    axios
      .get("http://localhost:8000/api/ternak")
      .then((response) => this.setternaks(response.data.ternak))
      .catch((error) => console.log(error))
  },
  inject: {
      theme: {
        default: { isDark: false },
      },
    },
}
</script>
