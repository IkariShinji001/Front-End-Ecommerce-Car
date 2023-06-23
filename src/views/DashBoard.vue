<template>
    <v-card class="wrapper">
      <v-layout>
        <v-navigation-drawer
          permanent
          location="left"
        >
          <template v-slot:prepend>
            <v-list-item
              lines="two"
              prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
              :title= "username"
              subtitle="Quản trị viên"
            ></v-list-item>
          </template>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav v-for="(tab, index) in tabs" :key="index">
            <v-list-item prepend-icon="mdi mdi-poll" :title="tab.tab" :value="tab.component" v-on:click="handleChangeTabs(tab.component)" ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main >
          <component :is="currentComponent"></component>
        </v-main>
      </v-layout>
    </v-card>
  </template>


<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import StatisticsMain from '@/components/Dashboard/StatisticsMain.vue';
import NotFound from './NotFound.vue';

export default {
    name: "DashBoard",
    components: {
      StatisticsMain, 
      NotFound
    },
    setup(){
      const tabs = [{
        tab: "Thống kê",
        component: "StatisticsMain"
      }]
      const store = useStore();
      const currentComponent = ref("NotFound");
      const username = store.getters['user/getUser'];
      const handleChangeTabs = (component) => {
      currentComponent.value = component;
    }

      return{
        store, username, StatisticsMain, tabs, handleChangeTabs, currentComponent
    }
    }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    background-color: #EFF4FB;
  }
</style>


