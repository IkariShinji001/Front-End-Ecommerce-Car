<template>  
    <v-container :fluid="true">
        <HeadTitle title="Thông tin xe"></HeadTitle>
        <DetailCar :main="'updateCar'"></DetailCar>
    </v-container>

</template>

<script>
import HeadTitle from '@/components/Dashboard/HeadTitle.vue';
import DetailCar from '@/components/Dashboard/DetailCar.vue';
export default{
    name: "CreateCarMain",
    components:{
        HeadTitle,
        DetailCar
    },
    setup(){

    }
}
</script>


<style scoped>


</style>