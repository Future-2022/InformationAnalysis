<template>
  <div>
    <form class='px-5 pt-1 w-800'>
      <div class='d-flex'>
        <v-icon
          large
          class='text-blue align-self-center'
        >
          mdi-account
        </v-icon>
        <h4 class='px-3 text-blue align-self-center pb-0 mb-0 info-text'>User copy information input</h4>
      </div>

      <v-text-field
        v-model="userName"
        label="User Name"
        required
      ></v-text-field>
      <p class='error' v-if="msg.userName">{{msg.userName}}</p>

      <v-text-field
        v-model="address"
        label="Address"
        required
      ></v-text-field>
      <p class='error' v-if="msg.address">{{msg.address}}</p>

      <v-text-field
        v-model="userUrl"
        label="User Url"
        required
      ></v-text-field>
      <p class='error' v-if="msg.userUrl">{{msg.userUrl}}</p>
      
    </form>
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
  data(){
    return {
      address: '',
      userName: '',
      userUrl: '',
      msg: [],
    }
  },  
  watch: {
    address(value){
      this.address = value;
      this.msg['address'] = this.validateAddress(value);
    },
    userName(value) {
      this.userName = value;
      this.msg['userName'] = this.validateUserName(value);
    },
    userUrl(value) {
      this.userUrl = value;
      this.msg['userUrl'] = this.validateUserUrl(value);
    },
    
  },
  methods:{
    validateUserName(value){
      if (value == '') {
        return 'Name is required.';
      } else if(!this.nameConfirm(value)) {
        return 'Name contain is not unique.';
      } else if(value.length > 10){
        return 'Name Contains must be less than 10 characters.'
      } else if(value.indexOf(' ') > 0) {
        return 'Address should not contain space.'
      } else {
        return '';
      }
    },
    validateAddress(value){
      if (/.+@.+\..+/.test(value) === false) {
        return 'Address must be valid';
      } else if(value.indexOf(' ') > 0){
        return 'Address should not contain space.'
      } else {
         return '';
      } 
    },
    validateUserUrl(value){
      if (value == '') {
        return 'User Url is required.';
      } else if(value.indexOf(' ') > 0) {
        return 'User Url should not contain space.'
      } else {
        return '';
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
  }
}
</script>