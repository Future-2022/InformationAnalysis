<template>
<div>
  <div class='text-left pt-5'>
    <div class='d-flex'>
      <v-icon
        normal
        class='text-icon1 align-self-center px-3'
      >
        mdi-account
      </v-icon>
      <h5 class='text-warnings info-text pb-0 mb-0 align-self-center'>urlScreen Data</h5>
    </div>
    <v-data-table
      :headers="headers2"
      :items="desserts2"
      :items-per-page="10"
      class="elevation-1 px-3 py-2 table-1"
    >
    </v-data-table>
  </div>

  <div class='text-left pt-5'>
    <div class='d-flex'>
        <v-icon
          normal
          class='text-icon2 align-self-center px-3'
        >
          mdi-account
        </v-icon>
        <h5 class='text-blue info-text pb-0 mb-0 align-self-center'>virtualApps Data</h5>
    </div>
    <v-data-table
      :headers="headers1"
      :items="desserts1"
      :items-per-page="10"
      class="elevation-1 px-3 py-2 table-2"
    >
    <template v-slot:[`item.setting`]="{ item }">
        <div class=''>

          <v-btn
            @click="edit_item(item.id)"
            class='my-2 blue-btn w-50'
            block
          >
            Edit
          </v-btn>

          <v-btn
            @click="copy_item(item.id)"
            class='my-2 green-btn w-100'
            block
          >
            Copy
          </v-btn>

          <v-btn 
            @click="delete_item(item.id)"
            class='my-2 red-btn w-50'          
            block
          >
            Delete
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
    // filterOnlyCapsText (value, search) {
    //   return value != null &&
    //     search != null &&
    //     typeof value === 'string' &&
    //     value.toString().toLocaleUpperCase().indexOf(search) !== -1
    // },
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
        alert("You Have Successfully Deleted!");
        window.location.reload();
      })
    }
  },
    data () {
      return {

        
        headers1: [
          { text: 'Settings', value: 'setting', sortable: false, },
        //  { text: 'ID', value: 'id', sortable: false, },
          {
            text: 'name',
            align: 'start',
            sortable: false,
            value: 'name',
          },          
          { text: 'baseUrl', value: 'baseURL' },
          { text: 'connectStringRead', value: 'connectStringRead' },
          { text: 'connectStringUpdate', value: 'connectStringUpdate' },
          { text: 'connectStringReport', value: 'connectStringReport' },
          { text: 'defaultFromAddress', value: 'defaultFromAddress' },
          { text: 'defaultPublisher', value: 'defaultPublisher' },
          { text: 'popAccountName', value: 'popAccountName', sortable: false},
        ],
        headers2: [
        //  { text: 'ID', value: 'id', sortable: false, },
          {
            text: 'name',
            align: 'start',
            sortable: false,
            value: 'name',
          },          
          { text: 'url', value: 'url' }
        ],
        desserts1: [],
        desserts2: []
      }
    },
  }
</script>