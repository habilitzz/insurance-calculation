import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Container, Card, Spinner } from 'react-bootstrap';
import { get } from 'lodash';
import SumForm from './components/sum-form/sum-form';
import { Header } from './components/styles/template';
import { getPlanName, getPaymentFrequency } from './shared/index'; 



export default connect((state) => state)(
  class App extends Component {
    constructor(props) {
      super();

      this.state = {
        charities: [],
      };
    }

    renderAlert = (msg) => {
      if (msg !== '') {
        return (<Alert variant='danger'> {msg} </Alert>)
      } 

      return null;
    }

    displayProduct = () => {
      const isShowloading = get(this.props, ['productReducer', 'isShowloading']) || false;
      const products = get(this.props, ['productReducer', 'products']) || [];

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
                <div>?????????????????????  : {getPaymentFrequency(item.paymentFrequencyCd)}</div>
                {
                  yearModalPremium !== 0 && <div>????????????????????????????????????  : {yearModalPremium}/{yearAnnualizedModalPremium}</div>
                }
                {
                  halfyearModalPremium !== 0 && <div>??????????????????????????????????????????????????? : {halfyearModalPremium}/{halfyearAnnualizedModalPremium}</div>
                }
                {
                  quarModalPremium !== 0 && <div>?????????????????????????????? 3 ???????????????  : {getPaymentFrequency(item.paymentFrequencyCd)}/{quarAnnualizedModalPremium}</div>
                }
                {
                  monthModalPremium !== 0 && <div>????????????????????????????????????????????? : {monthModalPremium}/{monthAnnualizedModalPremium}</div>
                }
              </Card.Text>
            </Card.Body>
          </Card>
        )});
        return (productCards)
      }
    }


    render() {
      const message = get(this.props, ['commonReducer', 'message']) || '';
      console.log('message',message);
      const isShowloading = get(this.props, ['productReducer', 'isShowloading']) || false;
      // const {productReducer : {isShowloading}} = this.props;

      return (
        <div>
          {this.renderAlert(message)}
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
