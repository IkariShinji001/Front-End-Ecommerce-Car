import { createStore } from 'vuex';
import userModule from './modules/userModule';
import saleModule from './modules/saleModule';
import dashBoard from './modules/dashBoardModule';

export default createStore({
  modules: {
    user: userModule,
    sale: saleModule,
    dashBoard: dashBoard
  },
});