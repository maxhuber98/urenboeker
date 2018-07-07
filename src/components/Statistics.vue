<template>
  <v-container>
    <v-layout>
      <h1>Statistieken</h1>
    </v-layout>
  </v-container>
</template>

<script>
export default {
	mounted() {
		this.$store.commit('SET_LAYOUT', 'app-layout')
	}
}
</script>
