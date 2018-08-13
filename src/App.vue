<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #container {
		text-align:left;
	}
  #row-header {
		display:flex;
		align-items:center;
	}
  
	.breadcrumb {
		margin:0px;
		background-color: transparent;
		padding-left:0px; 
	}
	.page-header {
		margin:0px;
	}
</style>
