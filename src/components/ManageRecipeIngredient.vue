<template>
	<div id="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item"><router-link to="/cookbooks">Cookbooks</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'RecipeCategories', params:{cookbookId:this.$route.params.cookbookId}}">Recipe Categories</router-link></li>
                <li class="breadcrumb-item"><router-link v-bind:to="{name:'Recipes', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId}}">Recipes</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'RecipeIngredients', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId, recipeId:this.$route.params.recipeId}}">Recipe Ingredients</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">{{pageTitle}}</li>
			</ol>
		</nav>

		<!--<div class="mb-2 border-bottom"> -->
		<div class="page-header">
			<h1>{{pageTitle}}</h1>
		</div>
		<br>

		<form v-on:submit.prevent="saveAndExit()">
			<div class="form-group">
				<label for="inputName" class="control-label">*Name</label>
				<input id="inputName" type="text" class="form-control" v-model="item.name" name="name" autocomplete="off" required>
			</div>

			<!--<div class="form-group">
				<label for="inputQuantity" class="control-label">*Quantity</label>
				<input id="inputQuantity" type="number" class="form-control" value="1" style="width:50px;" v-model="item.quantity" required>
			</div>-->

			<div class="form-group">
				<label for="textareaDescription">*Description</label>
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
		name : 'ManageRecipeIngredient',
		data () {
			return {
				
			}
		},
		methods : {
			saveAndExit : function() {
				let itemKey = this.item[".key"];
				if(itemKey == undefined) {
					itemKey = db.ref("/recipeIngredients/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId + "/").push().key;
				}
			
				db.ref("/recipeIngredients/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId + "/" + itemKey).update({
					name: this.item.name,
					description: this.item.description,
					//quantity: this.item.quantity,
					//alternative: this.item.alternative
				});

				this.$router.go(-1);
			}
		},
		props : {
			item : {
				type : Object,
				default : () => ({
					name: "",
					description: "",
					//quantity: 1,
					//alternative: ""
				})
			}
		},
		computed : {
			pageTitle : function() {
				if(this.$route.params.recipeIngredientId == undefined) {
					return "Add Recipe Ingredient";
				} else {
					return "Edit Recipe Ingredient";
				}
			}
		}
	}
</script>

<style scoped>
	form {
		width: 50%;
	}

	[type=text] {
		width:50%;
	}

	textarea {
		resize: none;
	}

	form > div {
		margin-bottom: 2em;
	}
</style>