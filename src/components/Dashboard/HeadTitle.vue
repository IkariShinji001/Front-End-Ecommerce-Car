<template>
    <v-card :height="props.height" :width="props.width" class="mt-4 ml-4 text-center" elevation="4">
        <h1>{{ headTitle }}</h1>
    </v-card>
</template>

<script>
import { ref } from 'vue';


export default {
    name: "HeadTitle",
    props: {
        title: String,
        height: {
            type: String,
            default: "50px"
        },
        width: {
            type: String,
            default: "200px"
        }
    },
    setup(props) {
        const headTitle = ref(props.title);
        return {
            headTitle, props
        }
    }
}
</script>


<style lang="scss" scoped>
h1 {
    font-size: 26px;
    text-decoration: underline;
}
</style>