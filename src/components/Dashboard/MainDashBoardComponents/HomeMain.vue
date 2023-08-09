<template class="wrapper">
  <HeadTitle :title="'Trang Chủ'"></HeadTitle>
  <div class="d-flex justify-space-around container">
    <v-card
      v-for="(card, index) in cards"
      :key="index"
      height="125px"
      width="23%"
      :color="card.color"
      elevation="13"
    >
      <template #title>
        <div class="d-flex title">
          <v-icon :icon="card.icon" class="icon"></v-icon>
          <div class="card-title">{{ card.title }}</div>
        </div>
      </template>

      <template #text>
        <div class="card-text">{{ card.value }}</div>
      </template>
    </v-card>
  </div>
  <div class="mt-10 table-container">
    <h2 class="mb-10 ml-4">Những xe bán gần đây</h2>
    <v-table class="table" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Tên xe</th>
          <th class="text-left">Ảnh</th>
          <th class="text-left">Năm sản xuất</th>
          <th class="text-left">Ngày bán</th>
          <th class="text-left">Phân loại</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in carsSoldData" :key="car._id" v>
          <td class="table-car-name">
            {{ car.carId.name + " " + car.carId.model }}
          </td>
          <td class="table-car-img">
            <img class="img-car" :src="car.carId?.images[6]" />
          </td>
          <td class="table-car-year">{{ car.carId.year }}</td>
          <td class="table-car-time-sale">
            {{ car.day + "/" + car.month + "/" + car.year }}
          </td>
          <td class="table-car-year">{{ car.carId.classification }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import HeadTitle from "@/components/Dashboard/HeadTitle.vue";
export default {
  name: "HomeMain",
  components: {
    HeadTitle,
  },
  setup() {
    const store = useStore();
    const cards = ref([]);
    const carsSoldData = ref([]);
    onBeforeMount(async () => {
      await store.dispatch("dashBoard/getAllCardInfor");
      await store.dispatch("sale/getAllCarSoldSortedDate");
      cards.value = store.getters["dashBoard/getCards"];
      carsSoldData.value = store.getters["sale/getCarsSold"];
      console.log(carsSoldData.value);
    });
    return { cards, carsSoldData };
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  padding-bottom: 100px;
}
.table {
  min-height: 100px;
  width: 95%;
  margin: 0 auto;
  border-radius: 10px;
}
.container {
  margin-top: 40px;
}
.card-title {
  font-weight: 600;
  color: white;
  text-align: center;
  font-size: 1rem;
  text-transform: uppercase;
}

.title {
  width: 100%;
  .icon {
    margin-right: 20px;
    width: 20%;
    color: #ffffff;
  }
}

.card-text {
  margin-top: 10px;
  color: white;
  text-align: center;
  font-size: 1.4rem;
}
.table-car-name {
  width: fit-content;
}
.img-car {
  width: 150px;
}
</style>
