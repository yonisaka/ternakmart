<template>
<v-container fluid mt-5>
    <!-- <div class="home">
        <div class="row">
            <div class="col-5">
                <v-avatar
                color="primary"
                size="100"
                >asd</v-avatar>
            </div>
            <div class="col-1">asdasd</div>
        </div>
        
    <h4>Profile</h4>
  </div> -->
  <v-row class="justify-md" mt-8 >
      <v-col cols="4">
              <v-avatar 
                color="primary"
                size="100"
                >{{profile.name}}</v-avatar>
      </v-col>
      <v-col cols="8">
          <h2>{{profile.name}}</h2>
          <subtitle-1>{{profile.email}}</subtitle-1>
      </v-col >
  </v-row>
      <v-divider inset></v-divider>
    <div class="row mt-3">
        <v-tabs>
            <v-tab>Activity</v-tab>
            <v-tab>Transaksi</v-tab>
        </v-tabs>
    </div>
        
</v-container>
  
</template>

<script>

export default {
  name: 'Profile',
  components: {
    
  },
  data() {
    return {
      profile: [],
    };
  },
  methods: {
    setProfile(data) {
      this.profile = data;
    },
  },
  mounted(){
      this.setProfile(this.$store.state.auth.user)
      console.log(this.$store.state.auth.user);
  },
}
</script>
