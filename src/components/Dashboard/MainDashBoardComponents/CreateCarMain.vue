<template>
  <v-container fluid>
    <HeadTitle title="Thêm xe mới"></HeadTitle>
    <DetailCar :main="'createCar'"></DetailCar>
  </v-container>
</template>

<script>
import HeadTitle from "@/components/Dashboard/HeadTitle.vue";
import DetailCar from "@/components/Dashboard/DetailCar.vue";
export default {
  name: "CreateCarMain",
  components: {
    HeadTitle,
    DetailCar,
  },
  setup() {},
};
</script>

<style scoped></style>
