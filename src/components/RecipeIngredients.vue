<template>
	<div id="container">
        <nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item"><router-link to="/cookbooks">Cookbooks</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'RecipeCategories', params:{cookbookId:this.$route.params.cookbookId}}">Recipe Categories</router-link></li>
                <li class="breadcrumb-item"><router-link v-bind:to="{name:'Recipes', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId}}">Recipes</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">Recipe Ingredients</li>
			</ol>
		</nav>

        <!-- <div class="mb-2 border-bottom"> -->
		<div class="page-header">
			<div class="row">
				<div class="col-sm-10">
					<h1>Recipe Ingredients</h1>
				</div>
				<div class="col-sm-2" style="text-align:right;">
					<button type="button" class="btn btn-success" v-on:click="addNew()">Add New</button>
				</div>
			</div>
		</div>
		<br>

		<ul	class="list-group" v-for="recipeIngredient in recipeIngredients" v-bind:key="recipeIngredient['.key']">
			<div class="list-group-item">
				<div class="row">
					<div class="col-xs-10">
						<h4 class="list-group-item-text">{{recipeIngredient.description}}</h4>
					</div>
					<div class="col-xs-1" > 
						<span id="overflow" class="glyphicon glyphicon-pencil" v-on:click.stop.prevent="edit(recipeIngredient)"></span>	
					</div>
					<div class="col-xs-1" > 
						<span id="overflow" class="glyphicon glyphicon-trash" v-on:click.stop.prevent="deleteItem(recipeIngredient)"></span>	
					</div>
				</div>
			</div>
            <!--<div class="card">
				<div class="card-body">
					<p class="card-text">{{recipeIngredient.name}}</p>
					<a href="#" class="btn btn-primary" v-on:click.prevent="edit(recipeIngredient)">Edit</a>
					<a href="#" class="btn btn-danger" v-on:click.prevent="deleteItem(recipeIngredient)">Delete</a>
				</div>
			</div> -->
		</ul>
	</div>
</template>

<script>
    import firebase from "../config";

    let db = firebase.database();

	export default {
		name : 'RecipeIngredients',
		data () {
			return {
				
			}
		},
		methods : {
			addNew : function() {
                this.$router.push({name:'ManageRecipeIngredient', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId, recipeId:this.$route.params.recipeId}})
            },
            edit: function(recipeIngredient) {
                this.$router.push({name:'ManageRecipeIngredient', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId, recipeId:this.$route.params.recipeId, recipeIngredientId:recipeIngredient[".key"], item:recipeIngredient}})
            },
			deleteItem: function(recipeIngredient) {
				/*if(confirm("Are you sure you want to delete this ingredient?")) {
					db.ref("/recipeIngredients/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId + "/" + recipeIngredient[".key"]);
				}*/

				BootstrapDialog.show({
					title: "Delete Recipe Ingredient",
					message: "Are you sure you want to delete '" + recipeIngredient.name + "'?",
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
								//delete recipe Ingredient node
								db.ref("/recipeIngredients/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId + "/" + recipeIngredient[".key"]).remove();

								//delete searchable recipe ingredient node
								db.ref("/recipeToRecipeIngredients/" + this.$route.params.recipeId + "/ingredients/" + recipeIngredient[".key"]).remove();
								dialog.close();
							}
						}
					]
				});
			}
        },
        created() {
            this.$bindAsArray('recipeIngredients', db.ref("/recipeIngredients/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId))
        }
	}
</script>

<style scoped>
    .row {
		display: flex;
		align-items: center;
	}
</style>