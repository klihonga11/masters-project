<template>
    <div>
        <input type="text" v-model="newName">
        <button @click.prevent="changeName()">Change Name</button>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                newName: ''
            }
        },
        
        methods: {
            changeName()
            {
                this.$eventBus.$emit('change-name', this.newName);
				console.log(this.newName);
            }
        }
    }
</script>
<style scoped>

</style>