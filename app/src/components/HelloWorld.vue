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
        @click="saveData"
      >
        Input data
      </v-btn>

      <v-btn
        color="error"
        class="reset text-transform-none"
        @click="reset"
      >
        Reset
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import './index.css';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
      axios
      .get("http://localhost:5000/api/users/getInfo")
      .then((response)=>
      {
        this.desserts = response.data.userInfo.virtualApps;
        this.publisherString = JSON.stringify(this.desserts)
        console.log('--desserts', JSON.stringify(this.publisherString));
      })
  },
  data() {
    return {
      boolPublisher: true,
      desserts: [],
      publisherString:'',
      userName: '',
      userUrl: '',
      stringRead: '',
      stringUpdate: '',
      stringReport: '',
      address: '',
      publisher: '',
      accountName: '',
      nameRules: [
        v => !!v || 'Name is required',
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
        v => this.publisherConfirm(v) !== false || 'Publisher contains is not unique.',
        v => v.indexOf(' ') < 0 || 'Publisher Contains white space.',
      ],
      accountRules: [
        v => !!v || 'Account is required',
        v => v.indexOf(' ') < 0 || 'Account Contains white space.',
      ],
    }
  },
  methods: 
  {
    setUserName(event) {
      this.userName = event.target.value;
    },
    setUserUrl(event) {
      this.userUrl = event.target.value;
    },
    setStringRead(event) {
      this.stringRead = event.target.value;
    },
    setStringUpdate(event) {
      this.stringUpdate = event.target.value;
    },
    setStringReport(event) {
      this.stringReport = event.target.value;
    },
    setAddress(event) {
      this.address = event.target.value;
    },
    setPublisher(event) {
      this.publisher = event.target.value;
    },
    setAccountName(event) {
      this.accountName = event.target.value;
    },
    publisherConfirm(v) {
      let temp = this.desserts.map((item) => {
        if(item.defaultPublisher === v) {
          this.boolPublisher = false;
          return false;
        }
        this.boolPublisher = true;
      });
      console.log(temp);
      return this.boolPublisher;
    },
    async inputData() {
    console.log('start');
      // POST request using axios with async/await
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
      const response = await axios.post("http://localhost:5000/api/users/inputData", sendingData);
      console.log(response);
      if(response.status === 200) {
          alert('Save user data successfully!');
          window.location.reload();
      }
      else
          alert('Server error');
    },
    saveData() { 
      if(this.userName !== '') {
        this.inputData();
      }
      else {
        alert('You should input information');
      }        
    },
    reset() {
      this.userName = '';
      this.userUrl = '';
      this.stringRead = '';
      this.stringUpdate = '';
      this.stringReport = '';
      this.address = '';
      this.publisher = '';
      this.accountName = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<style>
.c-inline {
  display: inline-block;
}
</style>
