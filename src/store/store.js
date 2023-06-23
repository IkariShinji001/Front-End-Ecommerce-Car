import { createStore } from 'vuex';
import userModule from './modules/userModule';
import saleModule from './modules/saleModule';

export default createStore({
  modules: {
    user: userModule,
    sale: saleModule
  },
});