<template>
	<div id="container">
		<ol class="breadcrumb">
			<li><router-link to="/home">Home</router-link></li>
			<li class="active" aria-current="page">Cookbooks</li>
		</ol>

		<div class="page-header">
			<div class="row">
				<div class="col-sm-10">
					<h1>Cookbooks</h1>
				</div>
				<div class="col-sm-2" align="right">
					<button type="button" class="btn btn-success" v-on:click="addNew()">Add New</button>
				</div>
			</div>
		</div>
		<br>

		<div class="list-group" v-for="cookbook in cookbooks" v-bind:key="cookbook['.key']">
			<!--<div class="row">
				<div class="col-xs-11">
					<a href="#" v-on:click.prevent="open(cookbook)" class="list-group-item">
						<h4 class="list-group-item-heading">{{cookbook.title}}</h4>
						<p class="list-group-item-text">{{cookbook.description}}</p>
					</a>
				</div>
				<div class="col-xs-1" align="right">
					<span class="glyphicon glyphicon-option-vertical" data-toggle="dropdown"></span>
					<ul class="dropdown-menu">
						<li><a href="#" v-on:click.prevent="edit(cookbook)">edit</a></li>
						<li><a href="#" v-on:click.prevent="deleteItem(cookbook)">delete</a></li>
					</ul>	
				</div>
			</div>-->
			<!--<a href="#" v-on:click.stop="open(cookbook)" class="list-group-item">
				<div class="row">
					<div class="col-xs-11">
						<h4 class="list-group-item-heading">{{cookbook.title}}</h4>
						<p class="list-group-item-text">{{cookbook.description}}</p>
					</div>
					<div class="col-xs-1" align="right"> 
						<span id="overflow" class="glyphicon glyphicon-option-vertical" data-toggle="dropdown" v-on:click.stop.prevent="printToConsole()"></span>
						<ul class="dropdown-menu">
							<li><a href="#" v-on:click.stop.prevent="edit(cookbook)">edit</a></li>
							<li><a href="#" v-on:click.stop.prevent="deleteItem(cookbook)">delete</a></li>
						</ul>	
					</div>
				</div>
			</a>-->
			<a href="#" v-on:click.prevent="open(cookbook)" class="list-group-item">
				<div class="row">
					<div class="col-xs-10">
						<h4 class="list-group-item-heading">{{cookbook.title}}</h4>
						<p class="list-group-item-text">{{cookbook.description}}</p>
					</div>
					<div class="col-xs-1" > 
						<span class="glyphicon glyphicon-pencil" v-on:click.stop.prevent="edit(cookbook)"></span>	
					</div>
					<div class="col-xs-1" > 
						<span class="glyphicon glyphicon-trash" v-on:click.stop.prevent="deleteItem(cookbook)"></span>	
					</div>
				</div>
			</a>
		</div>

		<!-- bootstrap 4 -->
		<!--<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
				<li class="breadcrumb-item active" aria-current="page">Cookbooks</li>
			</ol>
		</nav>-->

		<!-- <div class="mb-2 border-bottom">
			<div class="row">
				<div class="col-sm-10">
					<h1>Cookbooks</h1>
				</div>
				<div class="col-sm-2" style="text-align:right;">
					<button type="button" class="btn btn-success" v-on:click="addNew()">Add New</button>
				</div>
			</div>
		</div> -->
		
		<!-- <div class="list-group" v-for="cookbook in cookbooks" v-bind:key="cookbook['.key']">
			<a href="#" class="card" style="display:inline-block">
				<div class="card-body">
					<h4 class="card-title">{{cookbook.title}}</h4>
					<p class="card-text">{{cookbook.description}}</p>
					<a href="#" class="btn btn-primary" v-on:click.prevent="edit(cookbook)">Edit</a>
					<a href="#" class="btn btn-danger" v-on:click.prevent="deleteItem(cookbook)">Delete</a>
					<a href="#" class="btn btn-info" v-on:click.prevent="open(cookbook)">Open</a>
				</div>
			</a>
		</div> -->

		<!-- bootstrap 4 modal -->
		<!-- <div id="deleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Delete</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>

					<div class="modal-body">
						Are you sure you want to delete the selected cookbook?
					</div>

					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">No</button>
						<button type="button" class="btn btn-danger" data-dismiss="modal">Yes</button>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import firebase from "../config";

	let db = firebase.database();

	export default {
		name: "Cookbooks",
		data() {
			return {}
		},
		methods : {
			printToConsole: function() {
				console.log("span clicked");
				$('#overflow').dropdown('toggle');
				/*if ($('#overflow').find('.dropdown-menu').is(":hidden")){
					console.log("overflow shown");
					
				}*/
			},
			addNew : function() {
				this.$router.push({name:"AddCookbook"});
			},
			edit: function(cookbook) {
				this.$router.push({name:"EditCookbook", params:{cookbookId:cookbook[".key"], item:cookbook}});
			},
			open: function(cookbook) {
				this.$router.push({name:"RecipeCategories", params:{cookbookId:cookbook[".key"]}});
			},
			deleteItem : function(cookbook) {
				//db.ref("cookbooks/" + firebase.auth().currentUser.uid + "/" + cookbook[".key"]).remove();

				/*if(confirm("Are you sure you want to delete '" + cookbook.title + "'?")){
					db.ref("cookbooks/" + firebase.auth().currentUser.uid + "/" + cookbook[".key"]).remove();
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
							action: (dialog) => {
								db.ref("cookbooks/" + firebase.auth().currentUser.uid + "/" + cookbook[".key"]).remove();
								dialog.close();
							}
						}
					]
				});
			}
		},
		created() {
			//dynamic reference (with prop value) - https://stackoverflow.com/questions/44157125/how-to-create-dynamic-references-in-vuefire 
			this.$bindAsArray('cookbooks', db.ref("/cookbooks/" + firebase.auth().currentUser.uid))
		}
	}
</script>

<style scoped>
	.row {
		display: flex;
		align-items: center;
	}
	p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>