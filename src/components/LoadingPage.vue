<template>
    <div class="loading-container" v-if="props.isLoading">
        <v-progress-circular indeterminate color="blue" :width="8" class="loading" :size="70"></v-progress-circular>
    </div>
</template>

<script>
export default {
    name: "LoadingPage",
    props: {
        isLoading: Boolean
    },
    setup(props) {
        return {
            props
        }
    }
}
</script>

<style lang="scss" scoped>
.loading-container {
    position: fixed;
    background-color: white;
    opacity: 0.6;
    width: 100%;
    height: 130vh;
    z-index: 100;
    margin-top: -200px;
    padding-bottom: 200px;

    .loading {
        position: fixed;
        top: 50%;
        left: 55%;
        z-index: 100000;
    }
}
</style>



