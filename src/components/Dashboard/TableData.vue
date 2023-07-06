<template>
    <v-container :fluid="true" class="container">
        <div class="table-each-car-sold-container">
            <h1>Tổng số xe được bán ra</h1>
            <v-table class="table-each-car-sold" fixed-header v-if="isDataLoaded">
                <thead>
                  <tr>
                      <th>Tên xe</th>
                       <th>Số lượng bán ra</th>
                 </tr>
                </thead>
                <tbody>
                    <tr v-for="dataSale in data" v-bind:key="dataSale.name">
                        <td>{{dataSale._id.name + " " + dataSale._id.model}}</td>
                        <td>{{ dataSale.totalEachCarSold + " xe"}} </td>
                    </tr>
                </tbody>
            </v-table>
        </div>

        <div class="table-top-car-sold-container">
            <h1>Top xe bán chạy </h1>
            <v-table class="table-top-car-sold" fixed-header v-if="isDataLoaded">
                <thead>
                  <tr>
                      <th>Tên xe</th>
                       <th>Số lượng bán ra</th>
                 </tr>
                </thead>
                <tbody>
                    <tr v-for="data in sortData" v-bind:key="data.name">
                        <td>{{data._id.name + " " + data._id.model}}</td>
                        <td>{{ data.totalEachCarSold + " xe"}} </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </v-container>
   
</template>


<script>
import { onBeforeMount } from "vue";
import {getTotalCarsSold} from  "../../services/sale.service"
import { ref } from "vue";
import {sortDecrease} from "../../helpers/sort"
export default{
    name: "TableData",
    setup(){
        const data = ref([]);
        const sortData = ref([]);
        const isDataLoaded = ref(false);

        onBeforeMount(async () => {
            const res = await getTotalCarsSold();
            data.value = res;
            sortData.value = [...res];
            sortDecrease(sortData.value, "totalEachCarSold");
            isDataLoaded.value = true;
        });

        

        return{
            data,isDataLoaded, sortData
        }

    }
}

</script>


<style lang="scss" scoped>
    .container{
        display: flex;
        justify-content: space-between;
        width: 98%;
        height: 40vh;
        border-radius: 10px;
        margin-top: 20px;
        
        h1{
            font-size: large;
            text-align: center;
            margin-bottom: 10px;
        }

        .table-each-car-sold-container{
            width: 40%;
            .table-each-car-sold{
            border-radius: 10px;
            width: 100%;
            }
        }

        .table-top-car-sold-container{
            width: 50%;
            border-radius: 10px;
        }
        
    }
</style>