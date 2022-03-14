const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../../configs.json');
// const configUrl = './configs.json';
const data = fs.readFileSync('./configs.json'); // Read config.json
const configJson = JSON.parse(data); // Parse Json

// fs.readFile('configs.json', (err, data) => {
//   if (err) throw err;
//   const configJson = JSON.parse(data);
// });


router.get(
  '/getInfo',
  async (req, res) => {
    try {
      res.json({userInfo:config});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/inputData',
  async (req, res) => {
    const {name, url, address, stringRead, stringUpdate,
          stringReport, publisher, accountName} = req.body;
    try {
      configJson.urlScreen.push({
          'name': name,
          'url': url
      }); 
      configJson.virtualApps.push({
        'name': name,
        'baseURL': 'http://' + url+'/',
        'connectStringRead': stringRead,
        'connectStringUpdate': stringUpdate,
        'connectStringReport': stringReport,
        'defaultFromAddress': address,
        'defaultPublisher': publisher,
        'popAccountName': accountName
      })
      await fs.writeFileSync('./configs.json', JSON.stringify(configJson, null, 4)); // The 4 parameter signifys 4 white spaces
      res.send({'msg':'Success'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post(
  '/editData',
  async (req, res) => {
    const {name, url, address, stringRead, stringUpdate,
          stringReport, publisher, accountName} = req.body;
          
    try {
      for (var i = 0; i < configJson.virtualApps.length; i++) {
        if(configJson.virtualApps[i].name == name) {          
          configJson.virtualApps[i].baseURL = 'http://'+url+'/';
          configJson.virtualApps[i].defaultFromAddress = address;
          configJson.virtualApps[i].connectStringRead = stringRead;
          configJson.virtualApps[i].connectStringReport = stringUpdate;
          configJson.virtualApps[i].stringReport = stringReport;
          configJson.virtualApps[i].defaultPublisher = publisher;
          configJson.virtualApps[i].popAccountName = accountName;
          break;
        }
      }
      for (var i = 0; i < configJson.urlScreen.length; i++) {
        if(configJson.urlScreen[i].name == name) {          
          configJson.urlScreen[i].url = url;
          break;
        }
      }
      await fs.writeFileSync('./configs.json', JSON.stringify(configJson, null, 4)); // The 4 parameter signifys 4 white spaces
      res.send({'msg':'Success'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/copyData',
  async (req, res) => {
    const {name, url, address, stringRead, stringUpdate,
          stringReport, publisher, accountName} = req.body;
          
    try {
      configJson.urlScreen.push({
        name: name,
        url: url
      });
      if(url.substring(url.length -1) == '/') {
        configJson.virtualApps.push({
          name: name,
          baseURL: 'http://' + url,
          connectStringRead: stringRead,
          connectStringUpdate: stringUpdate,
          connectStringReport: stringReport,
          defaultFromAddress: address,
          defaultPublisher: publisher,
          popAccountName: accountName,
        });
      }
      else {
        configJson.virtualApps.push({
          name: name,
          baseURL: 'http://' + url + '/',
          connectStringRead: stringRead,
          connectStringUpdate: stringUpdate,
          connectStringReport: stringReport,
          defaultFromAddress: address,
          defaultPublisher: publisher,
          popAccountName: accountName,
        });
      }
      await fs.writeFileSync('./configs.json', JSON.stringify(configJson, null, 4)); // The 4 parameter signifys 4 white spaces
      res.send({'msg':'Success'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/deleteItem',
  async (req, res) => {
    const { name } = req.body;
    try {
      const selItem1 = configJson.virtualApps.findIndex(x => x.name === name);
      if (selItem1 !== undefined) configJson.virtualApps.splice(selItem1, 1);

      const selItem2 = configJson.urlScreen.findIndex(x => x.name === name);
      if (selItem2 !== undefined) configJson.urlScreen.splice(selItem2, 1);

      await fs.writeFileSync('./configs.json', JSON.stringify(configJson, null, 4));
      res.send({'msg':'Success'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.post(
  '/getInfoById',
  async (req, res) => {
    const { name } = req.body;
    try {
      console.log('--name', name);
      const selItem = configJson.virtualApps.find(x => x.name == name);
      res.send({'selItem': selItem});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.get(
  '/newCreateJSON',
  async (req, res) => {
    try {
      for(var i = 0; i < configJson.urlScreen.length; i++) {
        delete configJson.urlScreen[i].id;
      }
      for(var i = 0; i < configJson.virtualApps.length; i++) {
        delete configJson.virtualApps[i].id;
      }
      await fs.writeFileSync('./newConfigs.json', JSON.stringify(configJson, null, 4)); // The 4 parameter signifys 4 white spaces
      res.send({'msg':'Success'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
