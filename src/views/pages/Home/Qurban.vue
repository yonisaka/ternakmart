<template>
    <div>
    <v-app-bar
      color="#139CA4"
      flat
      
    >
         <v-img
            src="img/brand/ternakmart.png"
            max-height="30"
            max-width="30"
            ></v-img>
<v-spacer></v-spacer>
      <v-text-field
            class="ml-2 mt-7"
            label="Cari"
            single-line
            solo
            append-icon="mdi-magnify"
            color="#FFFFFF"
          ></v-text-field>
      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            @click="() => {this.$router.push({ path: '/profile' })}"
          >
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>