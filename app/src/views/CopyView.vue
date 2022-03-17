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
        <h4 class='px-3 text-blue align-self-center pb-0 mb-0 info-text'>User information input</h4>
      </div>
      <v-text-field
        v-model="userName"
        :rules="nameRules"
        label="User Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="userUrl"
        :rules="addressRules"
        label="User Url"
        required
      ></v-text-field>

      <v-text-field
        v-model="stringRead"
        :rules="sReadRules"
        label="String Read"
        required
      ></v-text-field>

      <v-text-field
        v-model="stringUpdate"
        :rules="sUpdateRules"
        label="String Update"
        required
      ></v-text-field>

      <v-text-field
        v-model="stringReport"
        :rules="sReportRules"
        label="String Report"
        required
      ></v-text-field>

      <v-text-field
        v-model="address"
        :rules="emailRules"
        label="Address"
        required
      ></v-text-field>

      <v-text-field
        v-model="publisher"
        :rules="publisherRules"
        label="Publisher"
        required
      ></v-text-field>

      <v-text-field
        v-model="accountName"
        :rules="accountRules"
        label="Account Name"
        required
      ></v-text-field>
      
      

      <v-btn
        color="success"
        class="mr-4 confirm text-transform-none"
        @click="edit_item"
      >
        Save data
      </v-btn>

      <v-btn
        color="error"
        class="reset text-transform-none"
        @click="cancel"
      >
        cancel
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    mounted(){
      const sendingData = { 
          name: this.$route.params.name
      };
      axios
      .post("http://localhost:5000/api/users/getInfoById", sendingData)
      .then((response)=>
      {
        const url = response.data.selItem.baseURL.substring(7);

        console.log(response.data.selItem);
        this.userName = response.data.selItem.name;
        this.userUrl = url;
        this.stringRead = response.data.selItem.connectStringRead;
        this.stringUpdate = response.data.selItem.connectStringUpdate;
        this.stringReport = response.data.selItem.connectStringReport;
        this.address = response.data.selItem.defaultFromAddress;
        this.publisher = response.data.selItem.defaultPublisher;
        this.accountName = response.data.selItem.popAccountName;
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
      if(this.userName == this.$route.params.name) {
        // alert("Name is not unique");
        
      }
      else if(this.valid === true) {
          const sendingData = { 
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
              alert('Copy user data successfully!');
              window.location.href = '#/about';
          }
          else
              alert('Server error');
      }
      else {
        alert('You should input correct information');
      }  
    },
    nameConfirm(v) {
      console.log(v)
      // let temp = this.desserts.map((item) => {
      //   if(item.defaultPublisher === v) {
      //     this.boolPublisher = false;
      //     return false;
      //   }
      // });
      this.name = true;
      for (var i  = 0; i <this.desserts.length; i++) {
        console.log(this.desserts[i].name)
        if(this.desserts[i].name === v) {
          this.name = false;
          break;
        }
      }
      return this.name;
    },
    cancel() {
      window.location.href = '#/about';
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
        desserts: [],
        nameRules: [
        v => !!v || 'Name is required',
        v => this.nameConfirm(v) !== false || 'Name contains is not unique.',
        v => (v && v.length <= 10) || 'Name Contains must be less than 10 characters',   
        v => v.indexOf(' ') < 0 || 'Name Contains white space.',
      ],
      emailRules: [
        v => !!v || 'Address is required',
        v => /.+@.+\..+/.test(v) || 'Address must be valid',
        v => v.indexOf(' ') < 0 || 'Address Contains white space.',
      ],
      sReadRules: [
        v => !!v || 'String Read is required',
        v => v.indexOf(' ') < 0 || 'String Read Contains white space.',
      ],
      sUpdateRules: [
        v => !!v || 'String Update is required',
        v => v.indexOf(' ') < 0 || 'String Update Contains white space.',
      ],
      sReportRules: [
        v => !!v || 'String Report is required',
        v => v.indexOf(' ') < 0 || 'String Report Contains white space.',
      ],
      addressRules: [
        v => !!v || 'Url is required',
        v => v.indexOf(' ') < 0 || 'Url Contains white space.',
      ],
      // publisherRules: [
      //   v => !!v || 'Publisher is required',
      //   v => this.publisherString.indexOf(v) < 0 || 'Publisher contains is not unique.',
      //   v => v.indexOf(' ') < 0 || 'Publisher Contains white space.',
      // ],
      publisherRules: [
        v => !!v || 'Publisher is required',
        v => v.indexOf(' ') < 0 || 'Publisher Contains white space.',
      ],
      accountRules: [
        v => !!v || 'Account is required',
        v => v.indexOf(' ') < 0 || 'Account Contains white space.',
      ],
      
      }
    },
  }
</script>