<template>
	<div id="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item"><router-link to="/cookbooks">Cookbooks</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'RecipeCategories', params:{cookbookId:this.$route.params.cookbookId}}">Recipe Categories</router-link></li>
                <li class="breadcrumb-item"><router-link v-bind:to="{name:'Recipes', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId}}">Recipes</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'RecipeDirections', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId, recipeId:this.$route.params.recipeId}}">Recipe Directions</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">{{pageTitle}}</li>
			</ol>
		</nav>

		<!-- <div class="mb-2 border-bottom"> -->
		<div class="page-header">
			<h1>{{pageTitle}}</h1>
		</div>
		<br>

		<form v-on:submit.prevent="getOrderNumber()">
			<!--<div class="form-group">
				<label for="inputOrder" class="control-label">*Order</label>
				<input id="inputOrder" type="number" class="form-control" value="1" style="width:50px;" v-model="item.order" readonly required>
			</div>-->

			<div class="form-group">
				<label for="textareaDescription">*Description</label>
				<textarea id="textareaDescription" class="form-control" rows="5" v-model="item.description"></textarea>
			</div>

			<label>Duration</label>
			<div class="form-group row">
				<div class="col-sm-2">
					<label for="inputDurationHours" class="control-label">Hours</label>
					<input id="inputDurationHours" type="number" class="form-control" min="0" value="0"  v-model="item.durationHours">
				</div>
				<div class="col-sm-2">
					<label for="inputDurationMinutes" class="control-label">Minutes</label>
					<input id="inputDurationMinutes" type="number" class="form-control" min="0" value="0" v-model="item.durationMinutes">
				</div>
				<div class="col-sm-2">
					<label for="inputDurationSeconds" class="control-label">Seconds</label>
					<input id="inputDurationSeconds" type="number" class="form-control" min="0" value="0" v-model="item.durationSeconds">
				</div>
			</div>

			<!--<div class="form-group">
				<label class="btn btn-default">
					Browse Video <input id="browseVideo" type="file" accept="video/*" v-on:change="updateFilePath($event)" single hidden>
				</label>
			</div>

			<div class="form-group">
				<label class="btn btn-default">
					Browse Audio <input id="browseAudio" type="file" accept="audio/*" v-on:change="updateFilePath($event)" single hidden>
				</label>
			</div> -->

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
		name : 'ManageRecipeDirection',
		data () {
			return {
				
			}
		},
		methods : {
			saveAndExit: function(orderNumber) {
				let itemKey = this.item[".key"];
				if(itemKey == undefined) {
					itemKey = db.ref("/recipeDirections/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId + "/").push().key;
				}

				db.ref("/recipeDirections/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId + "/" + itemKey).update({
					order: Number(orderNumber),
					description: this.item.description,
					durationHours: Number(this.item.durationHours),
					durationMinutes: Number(this.item.durationMinutes),
					durationSeconds: Number(this.item.durationSeconds),
					videoUrl: this.item.videoUrl,
					audioUrl: this.item.audioUrl
				});

				this.$router.go(-1);
			},
			updateFilePath: function() {

			},
			getOrderNumber : function() {
				db.ref("/recipeDirections/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + this.$route.params.recipeId + "/")
					.once('value')
					.then((snapshot) => { 
						this.saveAndExit(snapshot.numChildren() + 1);
					});
			}
		}, 
		props : {
			item : {
				type : Object,
				default : () => ({
					order: 0,
					description: "",
					durationHours: 0,
					durationMinutes: 0,
					durationSeconds: 0,
					videoUrl: "",
					audioUrl: ""
				})
			}
		},
		computed : {
			pageTitle : function() {
				if(this.$route.params.recipeDirectionId == undefined) {
					return "Add Recipe Direction";
				} else {
					return "Edit Recipe Direction";
				}
			}
		}
	}
</script>

<style scoped>
	/*[hidden] {
		display: none !important;
	}*/
	form {
		width: 50%;
	}

	textarea {
		resize: none;
	}

	form > div {
		margin-bottom: 2em;
	}
</style>