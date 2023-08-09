<template>
  <LoadingPage :isLoading="isLoading"> </LoadingPage>
  <HeadTitle title="Thêm thương hiệu" width="300px"></HeadTitle>
  <v-container fluid class="wrapper">
    <div class="form">
      <h1 class="text-center mb-10">Thông tin về hãng xe</h1>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Tên thương hiệu"
            class="input"
            hide-details
            v-model="brand"
            :rules="[required]"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Xuất sứ"
            class="input"
            hide-details
            v-model="country"
            :rules="[required]"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-file-input
            label="Logo"
            v-model="image"
            class="input"
            hide-details
            :rules="[required]"
            v-on:change="handleFileChange"
          >
          </v-file-input>
        </v-col>
      </v-row>

      <v-row class="img-container">
        <v-col cols="6" md="6">
          <img :src="previewLogo" class="img-preview" />
        </v-col>
      </v-row>

      <v-row>
        <v-btn class="btn" v-on:click="handleSubmit">Thêm hãng xe mới</v-btn>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import LoadingPage from "@/components/LoadingPage.vue";
import HeadTitle from "@/components/Dashboard/HeadTitle.vue";
import { createBrand } from "@/services/brand.service";
import { ref } from "vue";
import { useToast } from "vue-toastification";
export default {
  name: "CreateCarMain",
  components: {
    HeadTitle,
    LoadingPage,
  },
  setup() {
    const image = ref();
    const previewLogo = ref();
    const country = ref();
    const brand = ref();
    const toast = useToast();
    const isLoading = ref(false);

    const handleSubmit = async () => {
      if (!image.value || !country.value || !brand.value) {
        toast.error("Không được để trống");
        return;
      }
      isLoading.value = true;
      try {
        await createBrand({
          image: image.value,
          country: country.value,
          brand: brand.value,
        });
        brand.value = "";
        country.value = "";
        image.value = "";
        isLoading.value = false;
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.error("Đã tồn tại hãng xe này");
        } else {
          toast.error("Lỗi trong quá trình tạo hãng xe");
        }
        isLoading.value = false;
      }
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];

      if (previewLogo.value) {
        URL.revokeObjectURL(previewLogo.value);
      }
      previewLogo.value = URL.createObjectURL(file);
    };

    const required = (v) => {
      return !!v || "Không được để trống";
    };

    return {
      image,
      handleSubmit,
      brand,
      country,
      required,
      handleFileChange,
      previewLogo,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 20px;
  border-radius: 10px;
  width: 95%;
  background-color: white;
}

.form {
  width: 80%;
  margin: 0 auto;
  margin-top: 70px;
  background-color: white;

  .input {
    background-color: white;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.2);
  }

  .btn {
    margin: 20px auto;
    width: 200px;
    height: 50px;
    background-color: #0c3063;
    color: white;
    font-weight: bold;
  }

  .img-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .img-preview {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
