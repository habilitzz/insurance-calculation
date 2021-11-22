import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Container, Card, Spinner } from 'react-bootstrap';
import { get } from 'lodash';
import SumForm from './components/sum-form';
import { Header } from './components/styles/template';
import { getPlanName, getPaymentFrequency } from './shared/index'; 
import './style/common.css';


export default connect((state) => state)(
  class App extends Component {
    constructor(props) {
      super();

      this.state = {
        charities: [],
      };
    }

    renderAlert = (msg, warningMsg) => {
      if (msg !== '') {
        return (<Alert variant='danger'> {msg} </Alert>)
      } 

      return null;
    }

    displayProduct = (productCards) => {
      const {productReducer : {isShowloading, products}} = this.props;

      if(isShowloading === false) {
        if(products.length === 0) {
          return (<div>Product Not Found</div>)
        }
        const productCards = products.map((item, idx) => {
          const yearModalPremium = get(item, ['priceProgram', 'YEARLY', 'modalPremium'], 0);
          const halfyearModalPremium = get(item, ['priceProgram','HALFYEARLY', 'modalPremium'], 0);
          const quarModalPremium = get(item, ['priceProgram','QUARTERLY', 'modalPremium'], 0);
          const monthModalPremium = get(item, ['priceProgram','MONTHLY', 'modalPremium'], 0);
  
          const yearAnnualizedModalPremium = get(item, ['priceProgram','YEARLY', 'annualizedModalPremium'], 0);
          const halfyearAnnualizedModalPremium = get(item, ['priceProgram','HALFYEARLY', 'annualizedModalPremium'], 0);
          const monthAnnualizedModalPremium = get(item, ['priceProgram','MONTHLY', 'annualizedModalPremium'], 0);
          const quarAnnualizedModalPremium = get(item, ['priceProgram','QUARTERLY', 'annualizedModalPremium'], 0);
          
          return (
          <Card
            bg={'Dark'}
            key={idx}
            text={'dark'}
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header>Sum Insured</Card.Header>
            <Card.Body>
              <Card.Title> {getPlanName(item.planCode)} </Card.Title>
              <Card.Text>
                <div>Sum Insured  : {item.baseSumAssured || 0}</div>
                <div>งวดชำระ  : {getPaymentFrequency(item.paymentFrequencyCd)}</div>
                {
                  yearModalPremium !== 0 && <div>งวดชำระรายปี  : {yearModalPremium}/{yearAnnualizedModalPremium}</div>
                }
                {
                  halfyearModalPremium !== 0 && <div>งวดชำระรายครึ่งปี : {halfyearModalPremium}/{halfyearAnnualizedModalPremium}</div>
                }
                {
                  quarModalPremium !== 0 && <div>งวดชำระราย 3 เดือน  : {getPaymentFrequency(item.paymentFrequencyCd)}/{quarAnnualizedModalPremium}</div>
                }
                {
                  monthModalPremium !== 0 && <div>งวดชำระรายเดือน : {monthModalPremium}/{monthAnnualizedModalPremium}</div>
                }
              </Card.Text>
            </Card.Body>
          </Card>
        )});
        return (productCards)
      }
    }


    render() {
      const {commonReducer : {message, warningMessage}} = this.props;
      const {productReducer : {isShowloading}} = this.props;

      return (
        <div>
          {this.renderAlert(message, warningMessage)}
          <Header>FWD React</Header>
          <Container>
            <SumForm />
            <br/>
            {
              isShowloading === true && 
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            }
            {this.displayProduct()}
          </Container>
          
        </div>
      );
    }
  }
);
