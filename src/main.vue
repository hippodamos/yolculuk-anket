<template>
	<!-- App -->
	<div id="app">

		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>

		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" navbar-fixed main>
				<!-- Pages -->
				<f7-pages>
					<!-- Home Page component -->
					<home></home>
				</f7-pages>
			</f7-view>
		</f7-views>

		<user-login></user-login>

	</div>
</template>

<script>

export default {
	components: {
		home: require("assets/vue/pages/home.vue"),
		"user-login": require("assets/vue/components/user-login.vue"),
	},
}
</script>
<style src="assets/css/framework7-icons.css"></style>
<style>
.dont-wrap {
	white-space:pre;
	text-align:center
}
</style>
