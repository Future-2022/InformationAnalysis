<template>
<div>
  <div class='text-left pt-5'>
    <div class='d-flex'>
      <v-icon
        normal
        class='text-icon1 align-self-center px-3'
      >
        mdi-message-text
      </v-icon>
      <h5 class='text-warnings info-text pb-0 mb-0 align-self-center'>User Url Data Information by Using Vue js.</h5>
    </div>
    <v-data-table
      :headers="headers2"
      :items="desserts2"
      :items-per-page="5"
      class="elevation-1 px-3 py-2 table-1"
      :search="search"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (You can search all fields.)"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </div>

  <div class='text-left pt-5'>
    <div class='d-flex'>
        <v-icon
          normal
          class='text-icon2 align-self-center px-3'
        >
          mdi-email
        </v-icon>
        <h5 class='text-blue info-text pb-0 mb-0 align-self-center'>User Virtual Apps Data Information by Using Vue js.</h5>
    </div>
    <v-data-table
      :headers="headers1"
      :items="desserts1"
      :items-per-page="5"
      class="elevation-1 px-3 py-2 table-2"
      :search="search1"
    >    
      <template v-slot:top>
        <v-text-field
          v-model="search1"
          label="Search (You can search all fields.)"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.setting`]="{ item }">
        <div class=''>
          <v-btn
            @click="edit_item(item.id)"
            class='my-2 blue-btn w-50'
            block
          >
            edit
          </v-btn>
          <v-btn
            block  
            class='black-btn w-50'          
            @click="copy_item(item.id)"
          >
            copy
          </v-btn>
          <v-btn
            block  
            class='red-btn w-50 mt-2'          
            @click="delete_item(item.id)"
          >
            delete
          </v-btn>
        </div>
      </template>
    </v-data-table>  
  </div>
</div>
  
</template>

<script>
import axios from 'axios';
  export default {
    mounted(){
      axios
      .get("http://localhost:5000/api/users/getInfo")
      .then((response)=>
      {
        this.desserts2 = response.data.userInfo.urlScreen;
        this.desserts1 = response.data.userInfo.virtualApps;
      })
  },
  methods: {
    edit_item(id) {
      window.location.href = '#/edit/' + id;
    },
    copy_item(id) {
      window.location.href = '#/copy/' + id;
    },
    delete_item(id) {
      const sendingData = { 
          id:id 
      };
      axios
      .post("http://localhost:5000/api/users/deleteItem/", sendingData)
      .then((response)=>
      {
        console.log(response);
        alert("You have successfully deleted!");
        window.location.reload();
      })
    }
  },
    data () {
      return {
        search: '',
        search1: '',
        headers1: [          
          { text: 'Setting', value: 'setting', sortable: false, },
          { text: 'ID', value: 'id', sortable: false, },
          {
            text: 'User Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },          
          { text: 'User Url', value: 'baseURL' },
          { text: 'String Read', value: 'connectStringRead' },
          { text: 'String Update', value: 'connectStringUpdate' },
          { text: 'String Report', value: 'connectStringReport' },
          { text: 'Address', value: 'defaultFromAddress' },
          { text: 'Publisher', value: 'defaultPublisher' },
          { text: 'Account', value: 'popAccountName', sortable: false},
        ],
        headers2: [
          { text: 'ID', value: 'id', sortable: false, },
          {
            text: 'User Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },          
          { text: 'User Url', value: 'url' }
        ],
        desserts1: [],
        desserts2: []
      }
    },
  }
</script>
