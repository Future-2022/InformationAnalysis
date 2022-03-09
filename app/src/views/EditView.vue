<template>
<div class='text-center'>
    <v-form
      ref="form"
      class='px-5 pt-1 w-800'
      v-model="valid"
      lazy-validation
    >
      <div class='d-flex'>
        <v-icon
          large
          class='text-blue align-self-center'
        >
          mdi-account
        </v-icon>
        <h4 class='px-3 text-blue align-self-center pb-0 mb-0 info-text'>Data Input</h4>
      </div>
      <v-text-field
        v-model="userName"
        :rules="nameRules"
        label="name"
        value="False"
        required
      ></v-text-field>

      <v-text-field
        v-model="userUrl"
        :rules="addressRules"
        label="baseUrl"
        required
      ></v-text-field>

      <v-text-field
        v-model="stringRead"
        :rules="sReadRules"
        label="connectStringRead"
        required
      ></v-text-field>

      <v-text-field
        v-model="stringUpdate"
        :rules="sUpdateRules"
        label="connectStringUpdate"
        required
      ></v-text-field>

      <v-text-field
        v-model="stringReport"
        :rules="sReportRules"
        label="connectStringReport"
        required
      ></v-text-field>

      <v-text-field
        v-model="address"
        :rules="urlRules"
        label="defaultFromAddress"
        required
      ></v-text-field>

      <v-text-field
        v-model="publisher"
        :rules="publisherRules"
        label="defaultPublisher"
        required
      ></v-text-field>

      <v-text-field
        v-model="accountName"
        :rules="accountRules"
        label="popAccountName"
        required
      ></v-text-field>


      <v-btn
        color="success"
        class="mr-4 confirm text-transform-none"
        @click="edit_item"
      >
        Save Data
      </v-btn>

      <v-btn
        color="error"
        class="reset text-transform-none"
        @click="cancel"
      >
        Cancel
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    mounted(){
      const sendingData = { 
          id: this.$route.params.id
      };
      axios
      .post("http://localhost:5000/api/users/getInfoById", sendingData)
      .then((response)=>
      {
        const url = response.data.selectItem.baseURL.substring(7);

        console.log(response.data.selectItem);
        this.userName = response.data.selectItem.name;
        this.userUrl = url;
        this.stringRead = response.data.selectItem.connectStringRead;
        this.stringUpdate = response.data.selectItem.connectStringUpdate;
        this.stringReport = response.data.selectItem.connectStringReport;
        this.address = response.data.selectItem.defaultFromAddress;
        this.publisher = response.data.selectItem.defaultPublisher;
        this.accountName = response.data.selectItem.popAccountName;
      })

      axios
      .get("http://localhost:5000/api/users/getInfo")
      .then((response)=>
      {
        this.desserts = response.data.userInfo.virtualApps;
        this.publisherString = JSON.stringify(this.desserts)
        console.log('--desserts', JSON.stringify(this.publisherString));
      })
  },
  methods: {
    // filterOnlyCapsText (value, search) {
    //   return value != null &&
    //     search != null &&
    //     typeof value === 'string' &&
    //     value.toString().toLocaleUpperCase().indexOf(search) !== -1
    // },
    async edit_item() {

      if(this.valid === true) {
          const sendingData = { 
              id: this.$route.params.id,
              name: this.userName, 
              url: this.userUrl, 
              stringRead: this.stringRead, 
              stringUpdate: this.stringUpdate, 
              stringReport: this.stringReport, 
              address: this.address, 
              publisher: this.publisher, 
              accountName: this.accountName, 
          };
          const response = await axios.post("http://localhost:5000/api/users/editData", sendingData);
          console.log(response);
          if(response.status === 200) {
              alert('Edit Data Was Successfull!');
              window.location.href = '#/info';
          }
          else
              alert('Server error');
      }
      else {
        alert('Input Correct Information');
      }  
    },

    async copy_item(){

      if(this.valid === true) {
          const sendingData = { 
              id: this.$route.params.id,
              name: this.userName, 
              url: this.userUrl, 
              stringRead: this.stringRead, 
              stringUpdate: this.stringUpdate, 
              stringReport: this.stringReport, 
              address: this.address, 
              publisher: this.publisher, 
              accountName: this.accountName, 
          };
          const response = await axios.post("http://localhost:5000/api/users/copyData", sendingData);
          console.log(response);
          if(response.status === 200) {
              alert('Edit Data Was Successfull!');
              window.location.href = '#/info';
          }
          else
              alert('Server error');
      }
      else {
        alert('Input Correct Information');
      }  
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
    },

    publisherConfirm(v) {
      console.log(v)
      this.boolPublisher = true;
      for (var i  = 0; i <this.desserts.length; i++) {
        console.log(this.desserts[i].defaultPublisher)
        if(i != this.$route.params.id - 1) {         
        
          if(this.desserts[i].defaultPublisher === v) {
            this.boolPublisher = false;
            break;
          }
        }
      }
      return this.boolPublisher;
    },

    cancel() {
      window.location.href = '#/info';
    }
  },

    data () {
      return {
        valid: true,
        boolPublisher: true,
        userName: '',
        userUrl: '',
        stringRead: '',
        stringUpdate: '',
        stringReport: '',
        address: '',
        publisher: '',
        accountName: '',
        headers1: [
          { text: 'Setting', value: 'setting', sortable: false, },
          { text: 'ID', value: 'id', sortable: false, },
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
          { text: 'ID', value: 'id', sortable: false, },
          {
            text: 'name',
            align: 'start',
            sortable: false,
            value: 'name',
          },          
          { text: 'baseUrl', value: 'url' }
        ],
        desserts: [],
        nameRules: [
        v => !!v || 'name is required',
        // v => v.indexOf(' ') < 0 || 'name Contains white space.',
      ],
      urlRules: [
        v => !!v || 'baseUrl is required',
        v => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v) || 'baseUrl must be valid',
        v => v.indexOf(' ') < 0 || 'baseUrl Contains white space.',
      ],
      sReadRules: [
        v => !!v || 'connectStringRead is required',
        // v => v.indexOf(' ') < 0 || 'connectStringRead Contains white space.',
      ],
      sUpdateRules: [
        v => !!v || 'connectStringUpdate is required',
        // v => v.indexOf(' ') < 0 || 'connectStringUpdate Contains white space.',
      ],
      sReportRules: [
        v => !!v || 'connectStringReport is required',
       //  v => v.indexOf(' ') < 0 || 'connectStringReport Contains white space.',
      ],
      addressRules: [
        v => !!v || 'defaultFromAddress is required',
        v => v.indexOf(' ') < 0 || 'defaultFromAddress Contains white space.',
      ],
      publisherRules: [
        v => !!v || 'defaultPublisher is required',
        v => (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/).test(v) || 'defaultPublisher needs to be a valid guid',
        v => this.publisherConfirm(v) !== false || 'defaultPublisher contains is not unique.',
        v => v.indexOf(' ') < 0 || 'defaultPublisher Contains white space.',
      ],
      accountRules: [
        v => !!v || 'popAccountName is required',
        // v => v.indexOf(' ') < 0 || 'popAccountName Contains white space.',
      ],
    }
  }
}
</script>