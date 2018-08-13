<template>
	<div id="container">
        <nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item"><router-link to="/cookbooks">Cookbooks</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'RecipeCategories', params:{cookbookId:this.$route.params.cookbookId}}">Recipe Categories</router-link></li>
                <li class="breadcrumb-item"><router-link v-bind:to="{name:'Recipes', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId}}">Recipes</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">Recipe Directions</li>
			</ol>
		</nav>

        <!-- <div class="mb-2 border-bottom"> -->
		<div class="page-header">
			<div class="row">
				<div class="col-sm-10">
					<h1>Recipe Directions</h1>
				</div>
				<div class="col-sm-2" style="text-align:right;">
					<button type="button" class="btn btn-success" v-on:click="addNew()">Add New</button>
				</div>
			</div>
		</div>
		<br>

		<ul class="list-group" v-for="recipeDirection in recipeDirections" v-bind:key="recipeDirection['.key']">
			<div class="list-group-item">
				<div class="row">
					<div class="col-xs-10">
						<h4 class="list-group-item-text">{{recipeDirection.order}}. {{recipeDirection.description}}</h4>
					</div>
					<div class="col-xs-1" > 
						<span id="overflow" class="glyphicon glyphicon-pencil" v-on:click.stop.prevent="edit(recipeDirection)"></span>	
					</div>
					<div class="col-xs-1" > 
						<span id="overflow" class="glyphicon glyphicon-trash" v-on:click.stop.prevent="deleteItem(recipeDirection)"></span>	
					</div>
				</div>
			</div>

            <!--<div class="card">
				<div class="card-body">
					<h4 class="card-title">{{recipeDirection.order}}</h4>
					<p class="card-text">{{recipeDirection.description}}</p>
					<a href="#" class="btn btn-primary" v-on:click.prevent="edit(recipeDirection)">Edit</a>
					<a href="#" class="btn btn-danger" v-on:click.prevent="deleteItem(recipeDirection)">Delete</a>
				</div>
			</div> -->
		</ul>
	</div>
</template>

<script>
    import firebase from "../config";

    let db = firebase.database();

	export default {
		name : 'RecipeDirections',
		data () {
			return {
				
			}
		},
		methods : {
			addNew : function() {
                this.$router.push({name:'ManageRecipeDirection', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId, recipeId:this.$route.params.recipeId}})
            },
            edit: function(recipeDirection) {
                this.$router.push({name:'ManageRecipeDirection', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId, recipeId:this.$route.params.recipeId, recipeDirectionId:recipeDirection[".key"], item:recipeDirection}})
            },
			deleteItem: function(recipeDirection) {
				/*if(confirm("Are you sure you want to delete this direction?")) {
					db.ref("/recipeDirections/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId + "/" + recipeDirection[".key"]);
				}*/

				BootstrapDialog.show({
					title: "Delete Recipe Direction",
					message: "Are you sure you want to delete this direction?",
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
								db.ref("/recipeDirections/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId + "/" + recipeDirection[".key"]).remove();
								dialog.close();
							}
						}
					]
				});
			}
        },
        created() {
			this.$bindAsArray('recipeDirections', db.ref("/recipeDirections/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId))
		}
	}
</script>

<style scoped>
    .row {
		display: flex;
		align-items: center;
	} 
</style>