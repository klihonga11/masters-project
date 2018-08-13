<template>
	<div id="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item"><router-link to="/cookbooks">Cookbooks</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">Recipe Categories</li>
			</ol>
		</nav>

		<!-- <div class="mb-2 border-bottom"> -->
		<div class="page-header">
			<div class="row">
				<div class="col-sm-10">
					<h1>Recipe Categories</h1>
				</div>
				<div class="col-sm-2" style="text-align:right;">
					<button type="button" class="btn btn-success" v-on:click="addNew()">Add New</button>
				</div>
			</div>
		</div>
		<br>

		<div class="list-group" v-for="recipeCategory in recipeCategories" v-bind:key="recipeCategory['.key']">
			<a href="#" v-on:click.prevent="open(recipeCategory)" class="list-group-item">
				<div class="row">
					<div class="col-xs-10">
						<h4 class="list-group-item-heading">{{recipeCategory.name}}</h4>
						<p class="list-group-item-text">{{recipeCategory.description}}</p>
					</div>
					<div class="col-xs-1" > 
						<span id="overflow" class="glyphicon glyphicon-pencil" v-on:click.stop.prevent="edit(recipeCategory)"></span>	
					</div>
					<div class="col-xs-1" > 
						<span id="overflow" class="glyphicon glyphicon-trash" v-on:click.stop.prevent="deleteItem(recipeCategory)"></span>	
					</div>
				</div>
			</a>
			<!-- <div class="card">
				<div class="card-body">
					<h4 class="card-title">{{recipeCategory.name}}</h4>
					<p class="card-text">{{recipeCategory.description}}</p>
					<a href="#" class="btn btn-primary" v-on:click.prevent="edit(recipeCategory)">Edit</a>
					<a href="#" class="btn btn-danger" v-on:click.prevent="deleteItem(recipeCategory)">Delete</a>
					<a href="#" class="btn btn-info" v-on:click.prevent="open(recipeCategory)">Open</a>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import firebase from "../config";
	
	let db = firebase.database();

	export default {
		name : 'RecipeCategories',
		data () {
			return {}
		},
		methods : {
			addNew : function () {
				this.$router.push({name:"AddRecipeCategory", params:{cookbookId:this.$route.params.cookbookId}});
			},
			edit : function (recipeCategory) {
				this.$router.push({name:"EditRecipeCategory", params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:recipeCategory[".key"], item:recipeCategory}});
			},
			open : function (recipeCategory) {
				this.$router.push({name:'Recipes', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:recipeCategory[".key"]}});
			},
			deleteItem : function (recipeCategory) {
				/*if(confirm("Are you sure you want to delete '" + recipeCategory.name + "'?")) {
					db.ref("recipeCategories/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + recipeCategory[".key"]).remove();
				}*/
				BootstrapDialog.show({
					title: "Delete Recipe Category",
					message: "Are you sure you want to delete '" + recipeCategory.name + "'?",
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
								db.ref("recipeCategories/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + recipeCategory[".key"]).remove();
								dialog.close();
								//this.$router.go(-1);
							}
						}
					]
				});
			}
		},
		created() {
			//dynamic reference (with prop value) - https://stackoverflow.com/questions/44157125/how-to-create-dynamic-references-in-vuefire 
			this.$bindAsArray('recipeCategories', db.ref("/recipeCategories/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId))
		}
	}
</script>

<style scoped>
	.row {
		display: flex;
		align-items: center;
	}
</style>