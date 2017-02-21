import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import _ from 'lodash';

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
        har: undefined,
        reportsFolders: undefined,
        currentFolder: undefined
    },
    mutations: {
        refreshReportsList (state, data) {
            state.reportsFolders = data;
            state.currentFolder = data;
        },
        refreshCurrentFolder (state, data) {
            state.currentFolder = data;
        },
        refreshHarData (state, data) {
            state.har = data;
        }
    },
    actions: {
        fetchReportsListData({ commit, state }, url) {
            request(API_URL + "/reports", (err, response, body) =>{
                if(err)
                    console.log("Error on fetching report list.");
                var folderList = JSON.parse(body);
                commit('refreshReportsList', folderList);
            });
        },
        fetchHarData({ commit, state }, data) {
            var queryString = "?url=" + data.website;
            request(API_URL + "/report" + queryString, (err, response, body) =>{
                if(err)
                    console.log("Error on fetching report list.");

                var harData = JSON.parse(body);
                console.log("harData: ", harData);
                commit('refreshHarData', harData);
            });
        },
        goToFolder({ commit, state }, path) {
            function searchTree(node, path){
                 if(node.path == path){
                      return node;
                 }else if (node.children != null){
                      var result;
                      for(var i=0; result == null && i < node.children.length; i++){
                           result = searchTree(node.children[i], path);
                      }
                      return result;
                 }
                 return null;
            }

            var tree = state.reportsFolders;
            if(tree.path != path){
                var result = searchTree(tree, path);
                if(result)
                    commit('refreshCurrentFolder', result);

            }
        }
    }
});

new Vue({
    el: '#app',
    store: store,
    router,
    render: h => h(App)
});
