<template>
  <v-app>
    <v-app-bar flat class="d-flex">
      <NuxtLink class="pa-2" to="/">Home</NuxtLink>
      <NuxtLink class="pa-2" to="/item">Item</NuxtLink>
    </v-app-bar>
    <v-main>
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
h1 {
  padding-top: $header-height;
}
</style>
