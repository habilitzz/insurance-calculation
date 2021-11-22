"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const _ = require('lodash');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello');
});
app.post('/products', (req, res) => {
    const payload = req.body;
    const firstname = _.get(req, ['body', 'firstName'], '-') || '-';
    const lastname = _.get(req, ['body', 'lastName'], '-') || '-';
    console.log('payload', payload);
    // console.log('lastname : ' + lastname);
    axios.post('https://api.fwd.co.th/dev-ecommerce/getProduct', payload).then((productRes) => {
        const { quotationProductList, modalRatesList } = productRes.data;
        let priceList = {};
        _.map(modalRatesList, (modal) => {
            priceList[modal.paymentFrequencyCd] = {
                modalPremium: modal.modalPremium,
                annualizedModalPremium: modal.annualizedModalPremium
            };
        });
        let quotationList = [];
        if (quotationProductList.length > 0) {
            quotationList = quotationProductList.map((quotation) => {
                const userProduct = {
                    firstname,
                    lastname,
                    productId: quotation.productId
                };
                console.log('userProduct');
                console.log(userProduct);
                axios.post('http://localhost:3001/userproducts', userProduct).then((usrRes) => {
                }).catch((err) => {
                    console.log(err);
                });
                return Object.assign(Object.assign({}, quotation), { priceProgram: priceList });
            });
        }
        console.log('quotationList');
        console.log(quotationList);
        res.status(200).json(quotationList);
        // res.send(quotationList);
        //   res.send(quotationList)
        //   res.setHeader('Content-Type', 'application/json');
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
app.listen(3002, () => console.log('App is running'));
