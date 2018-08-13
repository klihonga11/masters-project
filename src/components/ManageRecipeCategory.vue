<template>
	<div id="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item"><router-link to="/cookbooks">Cookbooks</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'RecipeCategories', params:{cookbookId:this.$route.params.cookbookId}}">Recipe Categories</router-link></li>
				<li class="breadcrumb-item active">{{pageTitle}}</li>
			</ol>
		</nav>

		<!-- <div class="mb-2 border-bottom"> -->
		<div class="page-header">
			<h1>{{pageTitle}}</h1>
		</div>
		<br>

		<!-- <button v-on:click="deleteItem()">Save and Exit</button> -->
		<form v-on:submit.prevent="saveAndExit()">
			<div class="form-group">
				<label for="inputName" class="control-label">*Name</label>
				<input id="inputName" type="text" class="form-control" v-model="item.name" name="name" autocomplete="off" required>
			</div>
			
			<div class="form-group">
				<label for="textareaDescription" class="control-label">Description</label>
				<textarea id="textareaDescription" class="form-control" rows="5" v-model="item.description"></textarea>
			</div>

			<div class="form-group">
				<button type="submit" class="btn btn-success">Save</button>
			</div>
		</form>
	</div>
</template>

<script>
	import firebase from "../config";
	
	let db = firebase.database();
	
	export default {
		name : "ManageRecipeGroup",
		data() {
			return {}
		},
		methods : {
			saveAndExit : function() {
				this.saveRecipeGroup();
				this.$router.go(-1);
			},
			saveRecipeGroup : function() {
				let itemKey = this.item[".key"];
				if(itemKey == undefined) {
					itemKey = db.ref("/recipeCategories/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/").push().key;
				}
			
				db.ref("/recipeCategories/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + itemKey).update({
					name : this.item.name,
					description : this.item.description,
				});
			},
			deleteitem : function() {
				/*if(confirm("Are you sure you want to DELETE '" + this.item.title + "'?")) {
					db.ref("/recipeCategories/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.item[".key"]);
					this.$router.go(-1);
				}*/

				BootstrapDialog.show({
					title: "Delete Recipe Category",
					message: "Are you sure you want to delete '" + this.item.name + "'?",
					type: BootstrapDialog.TYPE_DANGER,
					buttons: [
						{
							label: "No",
							action: function(dialog) {
								dialog.close();
							}
						},
						{
							label: "Yes",
							action: function(dialog) {
								db.ref("/recipeCategories/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.item[".key"]);
								dialog.close();
								this.$router.go(-1);
							}
						}
					]
				});
			}
		},
		props : {
			item : {
				type : Object,
				default : () => ({
					name : "",
					description : ""
				})
			}
		},
		computed : {
			pageTitle : function() {
				if(this.$route.params.recipeCategoryId == undefined) {
					return "Add Recipe Category";
				} else {
					return "Edit Recipe Category";
				}
			}
		}
	}
</script>

<style scoped>
	form {
		display:inline-block;
		width: 50%;
	}

	textarea {
		resize:none;
	}

	[type=text] {
		width: 50%;
	}

	form > div {
		margin-bottom: 2em;
	}
</style>