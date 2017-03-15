<template>
<v-modal v-model="modal" id="modal">
  <v-btn slot="activator" primary dark>Modal</v-btn>
  <v-card>
    <v-card-text>
      <p class="text-xs-center">Add user</p>
      <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

      <v-text-input v-bind:class="{errorT: error}"  v-model="username" label="username"></v-text-input>
      <v-text-input v-bind:class="{errorT: error}" v-model="password" label="password"></v-text-input>

      <v-text-input v-model="email" label="Email"></v-text-input>
<!--       <v-select v-model="role" v-bind:options="roleOptions" label="Role" defaultText="Set role"></v-select> -->


      </v-card-text>
    </v-card-text>
    <v-card-row actions>
      <v-btn v-on:click.native="modal = false">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-on:click.native.stop="create()" class="green white--text">Add</v-btn>
    </v-card-row>
  </v-card>
</v-modal>
</template>

<script type="text/javascript">
export default {
  name: 'loginModal',
  data() {
    return {
      modal: false,
      username:"",
      password:"",
      email: "",
      role: 1,
      error: false,
      roleOptions: [{id: 0, text: 'admin'}, {id: 1, text: 'classic'}]
    }
  },
  methods: {
    create: function (event) {
      var userInfo = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('createUser', userInfo);
    }
  }
}
</script>

<style lang="stylus" >

  .errorT label
    color: red

  .errorT input
    border-bottom-color: red
    
</style>