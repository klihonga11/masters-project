<template>
	<div id="container">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item"><router-link to="/cookbooks">Cookbooks</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'RecipeCategories', params:{cookbookId:this.$route.params.cookbookId}}">Recipe Categories</router-link></li>
				<li class="breadcrumb-item"><router-link v-bind:to="{name:'Recipes', params:{cookbookId:this.$route.params.cookbookId, recipeCategoryId:this.$route.params.recipeCategoryId}}">Recipes</router-link></li>
				<li class="breadcrumb-item active">{{pageTitle}}</li>
			</ol>
		</nav>

		<!-- <div class="mb-2 border-bottom"> -->
		<div class="page-header">
			<h1>{{pageTitle}}</h1>
		</div>
		<br>

		<form v-on:submit.prevent="saveAndExit()"> <!--class="form-horizontal"-->
			<div class="form-group">
				<label for="inputName" class="control-label">*Name</label>
				<input id="inputName" type="text" class="form-control" v-model="item.name" autocomplete="off" required>
			</div>

			<div class="form-group">
				<label for="textareaDescription" class="control-label">*Description</label>
				<!-- <input id="inputDescription" type="text" class="form-control" required> -->
				<textarea id="textareaDescription" rows="5" class="form-control" v-model="item.description" required></textarea>
			</div>

			<label>Difficulty</label>
			<div id="radioGroup">
				<div class="radio">
					<label><input type="radio" name="difficulty" value="beginner" v-model="item.difficulty" checked>Beginner</label>
				</div>
				<div class="radio">
					<label><input type="radio" name="difficulty" value="intermediate" v-model="item.difficulty">Intermediate</label>
				</div>
				<div class="radio">
					<label><input type="radio" name="difficulty" value="expert" v-model="item.difficulty">Expert</label>
				</div>
			</div>

			<div class="form-group">
				<label for="inputNumberOfServings">Number of servings</label>
				<input id="inputNumberOfServings" class="form-control" name="numberOfServings" type="number" min="1" value="1" v-model="item.numberOfServings">
			</div>

			<label>Cooking Time</label>
			<div class="form-group row">
				<div class="col-sm-2">
					<label for="inputCookingTimeHours">Hours</label>
					<input id="inputCookingTimeHours" class="form-control" type="number" min="0" value="0" v-model="item.cookingTimeHours">
				</div>
				<div class="col-sm-2">
					<label for="inputCookingTimeMinutes">Mintues</label>
					<input id="inputCookingTimeMinutes" class="form-control" type="number" min="0" max="59" value="0" v-model="item.cookingTimeMinutes">
				</div>
			</div>

			<label>Profile Picture</label>
			<div class="form-group">
				<label class="btn btn-primary" for="browseImage">
					<input id="browseImage" type="file" style="display:none" @change="updateFilePath($event)" accept="image/*" single>
					Browse
				</label>
				<!--<span class="label label-info" id="upload-file-info">{{item.imageName}}</span>-->
			</div>

			<!--<div class="form-group">
				<label class="btn btn-default">
					Browse Images <input id="browseImage" type="file" accept="image/*" v-on:change="updateFilePath($event)" single hidden>
				</label>
			</div>-->

			<div class="form-group">
				<button type="submit" class="btn btn-success">Save</button>
			</div>
		</form>
	</div>
</template>

<script>
	import firebase from "../config";

	let db = firebase.database();

	//check if image needs to be uploaded
	let needToUploadFile = false;

	export default {
		name : 'ManageRecipe',
		data () {
			return { }
		},
		methods : {
			saveAndExit : function() {
				if(this.needToUploadFile) {
					this.uploadImage();
					return;
				}
				this.saveItem();
				this.$router.go(-1);
			},
			saveItem : function() {
				let itemKey = this.item[".key"];
				if(itemKey == undefined) {
					itemKey = db.ref("/recipes/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/").push().key;
				}
			
				db.ref("/recipes/" + firebase.auth().currentUser.uid + "/" + this.$route.params.cookbookId + "/" + this.$route.params.recipeCategoryId + "/" + itemKey).update({
					name : this.item.name,
					description : this.item.description,
					imageUrl : this.item.imageUrl,
					numberOfServings : Number(this.item.numberOfServings),
					difficulty : this.item.difficulty,
					cookingTimeHours: Number(this.item.cookingTimeHours),
					cookingTimeMinutes: Number(this.item.cookingTimeMinutes)
				});

				//save profile picture to recipeImages
				db.ref("/recipeImages/" + itemKey + "/profilePicture/").update({
					imageUrl : this.item.imageUrl
				});

				//save other images
				

				//create searchable ingredients node
				db.ref("/recipeToRecipeIngredients/" + itemKey + "/").update({
					authorId: firebase.auth().currentUser.uid,
					cookbookId: this.$route.params.cookbookId,
					recipeCategoryId: this.$route.params.recipeCategoryId
				});
			},
			uploadImage : function() {
				const ref = firebase.storage().ref();

				const file = document.querySelector("#browseImage").files[0];
				const name = file.name;
				const metadata = { contentType: file.type };

				const uploadTask = ref.child("images/" + name).put(file, metadata);
				uploadTask.on('state_changed', // or firebase.storage.TaskEvent.STATE_CHANGED
					function(snapshot) {
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							/*case firebase.storage.TaskState.PAUSED: // or 'paused'
								console.log('Upload is paused');
								break;
							case firebase.storage.TaskState.RUNNING: // or 'running'
								console.log('Upload is running');
								break;*/
						}
					}, function(error) {
						console.log(error.code);
						// A full list of error codes is available at
						// https://firebase.google.com/docs/storage/web/handle-errors
						/*switch (error.code) {
							case 'storage/unauthorized':
							// User doesn't have permission to access the object
							break;

							case 'storage/canceled':
							// User canceled the upload
							break;
							case 'storage/unknown':
							// Unknown error occurred, inspect error.serverResponse
							break;
						}*/
					}, () => {
						// Upload completed successfully, now we can get the download URL
						uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
							console.log('File available at', downloadURL);
							this.item.imageUrl = downloadURL;

							//save to recipe images

							this.saveItem();
							this.$router.go(-1);

							/*if(exitAfterUpload) {
								
							} else {
								this.$router.push({name:"RecipeGroups", params:{cookbookId:this.item[".key"]}});
							}*/
						});
					});
			},
			updateFilePath : function(event) {
				if(event.target.files[0] != undefined) { //dialog was cancelled
					let selectedName = event.target.files[0].name;
					let currentName = this.item.imageUrl.substring(this.item.imageUrl.lastIndexOf('/'));

					if(selectedName != "" && selectedName != currentName) {
						this.needToUploadFile = true;
					}
				}
			}
		},
		props : {
			item : {
				type : Object,
				default : () => ({
					name : "",
					description : "",
					imageUrl : "",
					numberOfServings : 1,
					difficulty: "beginner",
					cookingTimeHours: 0,
					cookingTimeMinutes: 0
				})
			}
		},
		computed : {
			pageTitle : function() {
				if(this.$route.params.recipeId == undefined) {
					return "Add Recipe";
				} else {
					return "Edit Recipe";
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

	[type=text] {
		width:50%;
	}

	#inputNumberOfServings {
		width:12.5%;
	}

	textarea {
		resize: none;
	}

	form > div {
		margin-bottom: 2em;
	}
</style>