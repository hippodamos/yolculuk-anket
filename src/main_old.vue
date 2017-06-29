<template>
	<!-- App -->
	<div id="app">

		<!-- Statusbar -->
		<f7-statusbar></f7-statusbar>

		<!-- Main Views -->
		<f7-views>
			<f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
				<!-- Navbar -->
				<f7-navbar>
					<f7-nav-left>
						<!-- <f7-link icon="icon-bars" open-panel="left"></f7-link> -->
					</f7-nav-left>
					<f7-nav-center sliding>Yolculuk Anketi</f7-nav-center>
					<f7-nav-right>
						<!-- <f7-link icon="icon-bars" open-panel="right"></f7-link> -->
					</f7-nav-right>
				</f7-navbar>
				<!-- Pages -->
				<f7-pages>
					<f7-page>
						<!-- <f7-block-title>Genç Yetişkinlerin Yürümeyi Tercih Ettiği / Etmediği Mekanların Fiziksel Özelliklerinin Analizine Yönelik Yeni Bir Yöntem Önerisi</f7-block-title>
						<f7-block inner>
							<p>Genç Yetişkinlerin Yürümeyi Tercih Ettiği / Etmediği Mekanların Fiziksel Özelliklerinin Analizine Yönelik Yeni Bir Yöntem Önerisi</p>
						</f7-block> -->
						<f7-block-title>Aktif Yolculuk</f7-block-title>
						<f7-block>
							<f7-list inset>
								<f7-list-group v-if="!$store.state.currentTrip">
									<f7-list-button @click="$f7.mainView.router.load({url:'/trip-start/'})">Yeni Yolculuk Başlat</f7-list-button>
								</f7-list-group>
								<f7-list-group v-if="$store.state.currentTrip">
									<f7-list-item title="Başlangıç Zamanı:">
										<div class="dont-wrap">{{ $store.state.currentTrip.startDate + '\n' + $store.state.currentTrip.startTime }}</div>
									</f7-list-item>
									<f7-list-item title="Güzergah:">
										<div class="dont-wrap">{{ '• ' + $store.getters.getNodeName($store.state.currentTrip.departureNode)+'\n'+'> ' + $store.getters.getNodeName($store.state.currentTrip.destinationNode) }}</div>
									</f7-list-item>
									<f7-list-item title="Ulaşım Türeli:">
										{{ $store.getters.getModName($store.state.currentTrip.mod)}}
									</f7-list-item>
									<f7-list-button color="red" @click="$f7.mainView.router.load({url:'/trip-stop/'})">Yolculuğu Sonlandır</f7-list-button>
								</f7-list-group>
							</f7-list>
						</f7-block>

						<f7-block-title>Yolculuk Listesi</f7-block-title>
						<f7-list media-list>
							<f7-list-item v-for="(trip, index) in trips"
								:title="formatDate(trip.startDate)"
								:after="trip.startTime"
								:media="(index+1).toString()"
								:text="$store.getters.getNodeName(trip.departureNode) +	' -> ' + $store.getters.getNodeName(trip.destinationNode) + '\n' + $store.getters.getModName(trip.mod)"
								@click="showActions(index)"
								style="white-space: pre;">
							</f7-list-item>
						</f7-list>

						<f7-fab @click="$f7.mainView.router.load({url:'/trip-new/'})">
							<f7-icon f7="add"></f7-icon>
						</f7-fab>

						<f7-fab-speed-dial>
							<f7-fab-actions>
								<f7-fab-action @click="shareList"color="green" close-speed-dial><f7-icon f7="share"></f7-icon></f7-fab-action>
								<f7-fab-action @click="clearList()" color="red" close-speed-dial><f7-icon f7="trash"></f7-icon></f7-fab-action>
								<f7-fab-action @click="addNewTrip()" close-speed-dial><f7-icon f7="add"></f7-icon></f7-fab-action>
							</f7-fab-actions>
							<f7-fab>
								<f7-icon f7="bars"></f7-icon>
						    <f7-icon f7="close"></f7-icon>
							</f7-fab>
						</f7-fab-speed-dial>

					</f7-page>
				</f7-pages>
			</f7-view>
		</f7-views>

		<f7-actions ref="act">
		  <!-- Actions Group -->
		  <f7-actions-group>
		    <!-- Actions Label -->
		    <f7-actions-label>Yolculuk: {{lastClickedTripIndex+1}}</f7-actions-label>
		    <!-- Actions Buttons -->
		    <f7-actions-button @click="$f7.mainView.router.load({url:'/trip-edit/' + lastClickedTripIndex})">Düzenle</f7-actions-button>
				<f7-actions-button color="red" bold @click="$store.commit({type:'delete', index: lastClickedTripIndex})">Sil</f7-actions-button>
		    <!-- <f7-actions-button>Button 2</f7-actions-button> -->
		  </f7-actions-group>
		  <!-- Another Group -->
		  <f7-actions-group>
		    <!-- Cancel/Close Button -->
		    <f7-actions-button bold @click="$refs.act.close()">İptal</f7-actions-button>
		  </f7-actions-group>
		</f7-actions>

	</div>
</template>

<script>
import store from 'assets/js/stores/store.js'

import {mapState} from 'vuex'

export default {
	data: function () {
		return {
			lastClickedTripIndex: -1
		};
	},

	store,

	computed: mapState(['trips']),

	methods: {
		formatDate (date) {
			let d = new Date(date)
			let dayStr = d.toLocaleDateString(undefined, {weekday: "long"})
			return dayStr + ' ' + d.toLocaleDateString()
		},
		showActions(tripIndex) {
			this.lastClickedTripIndex = tripIndex;
			this.$refs.act.open();
		},
		addNewTrip() {
			this.$f7.mainView.router.load({url:'/trip-new/'})
		},
		clearList() {
			this.$f7.confirm( "Yolculuk listesindeki her şey silinecek", "Listeyi Temizle",
				() => {this.$store.commit("clear")} )
		},
		shareList() {
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, (de) => {
				de.getFile("yolculuk_liste.json", 	{create: true, exclusive: false}, (fe) => {
					fe.createWriter((fw) => {
						fw.write(new Blob([JSON.stringify(this.$store.state.trips)], {type: 'application/json'}))
						// console.log(fe)
						// window.plugins.socialsharing.shareViaEmail(
						// 	'',
						// 	'Yolculuk Anket Listesi',
						// 	['srknornk@gmail.com'],
						// 	null,
						// 	null,
						// 	[fe.toURL()],
						// 	null,
						// 	null)
						window.plugins.socialsharing.shareWithOptions({files: [fe.toURL()], subject:"Yolculuk Anket Listesi"})
					})
				})
			})
		}
	},

	created: function () {
		this.$store.subscribe((mutation, state) => {
			window.localStorage.setItem('tripsStore', JSON.stringify(state.trips))
			window.localStorage.setItem('currentTrip', JSON.stringify(state.currentTrip))
		})
	},

	mounted () {
		document.addEventListener('backbutton', (ev) => {
			if(this.$f7.getCurrentView().activePage.url == '#null') {
				navigator.app.exitApp()
			}
			else {
				this.$f7.getCurrentView().router.back()
			}
		})
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
