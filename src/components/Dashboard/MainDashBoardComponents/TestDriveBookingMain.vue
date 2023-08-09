<template>
  <HeadTitle
    title="Danh sách khách hàng đăng ký lái thử"
    width="500px"
  ></HeadTitle>
  <v-container fluid>
    <v-table fixed-header>
      <thead>
        <tr>
          <th>Tên khách hàng</th>
          <th>Số điện thoại</th>
          <th>Email</th>
          <th>Ngày lái thử</th>
          <th>Xe lái thử</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in listTestDriveBoooking" :key="booking._id">
          <th>{{ booking.username }}</th>
          <th>{{ booking.phoneNumber }}</th>
          <th>{{ booking.email }}</th>
          <th>{{ `${booking.day}/${booking.month}/${booking.year} ` }}</th>
          <th>{{ booking.carId.name + " " + booking.carId.model }}</th>
          <th>
            <v-select
              :items="statusTestDriveBookingOptions"
              v-model="booking.status"
              v-on:change=""
            >
            </v-select>
          </th>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import HeadTitle from "../HeadTitle.vue";
import { getAllTestDriveBooking } from "@/services/testDriveBooking.service";
import { reactive } from "vue";
export default {
  name: "TestDriveBookingMain",
  components: {
    HeadTitle,
  },
  setup() {
    const listTestDriveBoooking = ref();
    const statusTestDriveBookingOptions = ["Chưa xác nhận", "Đã xác nhận"];
    const statusTestDriveBooking = ref();
    const sortedDate = ref(-1);
    const testDriveBookingFilter = reactive({
      page: 1,
      limit: 8,
      sortedDate,
    });
    onBeforeMount(async () => {
      try {
        listTestDriveBoooking.value = await getAllTestDriveBooking();
      } catch (error) {
        console.log(error);
      }
    });

    return {
      listTestDriveBoooking,
      statusTestDriveBookingOptions,
      statusTestDriveBooking,
      testDriveBookingFilter,
    };
  },
};
</script>
