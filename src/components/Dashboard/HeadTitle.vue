<template>
    <v-card
        height="50px"
        width="200px"
        class="mt-4 ml-4 text-center"
        elevation="4"
    >
        <h1>{{ headTitle }}</h1>
    </v-card>
</template>

<script>
import { ref } from 'vue';


export default {
    name: "HeadTitle",
    props: {
        title: String,
    },
    setup(props){
        const headTitle = ref(props.title);
        return{
            headTitle
        }
    }
}
</script>


<style lang="scss" scoped>
    h1{
        font-size: 26px;
        text-decoration: underline;
    }
</style>