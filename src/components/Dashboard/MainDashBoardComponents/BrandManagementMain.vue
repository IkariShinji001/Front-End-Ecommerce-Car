<template>
  <LoadingPage :isLoading="isLoading"></LoadingPage>
  <v-container fluid>
    <HeadTitle title="Quản lí thương hiệu" width="300px"></HeadTitle>
    <v-text-field
      hide-details
      class="filter-input"
      label="Tên hãng xe"
      v-model="brandInput"
    >
    </v-text-field>
    <v-table fixed-header class="table">
      <thead>
        <tr>
          <th class="text-center index">STT</th>
          <th class="text-center brand">Hãng xe</th>
          <th class="text-center logo">Logo</th>
          <th class="text-center country">Xuất xứ</th>
          <th class="text-center function">Chức năng</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(brand, i) in brands" :key="i">
          <td>
            {{ (page - 1) * perPage + i + 1 }}
          </td>
          <td>
            {{ brand.brand }}
          </td>
          <td>
            <img :src="brand.image" class="logo-image" />
          </td>
          <td>
            {{ brand.country }}
          </td>
          <td>
            <div class="function-container">
              <span
                class="mdi mdi-delete-forever delete-brand"
                title="Xóa hãng xe"
                v-on:click="handleDeleteBrand(brand._id)"
              ></span>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <PaginationPage :length="pageLength" @update:page="handleUpdatePage">
    </PaginationPage>
  </v-container>
</template>

<script>
import { onBeforeMount } from "vue";
import HeadTitle from "../HeadTitle.vue";
import { getBrand, getTotalBrand, deleteBrand } from "@/services/brand.service";
import { ref } from "vue";
import { reactive } from "vue";
import PaginationPage from "@/components/PaginationPage.vue";
import { watchEffect } from "vue";
import LoadingPage from "@/components/LoadingPage.vue";

export default {
  name: "BrandManagementMain",
  components: {
    HeadTitle,
    PaginationPage,
    LoadingPage,
  },
  setup() {
    const brandInput = ref();
    const brands = ref([]);
    const page = ref(1);
    const perPage = ref();
    const pageLength = ref();
    const totalBrand = ref();
    const optionFilter = reactive({
      limit: 4,
      brand: brandInput,
      page: page,
    });
    const isLoading = ref(false);
    onBeforeMount(async () => {
      const res = await getBrand(optionFilter);
      const totalBrands = await getTotalBrand();
      totalBrand.value = totalBrands.count;
      brands.value = res.brands;
      perPage.value = brands.value.length;
      pageLength.value = Math.ceil(totalBrand.value / optionFilter.limit);
    });

    watchEffect(async () => {
      const res = await getBrand(optionFilter);
      brands.value = res.brands;
    });
    const handleUpdatePage = (currentPage) => {
      page.value = currentPage;
    };
    const handleDeleteBrand = async (id) => {
      isLoading.value = true;
      const index = brands.value.findIndex((brand) => brand._id === id);
      brands.value.splice(index, 1);
      await deleteBrand(id);
      isLoading.value = false;
    };

    return {
      brands,
      brandInput,
      optionFilter,
      pageLength,
      handleUpdatePage,
      page,
      perPage,
      handleDeleteBrand,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.table {
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 10px;

  .logo-image {
    width: 40%;
  }

  .index {
    width: 10%;
  }

  .brand {
    width: 20%;
  }

  .logo {
    width: 30%;
  }

  .country {
    width: 20%;
  }

  .function {
    width: 10%;
  }

  th {
    font-size: 20px;
    font-weight: 600;
  }

  td {
    text-align: center;
    font-size: 18px;
  }

  tbody {
    tr {
      height: 130px;
    }
  }

  .function-container {
    display: flex;
    justify-content: space-evenly;

    .detail-brand,
    .delete-brand {
      font-size: 30px;
      cursor: pointer;
    }

    .delete-brand {
      &:hover {
        color: red;
      }
    }

    .detail-brand {
      &:hover {
        color: red;
      }
    }
  }
}

.filter-input {
  margin-top: 50px;
  width: 300px;
  background-color: white;
  box-shadow: 5px 5px 6px 4px rgba($color: #000000, $alpha: 0.15);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
</style>
