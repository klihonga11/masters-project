<template>
	<div id="register">
		<div class="row justify-content-center">
			<div class="col">
				<img src="../assets/logo.png" alt="company logo"><br>

				<form v-on:submit.prevent="validate()">
					<label for="inputEmailAddress">*Email Address:</label>
					<div class="form-group row justify-content-center">
						<input id="inputEmailAddress" class="form-control col-sm-3" type="text" v-model="emailAddress" required><br>
					</div>
					
					<label for="inputPassword">*Password:</label>
					<div class="form-group row justify-content-center">
						<input id="inputPassword" class="form-control col-sm-3" type="password" v-model="password" required><br>
					</div>

					<label for="inputRepeatPassword">*Repeat Password:</label>
					<div class="form-group row justify-content-center">
						<input id="inputRepeatPassword" class="form-control col-sm-3" type="password" v-model="repeatedPassword" required><br>
					</div>

					<button type="submit" class="btn btn-default">Register</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import firebase from "../config";
	
	export default {
		name : 'Register',
		data () {
			return {
				emailAddress : "",
				password : "",
				repeatedPassword: ""
			}
		},
		methods : {
			validate: function() {
				if(this.password != this.repeatedPassword) {
					//alert("Passwords don't match, please try again.");

					BootstrapDialog.show({
						title: "Register",
						message: "Passwords don't match, please try again.",
						type: BootstrapDialog.TYPE_WARNING,
						buttons: [
							{
								label: "Okay",
								action: (dialog) => {
									dialog.close();
								}
							}
						]
					});
					
					this.password = "";
					this.repeatedPassword = "";
				} else {
					this.signUp();
				}
			},
			signUp : function () {
				firebase.auth().createUserWithEmailAndPassword(this.emailAddress, this.password).then(
					(user) => {
						alert("Account successfully created.");
						this.$router.go(-1);
						/*BootstrapDialog.show({
								title: "Account",
								message: "Account successfully created.",
								type: BootstrapDialog.TYPE_SUCCESS,
								buttons: [
									{
										label: "Okay",
										action: (dialog) => {
											dialog.close();
											this.$router.go(-1);
										}
									}
								]
							});*/
					},
					(err) => {
						alert("Something went wrong - " + err.message);
					}
				);
			}
		}
	}
</script>

<style scoped>
	/*#register {
		margin-top: 50px;
	}*/
</style>