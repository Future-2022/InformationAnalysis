const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../../configs.json');
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
      const id = configJson.urlScreen.length + 1;
      configJson.urlScreen.push({
          'id': id,
          'name': name,
          'url': url
      }); 
      configJson.virtualApps.push({
        'id': id,
        'name': name,
        'baseURL': 'http://' + url,
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
    const {id, name, url, address, stringRead, stringUpdate,
          stringReport, publisher, accountName} = req.body;
          
    try {
      console.log(req.body);

      const index = configJson.virtualApps.findIndex(x => x.id == id);
      configJson.urlScreen.splice(index, 1, {
        id: id,
        name: name,
        url: url
      });
      configJson.virtualApps.splice(index, 1, {
        id: id,
        name: name,
        baseURL: 'http://' + url,
        connectStringRead: stringRead,
        connectStringUpdate: stringUpdate,
        connectStringReport: stringReport,
        defaultFromAddress: address,
        defaultPublisher: publisher,
        popAccountName: accountName,
      });
      
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
    const { id } = req.body;
    try {
      console.log('--id', id);
      const selectItem1 = configJson.virtualApps.findIndex(x => x.id === id);
      if (selectItem1 !== undefined) configJson.virtualApps.splice(selectItem1, 1);

      const selectItem2 = configJson.urlScreen.findIndex(x => x.id === id);
      if (selectItem2 !== undefined) configJson.urlScreen.splice(selectItem2, 1);
      console.log(selectItem1);
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
    const { id } = req.body;
    try {
      console.log('--id', id);
      const selectItem = configJson.virtualApps.find(x => x.id == id);
      res.send({'selectItem': selectItem});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;