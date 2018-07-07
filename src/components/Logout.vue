<template>
</template>

<script>
export default {
	mounted() {
		this.$store.dispatch('authLogout').then(() => {
			this.$router.push('/')
		})
	}
}
</script>
