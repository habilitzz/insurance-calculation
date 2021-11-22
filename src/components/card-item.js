import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Card, 
  CardImage, 
  CardImageWrapper, 
  Hover, 
  CardContentWrapper, 
  CloseButton, 
  DonateName,
  DonateOption} from '../components/styles/card-style';
import { httpHeader } from '../helper/helpers';

class CardItem extends Component {

  constructor(props) {
    super();

    this.state = {
      isShowOverlay: false,
    };
  }

  handleAmount(key, amount) {
    const selectedDonation = key + '_' + amount;
    this.props.dispatch({
      type: 'UPDATE_SELECTED_DONATION',
      selectedDonation,
    });
  }

  handlePay(id, currency) {
    const self = this;
    const { charity : {selectedDonation} } = this.props;
    const selectedDonationItem = selectedDonation.split('_');
    const amount = parseInt(selectedDonationItem[1]);
    const selectedDonationId = selectedDonationItem[0];
  
    if(id.toString() !== selectedDonationId) {
      this.props.dispatch({
        type: 'UPDATE_WARNING',
        warningMessage: 'Select Wrong Item!',
      });

      setTimeout(function() {
        self.props.dispatch({
          type: 'UPDATE_WARNING',
          warningMessage: '',
        });
      }, 2000);
      return;
    }
    
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      headers: httpHeader,
      body: JSON.stringify({
        charitiesId: selectedDonationId,
        amount,
        currency
      })
    })
      .then(function(resp) { 
        return resp.json(); })
      .then(function() {
        
        self.props.dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount,
        });

        self.props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: `Thanks for donate ${amount}!`,
        });
  
        setTimeout(function() {
          self.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message: '',
          });
        }, 2000);
      });
    
  }

  showDonatePayment = (isOpen) => {
    this.setState({isShowOverlay: isOpen})
  }

  render() {
    const {index, item} = this.props;
    const { isShowOverlay } = this.state;
    const payments = [10, 20, 50, 100, 500].map((amount, j) => (
      <Form.Check
        inline
        label={amount}
        type="radio"
        name="payment"
        onClick={() => this.handleAmount(item.id, amount)}
        key={j}
      />
    ));

    return (
      <Card key={index}>
        <CardContentWrapper>
          <CardImageWrapper>
            <CardImage  src={`/images/${item.image}`} />
          </CardImageWrapper>
          <DonateName>
            <p className="name">{item.name}</p>
            <div className="donate-btn"><Button variant="outline-primary" onClick={() => this.showDonatePayment(true)}>Donate</Button></div>
          </DonateName>
        </CardContentWrapper>
        {
          isShowOverlay === true && 
          <Hover>
            <CloseButton 
              onClick={() => this.showDonatePayment(false)} 
              type="button" 
              class="close" 
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </CloseButton>
            <DonateOption>
              <div>{payments}</div>
              <Button variant="outline-primary" onClick={() => this.handlePay(item.id, item.currency)}>Pay</Button>
            </DonateOption>
        </Hover>
        }
      </Card>
    );
  };
  
};

const mapStateToProps = (state) => {
  return {
    charity : state
  }
}

export default connect(mapStateToProps)(CardItem);