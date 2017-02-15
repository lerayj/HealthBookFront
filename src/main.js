import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueRouter);

import routes from './routes.js';

console.log("import routes: ", routes);
const router = new VueRouter({
    routes
});

import request from 'browser-request';

const API_URL = "http://localhost:3000";

const store = new Vuex.Store({
    state: {
        count: 0,
        har: undefined,
        reportsFolders: undefined
    },
    mutations: {
        increment (state) {
          state.count++
        },
        refreshReportsList (state, data) {
            state.reportsFolders = data;
        }
    },
    actions: {
        fetchReportsListData({ commit, state }, url) {
            request(API_URL + "/reports", (err, response, body) =>{
                if(err)
                    console.log("Error on fetching report list.");
                var folderList = JSON.parse(body);
                console.log("response: ", JSON.parse(body));
                commit('refreshReportsList', folderList);
            })
        }
    }
});

new Vue({
    el: '#app',
    store: store,
    router,
    render: h => h(App)
});
