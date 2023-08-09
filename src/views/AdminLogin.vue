<template>
  <section class="wrapper">
    <div class="login-form-container">
      <article class="img">
        <h1>WELCOME BACK</h1>
      </article>

      <article class="form-login">
        <div class="box">
          <h1>ĐĂNG NHẬP VÀO HỆ THỐNG QUẢN TRỊ</h1>
          <h2>Thanh Duy Luxury</h2>
          <v-sheet width="80%" class="mx-auto mt-12">
            <v-form fast-fail @submit.prevent>
              <v-text-field
                v-model="username"
                label="Username"
                variant="outlined"
                :rules="[rules.require]"
                class="username-field"
                @keydown.enter="handleSubmit"
              >
                <span class="headline"></span>
              </v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                variant="outlined"
                :rules="[rules.require]"
                class="password-field mt-4"
                type="password"
                @keydown.enter="handleSubmit"
              >
                <span class="headline"></span>
              </v-text-field>
              <v-btn type="button" block class="mt-4" @click="handleSubmit"
                >Đăng nhập</v-btn
              >
            </v-form>
          </v-sheet>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "AdminLogin",
  setup() {
    const username = ref("");
    const password = ref("");
    const toast = useToast();
    const router = useRouter();
    const store = useStore();

    const handleSubmit = async () => {
      await store.dispatch("user/login", {
        username: username.value,
        password: password.value,
      });
      if (store.getters["user/getRole"] === "admin") {
        toast.success("Đăng nhập thành công", {
          timeout: 2000,
        });
        router.push("/admin/dashboard");
      } else {
        toast.error("Sai tên tài khoản hoặc mật khẩu", {
          timeout: 2000,
        });
      }
    };

    const rules = {
      require: (value) => !!value || "Required.",
    };

    return {
      username,
      password,
      handleSubmit,
      rules,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap");
section.wrapper {
  width: 100%;
  height: 100vh;
  background-color: #e9edf9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form-container {
  width: 80%;
  height: 80%;
  background-color: white;
  display: flex;
  border-radius: 10px;
  .img {
    border-radius: 10px;
    width: 50%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: url("https://images.unsplash.com/photo-1611651338412-8403fa6e3599?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9yc2NoZSUyMDkxMXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80");

    h1 {
      display: flex;
      height: 40%;
      justify-content: center;
      align-items: center;
      font-family: "Rubik", sans-serif;
      color: #fffefb;
      text-align: center;
      font-size: 50px;
      font-weight: 400;
    }
  }
  .box {
    margin: 100px 3%;
    h1 {
      color: #268ef8;
      font-family: sans-serif;
      text-align: center;
      font-size: x-large;
    }

    h2 {
      color: black;
      font-family: "Rubik", sans-serif;
      text-align: center;
      font-size: x-large;
    }
    .username-field {
      position: relative;
      .headline {
        height: 98%;
        width: 7px;
        background-color: #268ef8;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .password-field {
      position: relative;
      .headline {
        height: 99%;
        width: 7px;
        background-color: #268ef8;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }

  .form-login {
    width: 50%;
  }
}
</style>
