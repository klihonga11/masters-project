<template>
	<div id="container">
		<!--<button class="btn btn-success" v-on:click="saveAndExit()">Save and Exit</button>-->
		<!-- <button class="btn btn-danger" v-on:click="deleteItem()">Delete</button> -->
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item"><router-link to="/cookbooks">Cookbooks</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">{{pageTitle}}</li>
			</ol>
		</nav>
		
		<!--<div class="mb-2 border-bottom"> -->
		<div class="page-header">
			<h1>{{pageTitle}}</h1>
		</div>
		<br>

		<!--<div class="row">
			<div class="col-sm-6"> -->
				<form v-on:submit.prevent="saveAndExit()"> <!--class="form-horizontal"-->
					<div class="form-group">
						<label for="inputTitle" class="control-label">*Title: </label>
						<input id="inputTitle" class="form-control" type="text" v-model="item.title" name="title" autocomplete="off" required/> <!-- v-model="item.title" -->
					</div>

					<div class="form-group">
						<label for="textareaDescription" class="control-label">Description: </label>
						<textarea id="textareaDescription" class="form-control" v-model="item.description" rows="5"></textarea>
					</div>

					<!--<label>Profile Picture: </label>
					<div class="form-group">
						<label class="btn btn-primary" for="browseImage">
							<input id="browseImage" type="file" style="display:none" @change="updateFilePath($event)" accept="image/*" single>
							Browse
						</label>
						<span class="label label-info" id="upload-file-info">{{item.imageName}}</span>
					</div>-->

					<upload-image url="" name="" max_files="1"></upload-image>
					
					<div class="form-group">
						<button type="submit" class="btn btn-success">Save</button>
					</div>
				</form>
			</div>	
			<!--<div class="col-sm-6" align="center"> -->
				<!-- <img v-bind:src="item.imageUrl"/> -->
				<!--<vue-img-preview></vue-img-preview> -->
			<!--</div> -->
		<!--</div> -->

		<!-- <form v-on:submit.prevent="saveAndExit()"> 
				<div class="form-group">
					<label for="inputTitle" class="control-label">*Title: </label>
					<input id="inputTitle" class="form-control" type="text" v-model="item.title" name="title" autocomplete="off" required/> 
				</div>

				<div class="form-group">
					<label for="textareaDescription" class="control-label">Description: </label>
					<textarea id="textareaDescription" class="form-control" v-model="item.description" rows="5"></textarea>
				</div>

				<label>Profile Picture: </label>
				<div class="form-group">
					<label class="btn btn-primary" for="browseImage">
						<input id="browseImage" type="file" style="display:none" @change="updateFilePath($event)" accept="image/*" single>
						Browse
					</label>
					<span class="label label-info" id="upload-file-info">{{item.imageName}}</span>
				</div>
				
				<div class="form-group">
					<button type="submit" class="btn btn-success">Save</button>
				</div>
			</form> -->
	<!--</div>-->
</template>

<script>
	import firebase from "../config";
	import UploadImage from 'vue-upload-image';
	//import ButtonCounter from './ButtonCounter';
	
	//import Vue from 'vue'
	//import {vueImgPreview} from 'vue-img-preview'

	//Vue.component('vue-img-preview', vueImgPreview)

	let db = firebase.database();
	let auth = firebase.auth();

	//check if image needs to be uploaded
	let needToUploadFile = false;

	export default {
		name : "ManageCookbook",
		data () {
			return {}
		},
		components: {
			UploadImage,
			
		},
		props : {	
			item : {
				type : Object,
				default : () => ({
					title : "",
					description : "",
					imageName: "",
					imageUrl : "",
					publicationDate : "",
					isPublished: false
				})
			}
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
					itemKey = db.ref("/cookbooks/" + auth.currentUser.uid + "/").push().key;
				}
			
				db.ref("/cookbooks/" + auth.currentUser.uid + "/" + itemKey).update({
					title : this.item.title,
					description : this.item.description,
					imageName: this.item.imageName,
					imageUrl : this.item.imageUrl,
					publicationDate : this.item.publicationDate,
					isPublished : this.item.isPublished
				});
			}, 
			deleteItem : function() {
				/*if(confirm("Are you sure you want to DELETE '" + this.item.title + "'?")) {
					db.ref("cookbooks/" + auth.currentUser.uid + "/" + this.item[".key"]).remove();
					this.$router.go(-1);
				}*/

				BootstrapDialog.show({
					title: "Delete Cookbook",
					message: "Are you sure you want to delete '" + cookbook.title + "'?",
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
								db.ref("cookbooks/" + firebase.auth().currentUser.uid + "/" + cookbook[".key"]).remove();
								dialog.close();
								this.$router.go(-1);
							}
						}
					]
				});
			},
			uploadImage: function () {
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
						let currentName = this.item.imageName;
						//let currentName = this.item.imageUrl.substring(this.item.imageUrl.lastIndexOf('/'));

						if(selectedName != "" && selectedName != currentName) {
							this.needToUploadFile = true;
							this.item.imageName = selectedName;
						}

						//console.log("Selected name: " + selectedName);
						//console.log("Current name: " + currentName);
						//console.log("Need to upload? : " + this.needToUploadFile);
					}
				}
			},
			computed : {
				pageTitle : function() {
					if(this.$route.params.cookbookId == undefined) {
						return "Add Cookbook";
					} else {
						return "Edit Cookbook";
					}
				}
			}
		};
</script>

<style scoped>
	/*[hidden] {
		display: none !important;
	}*/
	form {
		display:inline-block;
		width: 50%;
	}

	[type=text] {
		width: 50%;
	}

	textarea {
		resize:none;
	}
	
	form > div {
		margin-bottom: 2em;
	}
</style>