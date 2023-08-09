import { reactive } from "vue";
import { getTotalUser } from "@/services/user.service";
import { getTotalSale } from "@/services/sale.service";
import { formatter } from "@/helpers/formatCurrency";

const state = reactive({
  Tabs: [
    {
      tab: "Car",
      sub_tab: [
        {
          tab: "Danh sách xe",
          component: "CarManagementMain",
          icon: "mdi mdi-format-list-checkbox",
        },
        {
          tab: "Thêm xe",
          component: "CreateCarMain",
          icon: "mdi mdi-plus-box-outline",
        },
        {
          tab: "Hãng xe",
          component: "BrandManagementMain",
          icon: "mdi mdi-alpha-c-circle",
        },
        {
          tab: "Thêm hãng xe",
          component: "CreateBrandMain",
          icon: "mdi mdi-plus-box-outline",
        },
        {
          tab: "Bảng màu",
          component: "BrandColorsMain",
          icon: "mdi mdi-plus-box-outline",
        },
      ],
    },
    {
      tab: "Sale",
      sub_tab: [
        {
          tab: "Thống kê",
          component: "StatisticsMain",
          icon: "mdi mdi-chart-line",
        },
      ],
    },
    {
      tab: "User",
      sub_tab: [
        {
          tab: "Đặt cọc",
          component: "DepositMain",
          icon: "mdi mdi-cash-fast",
        },
        {
          tab: "Lái thử",
          component: "TestDriveBookingMain",
          icon: "mdi mdi-book-account-outline",
        },
      ],
    },
  ],
  Cards: [
    {
      title: "Số người dùng",
      icon: "mdi mdi-ticket-account",
      color: "#001C44",
      value: null,
    },
    {
      title: "Số đơn đặt cọc",
      icon: "mdi mdi-cash-fast",
      color: "#0C5776",
      value: null,
    },
    {
      title: "Đăng ký lái thử ",
      icon: "mdi mdi-car-convertible",
      color: "#2D99AE",
      value: null,
    },
    {
      title: "Tổng doanh thu",
      icon: "mdi mdi-currency-usd",
      color: "#001949",
      value: null,
    },
  ],
  currentComponentMain: {
    component: "HomeMain",
    carId: null,
  },
});

const getters = {
  getCarTab: (state) => state.Tabs.filter((tab) => tab.tab === "Car"),
  getSaleTab: (state) => state.Tabs.filter((tab) => tab.tab === "Sale"),
  getUserTab: (state) => state.Tabs.filter((tab) => tab.tab === "User"),
  getCards: (state) => state.Cards,
  getCurrentComponentMain: (state) => state.currentComponentMain,
};

const mutations = {
  setTotalUser(state, value) {
    state.Cards.forEach((card) => {
      if (card.title === "Số người dùng") {
        card.value = value;
      }
    });
  },
  setTotalDeposit(state, value) {
    state.Cards.forEach((card) => {
      if (card.title === "Số đơn đặt cọc") {
        card.value = value;
      }
    });
  },
  setTotalDrivingTest(state, value) {
    state.Cards.forEach((card) => {
      if (card.title === "Đăng ký lái thử ") {
        card.value = value;
      }
    });
  },
  setTotalSale(state, value) {
    state.Cards.forEach((card) => {
      if (card.title === "Tổng doanh thu") {
        if (!value) {
          card.value = formatter.format(0);
        } else {
          card.value = formatter.format(value);
        }
      }
    });
  },
  setCurrentComponentMain(state, payload) {
    state.currentComponentMain.component = payload.component;
    state.currentComponentMain.carId = payload.carId;
  },
};

const actions = {
  async getAllCardInfor({ commit }) {
    const userRes = await getTotalUser();
    const saleRes = await getTotalSale();
    commit("setTotalUser", userRes.totalUser);
    commit("setTotalSale", saleRes);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
