import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import _ from 'lodash';
import firebase from 'firebase';

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueRouter);

import routes from './routes.js';


const router = new VueRouter({
    routes
});

import request from 'browser-request';

const API_URL = "http://localhost:3003";

var config = {
    apiKey: "AIzaSyDnaaUkGNoI9bq3Lg_o-znk4B_b_V6Hr2g",
    authDomain: "healthbook-5b63e.firebaseapp.com",
    databaseURL: "https://healthbook-5b63e.firebaseio.com",
    storageBucket: "healthbook-5b63e.appspot.com",
    messagingSenderId: "110290838134"
};
firebase.initializeApp(config);


const store = new Vuex.Store({
    state: {
        har: undefined,
        reportsFolders: undefined,
        currentFolder: undefined,
        user: undefined,
        selectedGraphNode: undefined
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
        },
        refreshUser (state, data) {
            state.user = data;
        },
        refreshSelectedGraphNode (state, data) {
            state.selectedGraphNode = data;
        },
    },
    getters: {
        isLogged: state => { 
            console.log("Is logged: ", firebase.auth().currentUser);
            return firebase.auth().currentUser;
            //return state.user;
        }
    },
    actions: {
        fetchReportsListData({ commit, state }) {
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
        },
        generateReport({ dispatch, commit, state }, url) {
            console.log("url generate Report: ", url);
            request({url: API_URL + "/report?url=" + url, method: 'POST'}, function(err, resp){
                if(err)
                    console.log("Error on report generation")
                else{
                    console.log("response: ", resp);
                    dispatch('fetchReportsListData');
                }
                
            });  
        },
        createUser({ dispatch, commit, state }, payload) {
            console.log("email: ", payload.email, " password: ", payload.password);
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("Error on user creation: ", errorMessage);
                })
                .then(function(successInfo){
                    console.log("promise firebase: ", successInfo);
                    firebase.database().ref('users/' + successInfo.uid).set({
                        username: "toto",
                        email: payload.email
                    });
                });
        },
        signinUser({ dispatch, commit, state }, payload) {
            console.log("payload: ", payload);
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log("Error on user creation: ", errorMessage);
                })
                .then(function(successInfo){
                    var user = firebase.auth().currentUser;
                    console.log("promise firebase: ", successInfo);
                    var userRef = firebase.database().ref('users/' + successInfo.uid);
                    userRef.on('value', function(snapshot){
                        console.log("User snap: ", snapshot);
                        commit('refreshUser', {token: user.getToken(), details: snapshot.val()});
                    })
                });
        },
        selectedNode({ dispatch, commit, state }, payload) {
            console.log("selectedNode action: ", payload)
            var cleanNode = {id: payload.id, group: payload.group, index: payload.index, value: payload.value};
            commit('refreshSelectedGraphNode', cleanNode);
        }
    }
});

new Vue({
    el: '#app',
    store: store,
    router,
    render: h => h(App)
});
