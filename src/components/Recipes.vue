<template>
	<div id="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item"><router-link to="/cookbooks">Cookbooks</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'RecipeCategories', params:{cookbookId:this.$route.params.cookbookId}}">Recipe Categories</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">Recipes</li>
			</ol>
		</nav>

		<!-- <div class="mb-2 border-bottom"> -->
		<div class="page-header">
			<div class="row">
				<div class="col-sm-10">
					<h1>Recipes</h1>
				</div>
				<div class="col-sm-2" style="text-align:right;">
					<button type="button" class="btn btn-success" v-on:click="addNew()">Add New</button>
				</div>
			</div>
		</div>
		<br>

		<!--<ul class="breadcrumb">
			<li><router-link to="/home">Home</router-link></li>
			<li><router-link to="/cookbooks">Cookbooks</router-link></li>
			<li><router-link v-bind:to="{name:'RecipeGroups', params:{cookbookId:this.$route.params.cookbookId}}">Recipe Groups</router-link></li>
			<li class="active">Recipes</li>
		</ul>

		<div class="page-header">
			<div id="row-header" class="row">
				<div class="col-sm-10">
					<h1>Recipes</h1>
				</div>
				<div class="col-sm-2" style="text-align:right">
					<button type="button" class="btn btn-success" v-on:click="addNew()"><span class="glyphicon glyphicon-plus"></span> Add New</button>
				</div>
			</div>
		</div>
		<br>-->

		<div class="list-group" v-for="recipe in recipes" v-bind:key="recipe['.key']">
			<div class="list-group-item">
				<div class="row">
					<div class="col-xs-10">
						<h4 class="list-group-item-heading">{{recipe.name}}</h4>
						<p class="list-group-item-text">{{recipe.description}}</p>
					</div>
					<div class="col-xs-1" > 
						<span id="overflow" class="glyphicon glyphicon-pencil" v-on:click="edit(recipe)"></span>	
					</div>
					<div class="col-xs-1" > 
						<span id="overflow" class="glyphicon glyphicon-trash" v-on:click="deleteItem(recipe)"></span>	
					</div>
				</div>
				<br>
				<div>
					<a href="#" class="btn btn-info" v-on:click.prevent="open(recipe, 'ingredients')">Ingredients</a>
					<a href="#" class="btn btn-info" v-on:click.prevent="open(recipe, 'directions')">Directions</a>
				</div>
			</div>
			<!-- <div class="card">
				<div class="card-body">
					<h4 class="card-title">{{recipe.name}}</h4>
					<p class="card-text">{{recipe.description}}</p>
					<a href="#" class="btn btn-primary" v-on:click.prevent="edit(recipe)">Edit</a>
					<a href="#" class="btn btn-danger" v-on:click.prevent="deleteItem(recipe)">Delete</a>
					
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import firebase from "../config";
	
	let db = firebase.database();
	
	export default {
		name : 'Recipes',
		data () {
			return {}
		},
		methods : {
			addNew : function() {
				this.$router.push({name:"AddRecipe", params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId}});
			},
			edit : function(recipe) {
				this.$router.push({name:"EditRecipe", params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId, recipeId:recipe[".key"], item:recipe}});
			},
			open : function (recipe, path) {
				if(path == "ingredients") {
					this.$router.push({name:"RecipeIngredients", params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId, recipeId:recipe[".key"], item:recipe}});
				} else if(path == "directions") {
					this.$router.push({name:"RecipeDirections", params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId, recipeId:recipe[".key"], item:recipe}});
				}
			},
			deleteItem : function(recipe) {
				/*if(confirm("Are you sure you want to delete '" + recipe.name + "'?")) {
					db.ref("/recipes/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + recipe[".key"]);
				}*/

				BootstrapDialog.show({
					title: "Delete Recipe",
					message: "Are you sure you want to delete '" + recipe.name + "'?",
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
							action: (dialog) => {
								//delete recipe node
								db.ref("/recipes/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + recipe[".key"]).remove();

								//delete images
								db.ref("/recipeImages/" + recipe[".key"]).remove();

								//delete ingredients node
								db.ref("/recipeIngredients/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + recipe[".key"]).remove();

								//delete directions node
								db.ref("/recipeDirections/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + recipe[".key"]).remove();

								//delete searchable ingredients node
								db.ref("/recipeToRecipeIngredients/" + recipe[".key"]).remove();
								dialog.close();
							}
						}
					]
				});
			}
		},
		created() {
			this.$bindAsArray('recipes', db.ref("/recipes/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId))
		},
		props : ["cookbookId", "recipeCategoryId"]
	}
</script>

<style scoped>
	.row {
		display: flex;
		align-items: center;
	}
</style>