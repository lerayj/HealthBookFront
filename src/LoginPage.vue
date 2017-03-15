<template>
<v-row>
<v-col xs4="xs4"></v-col>
                <v-col xs4="xs4">
            <v-card>
            <v-card-row class="green darken-1">
            <v-card-title>
            <span class="white--text">Login</span>
            </v-card-title>
            </v-card-row>

            <v-card-text>
                <v-text-input label="Email" v-model="email"></v-text-input>
                <v-text-input label="Password" v-model="password"></v-text-input>
                <v-btn info outline v-on:click.native.stop="connect()">Connect</v-btn>
                <AddUserModal/>
            </v-card-text>
                      <v-card-row actions>
                      Want to take a look?
                      <v-spacer></v-spacer>
            <v-btn flat class="green--text darken-1">Demo</v-btn>
          </v-card-row>
        </v-card>
        </v-col>

<v-row>
</template>

<script type="text/javascript">
    import firebase from 'firebase';
    import AddUserModal from './AddUserModal.vue';
    

    export default {
        components: {
            AddUserModal
        },
        data() {
            return {
                password: undefined,
                email: undefined,
                logged: this.$store.getters.isLogged
            }
        },
        methods: {
            connect() {
                this.$store.dispatch('signinUser', {email: this.email, password: this.password});
            }
        }
    }
</script>