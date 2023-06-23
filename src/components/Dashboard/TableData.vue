<template>
    <v-container :fluid="true" class="container">
        <h1>Tổng số xe được bán ra</h1>
        <v-table class="table" fixed-header v-if="isDataLoaded">
            <thead>
                <tr>
                    <th>Tên xe</th>
                    <th>Số lượng bán ra</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dataSale in data" v-bind:key="dataSale.name">
                    <td>{{dataSale._id.name + " " + dataSale._id.model}}</td>
                    <td>{{ dataSale.totalCarsSold + " xe"}} </td>
                </tr>
            </tbody>
        </v-table>
    </v-container>
   
</template>


<script>
import { onBeforeMount } from "vue";
import {getTotalCarsSold} from  "../../services/sale.service"
import { ref } from "vue";
export default{
    name: "TableData",
    setup(){
        const data = ref([]);
        const isDataLoaded = ref(false);

        onBeforeMount(async () => {
            const res = await getTotalCarsSold();
            data.value = res;
            isDataLoaded.value = true;
        });


        return{
            data,isDataLoaded
        }

    }
}

</script>


<style lang="scss" scoped>
    .container{
        width: 95%;
        height: 40vh;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 20px;
        
        h1{
            font-size: large;
            text-align: center;
            margin-bottom: 10px;
            text-decoration: underline;
        }
    }
</style>