<template>
	<div id="app">
		<!--<Button v-on:click="load">Load</button>-->
		<!--<img id="bowtie" src="../assets/sample.png" width="900" height="780"/>-->
		<!--<canvas id="myCanvas" width="900" height="780">Canvas not supported on your browser</canvas>-->
		
		<!-- bootstrap 4 -->
		<!-- <div class="mb-2 border-bottom">
			<h1>Welcome</h1>
		</div> -->

		<div class="page-header">
			<h1>Welcome</h1>
		</div>
		<p>Thank you for using our web portal</p>

		<!--<form v-on:submit.prevent="upload()">
			<input id="imageTest" type="file" name="imageTest" accept="image/*"/>
			<label class="btn btn-default">
				Browse <input id="imageTest" type="file" accept="image/*" hidden>
			</label>
			<input type="submit" value="Submit"/>
		</form>-->
	</div>
</template>

<script>
	export default {
		name : 'Welcome',
		data () {
			return {}
		},
		methods: {
			load : function() {		
				var img = new Image();
				//img.src = "../assets/sample.png";
				img.src = "http://www.pngpix.com/wp-content/uploads/2016/07/PNGPIX-COM-Bow-Tie-PNG-Transparent-Image-2-500x334.png";
			
				var c = document.getElementById("myCanvas");
				var ctx = c.getContext("2d");
				//var img = document.getElementById("bowtie");
				ctx.drawImage(img, 10, 10);
			},
			upload: function() {
				
			}
		}
	}
	
	window.onload = function() {
		/*var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		var img = document.getElementById("bowtie");
		ctx.drawImage(img, 10, 10);*/
	}
</script>

<style scoped>
	#app {
		text-align:left;
	}
	[hidden] {
  		display: none !important;
	}
</style>