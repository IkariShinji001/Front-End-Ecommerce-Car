<template>
  <LoadingPage :isLoading="isLoading"></LoadingPage>
  <v-container :fluid="true" :class="isLoading ? 'wrapper loading' : 'wrapper'">
    <div class="form-container">
      <h2 class="text-center mt-10 mb-4">Thông tin về xe</h2>
      <v-from>
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Tên xe"
                hide-details="true"
                v-model="nameCar"
                :readonly="isDisabled"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Model xe"
                hide-details="true"
                v-model="modelCar"
                :readonly="isDisabled"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                :rules="[required]"
                :items="brands"
                class="input"
                label="Hãng xe"
                hide-details="true"
                v-model="brandCar"
                :readonly="isDisabled"
              ></v-select>
            </v-col>

            <v-col cols="12" md="1">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Số lượng"
                hide-details="true"
                v-model="quantityCar"
                :readonly="isDisabled"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                :items="isInBussinessOptions"
                item-title="text"
                item-value="value"
                class="input"
                label="Trạng thái kinh doanh"
                hide-details="true"
                v-model="isInBussinessCar"
                :readonly="isDisabled"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Dòng xe"
                hide-details="true"
                :readonly="isDisabled"
                v-model="classificationCar"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                :rules="[required]"
                class="input"
                label="Năm sản xuất"
                :items="yearManufactionOptions"
                hide-details="true"
                v-model="yearCar"
                :readonly="isDisabled"
              >
              </v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input no-spinner"
                label="Giá niêm yết"
                v-model="priceCar"
                type="number"
                min="0"
                prefix="VND"
                :readonly="isDisabled"
              >
                <template #details>
                  <span class="word-price flex-start">{{
                    numberToWord + " đồng"
                  }}</span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="2">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Giảm giá (%)"
                hide-details="true"
                v-model="discountPrice"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <h2 class="text-center mt-10 mb-4">Thông tin kỹ thuật</h2>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Hộp số"
                hide-details="true"
                v-model="transmissionCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Loại động cơ"
                hide-details="true"
                v-model="engineTypeCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Dung tích công tác"
                hide-details="true"
                v-model="displacementCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Công suất cực đại"
                hide-details="true"
                v-model="maxPowerCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Moment xoắn cực đại"
                hide-details="true"
                v-model="maxTorqueCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Dẫn động"
                hide-details="true"
                v-model="driveTypeCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Loại nhiên liệu"
                hide-details="true"
                v-model="fuelTypeCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Số chỗ ngồi"
                hide-details="true"
                v-model="seatsCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Dài (mm)"
                hide-details="true"
                v-model="lengthCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Rộng (mm)"
                hide-details="true"
                v-model="widthCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Cao (mm)"
                hide-details="true"
                v-model="heightCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Chiều dài cơ sở (mm)"
                hide-details="true"
                v-model="wheelbaseCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Tăng tốc 0 - 100km(s)"
                hide-details="true"
                v-model="accelerationCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                :rules="[required]"
                class="input"
                label="Tốc độ tối đa (km/h)"
                hide-details="true"
                v-model="topSpeedCar"
                :readonly="isDisabled"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-combobox
                v-model="colorCar"
                :items="colorOfBrand"
                label="Màu của xe"
                multiple
                item-text="name"
                item-value="id"
                return-object
                item-title="name"
                :disabled="brandCar && isDisabled && colorOfBrand"
                hide-details
                :rules="[required]"
                class="input"
              >
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.name)"
                    v-bind="data.attrs"
                    :model-value="data.selected"
                    :disabled="data.disabled"
                    size="medium"
                    @click:close="data.parent.selectItem(data.item)"
                  >
                    <template v-slot:prepend>
                      <img
                        :src="data.item.value.color"
                        class="img-color-preview"
                      />
                    </template>
                    {{ data.item.title }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row v-if="updateCarMain">
            <h3 class="title-image text-center mt-10 mb-4">
              Ảnh có trong cơ sở dữ liệu
            </h3>
          </v-row>
          <div class="img-preview-container mb-16" v-if="updateCarMain">
            <span v-for="img in dbImages" :key="img" class="img-wrapper">
              <img class="img-preview-update" :src="img" />
              <span
                class="mdi mdi-alpha-x-box-outline delete-img-icon"
                v-on:click="handleDeleteImage(img)"
              ></span>
            </span>
          </div>
          <v-row>
            <v-col cols="12" md="12">
              <v-file-input
                :rules="[required]"
                v-on:change="handleFileChange"
                counter
                multiple
                type="file"
                class="input"
                label="Ảnh của xe"
                prepend-icon="mdi-camera"
                v-model="images"
                :disabled="isDisabled"
              >
              </v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <h3 class="title-image mt-10 mb-4">Ảnh thêm vào</h3>
          </v-row>
          <div class="img-preview-container">
            <span v-for="img in urlsPreview" :key="img" class="img-wrapper">
              <img class="img-preview" :src="img" />
            </span>
          </div>
        </v-container>
        <div class="btn-submit-container mt-12">
          <v-btn
            v-on:click="handleAbleInput"
            class="btn-submit"
            v-if="updateCarMain && isDisabled"
            >Chỉnh sửa</v-btn
          >
          <v-btn
            v-on:click="handleSubmit"
            class="btn-submit"
            v-else-if="updateCarMain && !isDisabled"
            >Hoàn tất chỉnh sửa</v-btn
          >
          <v-btn v-on:click="handleSubmit" class="btn-submit" v-else
            >Thêm xe mới</v-btn
          >
        </div>
      </v-from>
    </div>
  </v-container>
</template>

<script>
import { reactive, onBeforeMount, watch, computed, onMounted, ref } from "vue";
import { default as VNnum2words } from "vn-num2words";
import {
  createCar,
  getCarById,
  uploadCarImages,
  updateCar,
  deleteCarImage,
} from "@/services/car.service";
import { getBrand } from "@/services/brand.service";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import LoadingPage from "../LoadingPage.vue";
export default {
  name: "DetailCar",
  props: {
    main: String,
  },
  components: {
    LoadingPage,
  },
  setup(props) {
    const updateCarMain = props.main === "updateCar" ? true : false;
    const isLoading = ref(false);
    const store = useStore();
    const UpdateCarComponent = ref();
    const isDisabled = ref(false);
    const toast = useToast();
    const nameCar = ref();
    const modelCar = ref();
    const brandCar = ref();
    const classificationCar = ref();
    const yearCar = ref();
    const priceCar = ref(0);
    const discountPrice = ref(0);
    const transmissionCar = ref();
    const engineTypeCar = ref();
    const displacementCar = ref();
    const maxPowerCar = ref();
    const maxTorqueCar = ref();
    const driveTypeCar = ref();
    const fuelTypeCar = ref();
    const seatsCar = ref();
    const lengthCar = ref();
    const widthCar = ref();
    const heightCar = ref();
    const wheelbaseCar = ref();
    const accelerationCar = ref();
    const topSpeedCar = ref();
    const colorCar = ref();
    const quantityCar = ref();
    const isInBussinessCar = ref();
    const images = ref();
    const dbImages = ref();
    const urlsPreview = ref([]);
    const isInBussinessOptions = ref([
      {
        value: true,
        text: "Đang Kinh Doanh",
      },
      {
        value: false,
        text: "Dừng Kinh Doanh",
      },
    ]);
    const yearManufactionOptions = ref([]);
    const brands = ref([]);
    const colorOfBrand = ref([]);
    const brandColor = ref();
    const newCarInfor = reactive({
      name: nameCar,
      model: modelCar,
      brand: brandCar,
      classification: classificationCar,
      year: yearCar,
      price: priceCar,
      discount: discountPrice,
      transmission: transmissionCar,
      engineType: engineTypeCar,
      displacement: displacementCar,
      maxPower: maxPowerCar,
      maxTorque: maxTorqueCar,
      driveType: driveTypeCar,
      fuelType: fuelTypeCar,
      seats: seatsCar,
      length: lengthCar,
      width: widthCar,
      height: heightCar,
      wheelbase: wheelbaseCar,
      acceleration: accelerationCar,
      topSpeed: topSpeedCar,
      color: colorCar,
      quantity: quantityCar,
      isInBussiness: isInBussinessCar,
    });

    onBeforeMount(async () => {
      const res = await getBrand();
      brands.value = res.brands.map((brand) => {
        return brand.brand;
      });
      brandColor.value = res.brands.map((brand) => {
        return brand;
      });
      const carId = store.getters["dashBoard/getCurrentComponentMain"].carId;

      if (carId) {
        const res = await getCarById(carId);
        isDisabled.value = true;
        nameCar.value = res.name;
        modelCar.value = res.model;
        brandCar.value = res.brand;
        classificationCar.value = res.classification;
        yearCar.value = res.year;
        priceCar.value = res.price;
        discountPrice.value = res.discount;
        transmissionCar.value = res.description.transmission;
        engineTypeCar.value = res.description.engineSpecs.engineType;
        displacementCar.value = res.description.engineSpecs.displacement;
        maxPowerCar.value = res.description.engineSpecs.maxPower;
        maxTorqueCar.value = res.description.engineSpecs.maxTorque;
        driveTypeCar.value = res.description.driveType;
        fuelTypeCar.value = res.description.fuelType;
        seatsCar.value = res.description.seats;
        lengthCar.value = res.description.dimensions.length;
        widthCar.value = res.description.dimensions.width;
        heightCar.value = res.description.dimensions.height;
        wheelbaseCar.value = res.description.wheelbase;
        accelerationCar.value = res.description.acceleration;
        topSpeedCar.value = res.description.topSpeed;
        colorCar.value = res.description.color;
        dbImages.value = res.images;
        quantityCar.value = res.quantity;
        isInBussinessCar.value = res.isInBussiness;
      }
    });

    const handleAbleInput = () => {
      isDisabled.value = false;
    };

    const handleDeleteImage = async (img) => {
      const index = dbImages.value.findIndex((url) => url === img);
      dbImages.value.splice(index, 1);
      const carId = store.getters["dashBoard/getCurrentComponentMain"].carId;
      await deleteCarImage(carId, img);
      toast.success("Xóa ảnh thành công");
    };

    const handleSubmit = async () => {
      for (let field in newCarInfor) {
        if (newCarInfor[field] === "" && field !== "discount") {
          toast.error("Không được để trống " + field);
          return;
        }
      }

      if (updateCarMain) {
        isLoading.value = true;
        const carId = store.getters["dashBoard/getCurrentComponentMain"].carId;
        await updateCar(carId, newCarInfor);
        isLoading.value = false;
        toast.success("Cập nhật thông tin xe thành công");
        isDisabled.value = true;
      } else {
        isLoading.value = true;
        const newCar = await createCar(newCarInfor);
        await uploadCarImages(newCar._id, images.value);
        isLoading.value = false;
        toast.success("Tạo xe thành công");
      }
    };

    const handleFileChange = (e) => {
      const files = e.target.files;
      urlsPreview.value.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      urlsPreview.value = Array.from(files).map((file) => {
        return URL.createObjectURL(file);
      });
    };

    const generateYearManufactionOptions = () => {
      const currentYear = new Date().getFullYear();
      const startYear = 1990;
      for (let year = currentYear; year >= startYear; year--) {
        yearManufactionOptions.value.push(year.toString());
      }
    };

    const numberToWord = computed(() => {
      const word = VNnum2words(priceCar.value);
      return word;
    });

    const getBrandColor = () => {
      const brandSelect = brandColor.value.filter((brand) => {
        return brand.brand === brandCar.value;
      });
      if (!updateCarMain) {
        colorCar.value = [];
      }
      if (brandSelect) {
        colorOfBrand.value = brandSelect[0]?.colors;
      } else {
        colorOfBrand.value = [];
      }
    };

    watch(brandCar, () => {
      getBrandColor();
    });

    onMounted(() => {
      generateYearManufactionOptions();
    });

    const required = (v) => {
      return !!v || "Không được để trống";
    };

    return {
      yearManufactionOptions,
      isInBussinessOptions,
      newCarInfor,
      numberToWord,
      brandCar,
      nameCar,
      modelCar,
      classificationCar,
      yearCar,
      priceCar,
      images,
      quantityCar,
      transmissionCar,
      isInBussinessCar,
      engineTypeCar,
      displacementCar,
      maxPowerCar,
      maxTorqueCar,
      driveTypeCar,
      fuelTypeCar,
      seatsCar,
      lengthCar,
      widthCar,
      heightCar,
      wheelbaseCar,
      accelerationCar,
      topSpeedCar,
      colorCar,
      discountPrice,
      handleSubmit,
      handleFileChange,
      urlsPreview,
      brands,
      required,
      UpdateCarComponent,
      isDisabled,
      updateCarMain,
      dbImages,
      handleAbleInput,
      handleDeleteImage,
      isLoading,
      colorOfBrand,
    };
  },
};
</script>

<style lang="scss" scoped>
.word-price,
.color-detail {
  width: 100%;
  font-size: 15px;
  display: flex;
}

.wrapper {
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;
}

h2 {
  font-size: 30px;
}

.input {
  background-color: white;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.2);
}

.img-preview-container {
  margin: 0 auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-gap: 10px;
}

.img-preview,
.img-preview-update {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  object-position: center;

  :hover {
    opacity: 0.2;
  }
}

.btn-submit {
  padding: 30px 80px;
  display: flex;
  align-items: center;
  font-weight: 700;
  background-color: #0c3063;
  color: white;
}

.btn-submit-container {
  display: flex;
  justify-content: center;
}

.img-wrapper {
  position: relative;
}

.img-wrapper {
  &:hover {
    img {
      filter: grayscale(70%);
    }

    .delete-img-icon {
      cursor: pointer;
      display: block;

      &:hover {
        color: rgb(202, 26, 26);
      }
    }
  }
}

.delete-img-icon {
  display: none;
  position: absolute;
  font-size: 60px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  color: aliceblue;
}

.img-color-preview {
  width: 50px;
}
</style>
