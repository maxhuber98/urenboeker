<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          v-bind:to="item.action"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
	data() {
		return {
			clipped: false,
			drawer: false,
			items: [
				{
					icon: 'home',
					title: 'Dashboard',
					action: 'home'
				},
				{
					icon: 'add_box',
					title: 'Toevoegen',
					action: 'add'
				},
				{
					icon: 'sort',
					title: 'Overzicht',
					action: 'overview'
				},
				{
					icon: 'show_chart',
					title: 'Statistieken',
					action: 'statistics'
				},
				{
					icon: 'settings_power',
					title: 'Uitloggen',
					action: 'logout'
				}
			],
			miniVariant: false,
			right: false,
			rightDrawer: false,
			title: 'Urenboeker'
		}
	},
	name: 'App'
}
</script>
