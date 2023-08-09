<template>
  <LoadingPage :isLoading="isLoading"></LoadingPage>
  <v-container fluid class="wrapper">
    <HeadTitle title="Quản lí xe"> </HeadTitle>
    <h2 class="text-center mt-8">Danh sách xe</h2>
    <v-text-field
      label="Lọc xe"
      class="find-input"
      hide-details="auto"
      v-model="filter"
    >
    </v-text-field>
    <div class="table-container">
      <v-table class="mt-8">
        <thead>
          <tr>
            <th class="table-id text-left">
              <strong>STT</strong>
            </th>
            <th class="text-left">
              <strong>Tên</strong>
            </th>
            <th class="text-left">
              <strong>Model</strong>
            </th>
            <th class="text-left">
              <strong>Dòng xe</strong>
            </th>
            <th class="text-left">
              <strong>Giá bán</strong>
            </th>
            <th class="text-left">
              <strong>Số lượng kho</strong>
            </th>
            <th class="text-left">
              <strong>Trạng thái</strong>
            </th>
            <th class="text-left">
              <strong>Chức năng</strong>
            </th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="(car, i) in cars" :key="car._id">
            <td>{{ i + 1 }}</td>
            <td>{{ car.name }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.classification }}</td>
            <td>{{ formatter.format(car.price) }}</td>
            <td>{{ car.quantity + " chiếc" }}</td>
            <td
              :class="{
                isInBussiness: car.isInBussiness,
                stopInBussiness: !car.isInBussiness,
              }"
            >
              {{ car.isInBussiness ? "Đang kinh doanh" : "Dừng Kinh Doanh" }}
            </td>
            <td>
              <div class="d-flex function-car-container">
                <span
                  class="mdi mdi-eye detailCar"
                  title="Xem chi tiết thông tin xe"
                  v-on:click="handleShowDetail(car._id)"
                ></span>
                <span
                  class="mdi mdi-delete-forever deleteCar"
                  title="Xóa xe"
                  v-on:click="handleDeleteCar(car._id)"
                ></span>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
      <PaginationPage
        class="pagination"
        :length="length"
        v-model:page="currentPage"
        @update:page="handlePageUpdate"
      >
      </PaginationPage>
    </div>
  </v-container>
</template>

<script>
import { reactive, ref, onBeforeMount, watchEffect } from "vue";
import HeadTitle from "@/components/Dashboard/HeadTitle.vue";
import { getAllCars, deleteCar, getTotalCar } from "@/services/car.service";
import { formatter } from "@/helpers/formatCurrency";
import PaginationPage from "@/components/PaginationPage.vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  name: "CarManagementMain",
  components: {
    HeadTitle,
    PaginationPage,
    LoadingPage,
  },
  setup() {
    const store = useStore();
    const toast = useToast();
    const cars = ref([]);
    const filter = ref("");
    const currentPage = ref(1);
    const length = ref(1);
    const isLoading = ref(false);
    const optionsFilter = reactive({
      page: currentPage,
      limit: 8,
      filter: filter,
    });
    onBeforeMount(async () => {
      cars.value = await getAllCars(optionsFilter);
      const res = await getTotalCar();
      length.value = Math.ceil(res.totalCar[0].count / optionsFilter.limit);
    });
    watchEffect(async () => {
      cars.value = await getAllCars(optionsFilter);
    });
    const handlePageUpdate = (page) => {
      currentPage.value = page;
    };

    const handleDeleteCar = async (carId) => {
      isLoading.value = true;
      const res = await deleteCar(carId);
      if (res) {
        const carIndex = cars.value.findIndex((car) => car._id === carId);
        cars.value.splice(carIndex, 1);
        isLoading.value = false;
        toast.success("Xóa xe thành công");
      } else {
        isLoading.value = false;
        toast.error("Lỗi trong quá trình xóa");
      }
    };

    const handleShowDetail = (carId) => {
      store.commit("dashBoard/setCurrentComponentMain", {
        component: "UpdateCarMain",
        carId,
      });
    };
    return {
      cars,
      filter,
      formatter,
      handlePageUpdate,
      currentPage,
      length,
      handleDeleteCar,
      handleShowDetail,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: auto;
}

.isInBussiness {
  font-weight: bold;
  color: green;
}
.stopInBussiness {
  color: red;
  font-weight: bold;
}

.find-input {
  width: 300px;
  background-color: white;
  box-shadow: 5px 5px 6px 4px rgba($color: #000000, $alpha: 0.15);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.function-car-container {
  width: 100%;
  justify-content: space-evenly;
}

.detailCar,
.deleteCar {
  font-size: 29px;

  &:hover {
    color: #f31c1c; // Màu chữ khi di chuột vào
    cursor: pointer; // Hiển thị con trỏ khi di chuột vào
  }
}

.table-body {
  tr:nth-child(odd) {
    background-color: #ebeaea; // Màu nền cho hàng chẵn
  }
}

.pagination {
  margin-top: 40px;
}
</style>
