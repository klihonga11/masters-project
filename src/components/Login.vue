<template>
	<div id="login" align="center">
		<img src="../assets/logo.png" alt="company logo"><br>
		
		<div id="form-div" class="row">
			<!-- <div class=""> -->
				<form v-on:submit.prevent="login()">	
					<div class="form-group">
						<input class="form-control"  type="text" placeholder="Email Address" v-model="emailAddress" reqired/> 
					</div>
					
					<div class="form-group">
						<input class="form-control" type="password" placeholder="Password" v-model="password" required/> 
					</div>
					
					<!-- <input class="form-control" type="submit" value="Login"> -->
					<button type="submit" class="btn btn-default">Login</button>
				</form>
			<!-- </div> -->
		</div>

		<p style = "text-align:center;">If you don't have an account, you can create one <router-link to="/register">here</router-link></p>

		<!--<div class="row justify-content-center">
			<div class="col">
				<img src="../assets/logo.png" alt="company logo"><br>
				
				<form v-on:submit.prevent="login()">	
					<div class="form-group row justify-content-center">
						<input class="form-control col-sm-3"  type="text" placeholder="Email Address" v-model="emailAddress" reqired/> 
					</div>
					
					<div class="form-group row justify-content-center">
						<input class="form-control col-sm-3" type="password" placeholder="Password" v-model="password" required/> 
					</div>
					<input class="form-control" type="submit" value="Login">
					<button type="submit" class="btn btn-default">Login</button>
				</form>
				
				<p style = "text-align:center;">If you don't have an account, you can create one <router-link to="/register">here</router-link></p>
			</div>
		</div>-->

		<!--<div class="social-media-button">
			<a class = "btn btn-social btn-google">
			 <span class = "fa fa-google"></span>
			 Sign in with Google
			</a>
		</div>
		
		<div class="social-media-button">
			<a class = "btn btn-social btn-twitter">
			 <span class = "fa fa-twitter"></span>
			 Sign in with Twitter
			</a>
		</div>
		
		<div class="social-media-button">
			<a class = "btn btn-social btn-facebook">
			 <span class = "fa fa-facebook"></span>
			 Sign in with Facebook
			</a>
		</div> -->
	</div>
</template>

<script>
	import firebase from "../config";
	
	export default {
		name : 'Login',
		data () {
			return {
				emailAddress : "",
				password : ""
			}
		},
		methods : {
			login : function() {
				//checks to make sure new user has been fully initialized
				firebase.auth().onAuthStateChanged((user) => {
					if (user) {
						// User is signed in.
						this.$router.push({path:"/home"});
					}
				});

				firebase.auth().signInWithEmailAndPassword(this.emailAddress, this.password).then(
					(user) => {
						//username and password details match
					},
					(err) => {
						//alert("Something went wrong - " + err.message);
						BootstrapDialog.show({
							title: "Error",
							message: err.message,
							type: BootstrapDialog.TYPE_DANGER,
							buttons: [
								{
									label: "Okay",
									action: function(dialog) {
										dialog.close();
									}
								}
							]
						});
					}
				);
			}
		}
	}
</script>

<style scoped>
	#login {
		margin-top:50px;
	}
	#form-div{	
    	display: inline-block;
	}
</style>