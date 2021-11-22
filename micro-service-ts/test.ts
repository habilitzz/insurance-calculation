import {Request, Response, Application, ErrorRequestHandler} from 'express';
const express  = require('express');
const _ = require('lodash');
const axios = require('axios');

const app: Application = express();
const cors = require('cors');
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(express.json());

interface PriceProgram {
    paymentFrequencyCd: string;
    modalPremium: number;
    annualizedModalPremium?: number;
}

interface UserProduct {
    firstname: string;
    lastname: string;
    productId: string;
}


interface PayPriceProgram {
    modalPremium: number;
    annualizedModalPremium?: number;
}

interface Quotation {
    productId: string;
    productTypeCd: string;
    productFamilyCd: string;
    baseSumAssured: number;
    baseAnnualPremium: number;
    productTerm: number;
    premiumPayingTerm: number;
    paymentFrequencyCd: string;
    planCode: string;
    selected: boolean;
    priceProgram: any;

}


app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
})


app.post('/products', (req: Request, res: Response) => {
    const payload = req.body;
    const firstname:string = _.get(req, ['body', 'firstName'], '-') || '-';
    const lastname:string = _.get(req, ['body', 'lastName'], '-') || '-';
    axios.post('https://api.fwd.co.th/dev-ecommerce/getProduct' , payload).then((productRes:any) => {
      const { quotationProductList, modalRatesList } = productRes.data
      let priceList:any = {};
      _.map(modalRatesList, (modal: PriceProgram) => {
        priceList[modal.paymentFrequencyCd] = {
          modalPremium: modal.modalPremium,
          annualizedModalPremium: modal.annualizedModalPremium
        }
      })
  
      let quotationList: Quotation[] = [];
      
      if(quotationProductList.length > 0) {
        
        quotationList = quotationProductList.map((quotation:Quotation) => {
          const userProduct:UserProduct = {
            firstname,
            lastname,
            productId: quotation.productId
          }
          
          axios.post('http://localhost:3001/userproducts' , userProduct).then((usrRes:any) => {
          }).catch((err:ErrorRequestHandler) => {
            console.log(err); 
          });
          return {
            ...quotation,
            priceProgram: priceList
          }
        });
      }
      
      res.status(200).json(quotationList);
    }).catch((err:ErrorRequestHandler) => {
      console.log(err); 
      res.status(500).json(err);
    });
  })

app.listen(3002, () => console.log('App is running on port 3002'));

