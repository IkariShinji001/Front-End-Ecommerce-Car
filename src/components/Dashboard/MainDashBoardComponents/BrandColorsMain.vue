<template>
  <LoadingPage :isLoading="isLoading"> </LoadingPage>
  <HeadTitle title="Bảng màu của hãng xe" width="300px"></HeadTitle>
  <v-container fluid>
    <div class="wrapper">
      <h1 class="text-center pt-10">Thông tin bảng màu của hãng</h1>
      <v-row class="brand-input-container">
        <v-col md="9" cols="9">
          <v-select
            v-model="brandSelected"
            :items="brandsList"
            label="Hãng xe"
            class="brand-select input"
            item-title="brand"
            item-value="_id"
            @update:modelValue="handleBrandChange"
            hide-details
          >
          </v-select>
        </v-col>
      </v-row>

      <h2 class="text-center mt-10">Các màu hiện có</h2>

      <v-row>
        <div class="colors-container">
          <span
            v-for="colorImage in colorsImageInDB"
            :key="colorImage"
            class="image-color-container"
          >
            <img :src="colorImage.color" class="image" />
            <span>
              <p class="text-center">{{ colorImage.name }}</p>
            </span>
            <span
              class="mdi mdi-alpha-x-box-outline delete-color-btn"
              v-on:click="handleDeleteColor(colorImage.color)"
            ></span>
          </span>
        </div>
      </v-row>
    </div>

    <div class="wrapper">
      <h2 class="text-center pt-10">Thêm màu cho hãng</h2>
      <v-text-field
        v-model="newColorName"
        label="Tên màu"
        class="color-input input"
        variant="outlined"
        hide-details
      >
      </v-text-field>
      <v-file-input
        v-model="newColorImage"
        label="Thêm màu cho hãng"
        class="color-input input"
        v-on:change="handleFileChange"
        hide-details
      >
      </v-file-input>
      <div class="preview-color-image">
        <img :src="previewColorImage" class="preview-color-image" />
      </div>

      <v-row class="btn-container">
        <v-btn
          width="250px"
          height="60px"
          class="submit"
          v-on:click="handleSubmit"
          >Thêm màu mới</v-btn
        >
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import HeadTitle from "../HeadTitle.vue";
import {
  getBrand,
  createColorImage,
  deleteColorBrand,
} from "@/services/brand.service";
import { useToast } from "vue-toastification";
import LoadingPage from "@/components/LoadingPage.vue";
export default {
  name: "BrandColorsMain",
  components: {
    HeadTitle,
    LoadingPage,
  },
  setup() {
    const brandsList = ref([]);
    const brandSelected = ref();
    const colorsImageInDB = ref([]);
    const previewColorImage = ref();
    const newColorName = ref();
    const newColorImage = ref();
    const toast = useToast();
    const isLoading = ref(false);
    onBeforeMount(async () => {
      const { brands } = await getBrand();
      brandsList.value = brands;
    });

    const getColorsImageBrand = () => {
      const brand = brandsList.value.filter((brand) => {
        return brandSelected.value === brand._id;
      });
      if (brand) {
        colorsImageInDB.value = brand[0].colors;
      } else {
        colorsImageInDB.value = [];
      }
    };

    const handleBrandChange = () => {
      getColorsImageBrand();
    };

    const handleSubmit = async () => {
      if (!brandSelected.value) {
        toast.error("Vui lòng chọn hãng xe");
        return;
      }
      const payload = {
        _id: brandSelected.value,
        newColorName: newColorName.value,
        image: newColorImage.value[0],
      };
      isLoading.value = true;
      try {
        const res = await createColorImage(payload);
        colorsImageInDB.value.push({
          name: res.newColor.name,
          color: res.newColor.color,
        });

        isLoading.value = false;
        toast.success("Thêm màu xe thành công");
        const { brands } = await getBrand();
        brandsList.value = brands;
      } catch (error) {
        toast.error("Xảy ra lỗi trong quá trình thêm!");
      }
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (previewColorImage.value) {
        URL.revokeObjectURL(previewColorImage.value);
      }
      previewColorImage.value = URL.createObjectURL(file);
    };

    const handleDeleteColor = async (urlCloudinary) => {
      const index = colorsImageInDB.value.findIndex(
        (color) => color.color === urlCloudinary
      );
      colorsImageInDB.value.splice(index, 1);
      await deleteColorBrand({ id: brandSelected.value, urlCloudinary });
    };
    return {
      brandsList,
      brandSelected,
      handleBrandChange,
      getColorsImageBrand,
      colorsImageInDB,
      handleFileChange,
      previewColorImage,
      newColorName,
      handleSubmit,
      newColorImage,
      isLoading,
      handleDeleteColor,
    };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  margin: 30px auto;
  width: 90%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px rgba($color: #000000, $alpha: 0.1);

  .brand-input-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .colors-container {
    min-height: 100px;
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    justify-content: flex-start;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 15% 15% 15% 15% 15% 15%;

    img {
      width: 100%;
      border-radius: 10px;
    }

    p {
      font-weight: bold;
    }
  }

  .color-input {
    width: 70%;
    margin: 20px auto;
  }

  .preview-color-image {
    display: flex;
    justify-content: center;

    margin-bottom: 30px;

    .preview-color-image {
      width: 200px;
    }
  }

  .input {
    background-color: white;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.2);
  }

  .btn-container {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;

    .submit {
      background-color: #0c3063;
      color: white;
      font-weight: bold;
    }
  }

  .delete-color-btn {
    font-size: 32px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
}
</style>
