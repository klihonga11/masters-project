<template>
    <div>
        <h1>Hello World, I'm {{ name }}</h1>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                name: 'Foo'
            }
        },

        created() {
            this.$eventBus.$on('change-name', this.changeName);
			console.log('received name - ');
        },

        beforeDestroy(){
            this.$eventBus.$off('change-name');
        },

        methods: {

            changeName(name) 
            {
         // name will be automatically transported to the parameter.
                this.name = name;
				console.log('name received');
            }

        }
    }
</script>
<style scoped>

</style>