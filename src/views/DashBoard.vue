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

          <v-list>
       
          </v-list>
          <v-list>
            <v-list-item
                ref="homeItem"
                prepend-icon="mdi-account-circle"
                title="Trang chủ"
                value="Home"
                v-on:click="handleChangeTabs('HomeMain')"
                > 
            </v-list-item>
            <v-list-subheader>Quản lí</v-list-subheader>
            <v-list-group value="User">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-account-circle"
                  title="Người dùng">
                </v-list-item>
              </template>
            </v-list-group>

            <v-list-group value="Cars">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi mdi-car"
                  title="Xe"
                  >
                </v-list-item>
              </template>
              <v-list-item 
                v-for="(tab, index) in carTabs" :key="index" 
                :prepend-icon="tab.icon" 
                :title="tab.tab" 
                :value="tab.component" 
                v-on:click="handleChangeTabs(tab.component)" >
              </v-list-item>
            </v-list-group>

            <v-list-group value="Sale">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi mdi-cash-multiple"
                  title="Bán hàng"
                >
                </v-list-item>
              </template>
              <v-list-item 
                v-for="(tab, index) in saleTabs" :key="index" 
                :prepend-icon="tab.icon" 
                :title="tab.tab" 
                :value="tab.component" 
                v-on:click="handleChangeTabs(tab.component)" >
              </v-list-item>
            </v-list-group>
          </v-list>
          <div class="logout-container"><v-btn :onclick="handleLogout" class="logout" color="#00838F">Đăng xuất</v-btn></div>
        </v-navigation-drawer>
        <v-main class="main">
          <component :is="currentComponent"></component>
          <PageFooter></PageFooter>
        </v-main>
      </v-layout>
    </v-card>
  </template>


<script>
import { useStore} from 'vuex';
import {useRouter} from 'vue-router'
import { ref, onMounted, watch} from 'vue';
import { useToast } from "vue-toastification";
import StatisticsMain from '@/components/Dashboard/MainComponents/StatisticsMain.vue';
import NotFound from './NotFound.vue';
import HomeMain from '../components/Dashboard/MainComponents/HomeMain.vue'
import PageFooter from '@/components/PageFooter.vue';
import CarManagementMain from '@/components/Dashboard/MainComponents/CarManagementMain.vue';
import CreateCarMain from '@/components/Dashboard/MainComponents/CreateCarMain.vue';
import UpdateCarMain from '@/components/Dashboard/MainComponents/UpdateCarMain.vue';


export default {
    name: "DashBoard",
    components: {
      StatisticsMain,
      HomeMain,
      NotFound,
      PageFooter,
      CarManagementMain,
      CreateCarMain,
      UpdateCarMain
    },
    setup(){
      const store = useStore();
      const toast = useToast();
      const router = useRouter();
      const currentComponent = ref(store.getters['dashBoard/getCurrentComponentMain']);
      const username = store.getters['user/getUser'];
      const saleTabs = store.getters['dashBoard/getSaleTab'][0].sub_tab;
      const carTabs =  store.getters['dashBoard/getCarTab'][0].sub_tab;
      const handleChangeTabs = (component) => {
        store.commit('dashBoard/setCurrentComponentMain', {component});
        currentComponent.value = store.getters['dashBoard/getCurrentComponentMain'].component;
      }
      
      onMounted(() => {
        currentComponent.value = store.getters['dashBoard/getCurrentComponentMain'].component;
      })

      watch(() => store.getters['dashBoard/getCurrentComponentMain'].component, () =>{
        currentComponent.value = store.getters['dashBoard/getCurrentComponentMain'].component;
      })

      const handleLogout = async () =>{
        await store.dispatch('user/logout');
        toast.success("Đăng xuất thành công");
        router.push("/admin/login");
      }

      return{
        store, username, StatisticsMain, saleTabs, handleChangeTabs, currentComponent, carTabs, handleLogout
      }
    }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    background-color: #EFF4FB;
  }

  .main{
    min-height: 100vh;
    }
  .logout-container{
    display: flex;
    justify-content: center;
    width: 100%;
    .logout{
    margin-top: 40px;
    width: 70%;
    height: 40px !important;
    color: white;
    }
  } 
 
</style>


