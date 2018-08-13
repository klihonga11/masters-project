<template>
	<div id="app">
		<!-- bootstrap 3 -->
		<nav id="nav" class="navbar navbar-default" style="margin:0px;">
		  <div class="container-fluid">
				<div class="navbar-header">
					<router-link class="navbar-brand" v-bind:to="{path:'/home'}">Mobi Publishing</router-link>
				</div>
				<ul class="nav navbar-nav navbar-right">
					<li><router-link v-bind:to="{name:'Cookbooks'}">Cookbooks</router-link></li>
					<li><router-link v-bind:to="{name:'Account'}">Account</router-link></li>
					<li><a href="#" v-on:click.prevent="logOut">Log Out</a></li>
				</ul>
		  </div>
		</nav>
		<router-view/>

		<!-- bootstrap 4 -->
		<!--<nav class="navbar navbar-expand-sm bg-light navbar-light">
				<router-link class="navbar-brand" v-bind:to="{path:'/home'}">Mobi Publishing</router-link>

				
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
					<span class="navbar-toggler-icon"></span>
				</button>

				
				<div class="collapse navbar-collapse" id="collapsibleNavbar">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item"><router-link class="nav-link" v-bind:to="{name:'Cookbooks'}">Cookbooks</router-link></li>
						<li class="nav-item"><router-link class="nav-link" v-bind:to="{name:'Account'}">Account</router-link></li>
						<li class="nav-item"><a href="#" class="nav-link" v-on:click.prevent="logOut">Log Out</a></li>
					</ul>
				</div>
		</nav>-->
	</div>
</template>

<script>
	import firebase from "../config";
	
	export default {
			name : 'Home',
			data () {
					return {}
			},
			methods : {
					logOut : function() {
							/*if(confirm("Are you sure you want to log out?")){
								firebase.auth().signOut().then(() => {
									this.$router.push({name:"Login"});
								})
							}*/

							BootstrapDialog.show({
								title: "Exit",
								message: "Are you sure you want to log out?",
								type: BootstrapDialog.TYPE_WARNING,
								buttons: [
									{
										label: "No",
										action: function(dialog) {
											dialog.close();
										}
									},
									{
										label: "Yes",
										action: (dialog) => {
											firebase.auth().signOut().then(() => {
												this.$router.push({name:"Login"});
											})
											dialog.close();
										}
									}
								]
							});
						}
		}
	}
</script>

<style scoped>

</style>