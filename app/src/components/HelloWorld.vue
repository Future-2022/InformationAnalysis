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
          mdi-folder-move
        </v-icon>
        <h4 class='px-3 text-blue align-self-center pb-0 mb-0 info-text'>Input Data</h4>
      </div>
      <v-text-field
        v-model="userName"
        :rules="nameRules"
        label="name"
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
        @click="saveData"
      >
        Save Data
      </v-btn>

      <v-btn
        color="error"
        class="reset text-transform-none"
        @click="reset"
      >
        Reset Fields
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import './index.css';
export default {
  name: 'DataInput',
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
      valid: true,
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
        v => !!v || 'name is required',
    //    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        v => v.indexOf(' ') < 0 || 'name Contains white space.',
      ],
      urlRules: [
        v => !!v || 'baseUrl is required',
        v => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v) || 'baseUrl must be valid',
        v => v.indexOf(' ') < 0 || 'baseUrl Contains white space.',
      ],
      sReadRules: [
        v => !!v || 'connectStringRead is required',
        v => v.indexOf(' ') < 0 || 'connectStringRead Contains white space.',
      ],
      sUpdateRules: [
        v => !!v || 'connectStringUpdate is required',
        v => v.indexOf(' ') < 0 || 'connectStringUpdate Contains white space.',
      ],
      sReportRules: [
        v => !!v || 'connectStringReport is required',
        v => v.indexOf(' ') < 0 || 'connectStringReport Contains white space.',
      ],
      addressRules: [
        v => !!v || 'defaultFromAddress is required',
        v => v.indexOf(' ') < 0 || 'defaultFromAddress Contains white space.',
      ],
      // publisherRules: [
      //   v => !!v || 'defaultPublisher is required',
      //   v => this.publisherString.indexOf(v) < 0 || 'defaultPublisher is not unique.',
      //   v => v.indexOf(' ') < 0 || 'defaultPublisher Contains white space.',
      // ],
      publisherRules: [
        v => !!v || 'defaultPublisher is required',
        v => (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/).test(v) || 'defaultPublisher needs to be a valid guid',
        v => this.publisherConfirm(v) !== false || 'defaultPublisher contains is not unique.',
        v => v.indexOf(' ') < 0 || 'defaultPublisher Contains white space.',
      ],
      accountRules: [
        v => !!v || 'popAccountName is required',
        v => v.indexOf(' ') < 0 || 'popAccountName Contains white space.',
      ],
    }
  },
  methods: 
  {
    setUserName(event) {
      this.userName = event.target.value;
    },
    setUserUrl(event) {
      alert(event.target.value)
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
      console.log(v)
      // let temp = this.desserts.map((item) => {
      //   if(item.defaultPublisher === v) {
      //     this.boolPublisher = false;
      //     return false;
      //   }
      // });
      this.boolPublisher = true;
      for (var i  = 0; i <this.desserts.length; i++) {
        console.log(this.desserts[i].defaultPublisher)
        if(this.desserts[i].defaultPublisher === v) {
          this.boolPublisher = false;
          break;
        }
      }
      return this.boolPublisher;
    },
    async inputData() {
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
          alert('Successfully Saved The Data!');
          window.location.reload();
      }
      else
          alert('Server error');
    },
    saveData() { 
      console.log(this.valid);
      if(this.userName !== '' && this.valid === true) {
        this.inputData();
      }
      else {
        alert('Input Correct Information');
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