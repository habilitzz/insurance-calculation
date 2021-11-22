const express  = require('express');
const _ = require('lodash');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(express.json());

app.post('/users', (req, res) => {
  console.log('req');
  console.log(req.body);
  const name = req?.body?.name || 'testddd';
  const payload ={
    name
  };
  console.log(
    'payload',payload);
  axios.post('http://localhost:3001/users' , payload).then(usrRes => {
    console.log('usrRes');
    console.log(usrRes.data);
    res.send(usrRes.data);
  }).catch(err => {
    console.log(err); 
  });
})

app.post('/payments', (req, res) => {
  console.log('----payments payment req----');
  console.log(req.body);
  const charitiesId = req?.body?.charitiesId || 'testddd';
  console.log('charitiesId : ' + charitiesId);
  const payload ={
    charitiesId,
  };
  console.log(
    'payload',payload);
  axios.post('http://localhost:3001/payments' , payload).then(usrRes => {
    console.log('usrRes');
    console.log(usrRes.data);
    res.send(usrRes.data);
  }).catch(err => {
    console.log(err); 
  });
})

app.post('/products', (req, res) => {
  const payload = req.body;
  const firstname = _.get(req, ['body', 'firstName'], '-') || '-';
  const lastname = _.get(req, ['body', 'lastName'], '-') || '-';
  console.log('payload', payload)

  console.log('lastname : ' + lastname);
  axios.post('https://api.fwd.co.th/dev-ecommerce/getProduct' , payload).then(productRes => {
    const { quotationProductList, modalRatesList } = productRes.data
    let priceList = {};
    _.map(modalRatesList, (modal) => {
      priceList[modal.paymentFrequencyCd] = {
        modalPremium: modal.modalPremium,
        annualizedModalPremium: modal.annualizedModalPremium
      }
      return {
        [modal.paymentFrequencyCd]:{
          modalPremium: modal.modalPremium,
          annualizedModalPremium: modal.annualizedModalPremium
        }
      }
    })

    let quotationList = [];
    if(quotationProductList.length > 0) {
      
      quotationList = quotationProductList.map((quotation) => {
        const userProduct = {
          firstname,
          lastname,
          productId: quotation.productId
        }

        console.log('userProduct');
        console.log(userProduct);
        
        axios.post('http://localhost:3001/userproducts' , userProduct).then(usrRes => {
          console.log('usrRes');
          console.log(usrRes.data);
          // res.status(200).json(usrRes.data);
          //res.send(usrRes.data);
        }).catch(err => {
          console.log(err); 
        });
        return {
          ...quotation,
          priceProgram: priceList
        }
      });
    }
    
    console.log('quotationList');
    console.log(quotationList);
    res.status(200).json(quotationList);
    // res.send(quotationList);
  }).catch(err => {
    console.log(err); 
    res.status(500).json(err);
  });
})

app.listen('3002', () => {
  console.log('server is running on port 3002')
})

