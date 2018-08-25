import Vue from 'vue';
import UploadImage from 'vue-upload-image';

new Vue({
    template: '<upload-image url=""></upload-image>',
    components: {
        UploadImage
    }
})

/*Vue.component('upload-image', {
    template: '<upload-image url=""></upload-image>',
    components: {
        UploadImage
    }
})*/