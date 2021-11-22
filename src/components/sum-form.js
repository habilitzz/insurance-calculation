import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Row, Col} from 'react-bootstrap';
import { isEmpty } from 'lodash';
import Calendar from 'react-calendar';
import { httpHeader } from '../helper/helpers';

class SumForm extends Component {

  constructor(props) {
    super();
    this.state = {
      isShowOverlay: false,
      selectedDate: new Date(),
      firstName: null,
      lastName: null,
      sex: 'FEMALE',
      plan: 'T11A20',
      frequency: 'YEARLY',
      planPrice: null,
      isSubmited: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({isSubmited : true});
    const { sex, plan, frequency, planPrice } = this.state;

    if(isEmpty(sex) || isEmpty(plan) || isEmpty(frequency) || isEmpty(planPrice)) {
      this.displayErrorMessage();
      return;
    }

    const formValue = this.getFormValue();
    this.getProducts(formValue);
  }

  getProducts = (formValue) => {
    const self = this;
    this.props.dispatch({
      type: 'UPDATE_ISLOADING',
    });
    
    fetch('http://localhost:3002/products', {
      method: 'POST',
      headers: httpHeader,
      body: JSON.stringify(formValue)
    }).then(function(resp) { 
      return resp.json(); 
    }).then(function(data) {
      self.props.dispatch({
        type: 'UPDATE_PRODUCT',
        products: data || [],
      });
    });
  }

  displayErrorMessage = () => {
    const self = this;
    this.props.dispatch({
      type: 'UPDATE_MESSAGE',
      message: `Please fill out form data`,
    });

    setTimeout(function() {
      self.props.dispatch({
        type: 'UPDATE_MESSAGE',
        message: '',
      });
    }, 2000);
  }

  getFormValue = () =>{
    const { selectedDate, 
      lastName, 
      firstName, 
      sex, 
      plan, 
      frequency, 
      planPrice } = this.state;
    return {
      firstName,
      lastName,
      genderCd: sex, 
      dob: this.convertDateFormat(selectedDate), 
      planCode: plan, 
      premiumPerYear: parseInt(planPrice), 
      paymentFrequency: frequency
    }
  }

  convertDateFormat = (date) => {
    const newFormat =  date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
    return newFormat;
  }

  onChange = (val) => {
    this.setState({selectedDate : val})
  }

  setFormValue = (key, value) => {
    this.setState({[key]: value});
  }

  render() {
    const {index, item} = this.props;
    const { isShowOverlay, selectedDate, firstName, sex, plan, frequency, planPrice, isSubmited } = this.state;

    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Row>
            <Col>
              <Form.Label className="label-form">Firstname</Form.Label>
              <Form.Control type="text" placeholder="First Name" onChange={(e) => this.setFormValue('firstName', e.target.value)} />
            </Col>
            <Col>
              <Form.Label className="label-form">Lastname</Form.Label>
              <Form.Control type="text" placeholder="Last Name" onChange={(e) => this.setFormValue('lastName', e.target.value)} />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFrequency">
          <Row>
            <Col>
              <Form.Label className="label-form">Plan</Form.Label>
              <Form.Select
                onChange={(e) => this.setFormValue('plan',  e.target.value)}
              aria-label="Insurance Plan">
                <option>Open this select insurance plan</option>
                <option defaultValue="selected" value="T11A20">Package 1 (benefit 200k)</option>
                <option value="T11A50">Package 2 (benefit 500k)</option>
                <option value="T11AM1">Package 3 (benefit 1M)</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label className="label-form" >Payment Frequency</Form.Label>
              <Form.Select 
                isInvalid={ frequency === '' }
                aria-label="Payment Frequency" 
                onChange={(e) => this.setFormValue('frequency',  e.target.value)}>
                <option>Payment Frequency</option>
                <option defaultValue="selected" value="YEARLY">YEARLY</option>
                <option value="HALFYEARLY">HALFYEARLY</option>
                <option value="QUARTERLY">QUARTERLY</option>
                <option value="MONTHLY">MONTHLY</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label className="label-form">Premium Per Year</Form.Label>
              <Form.Control 
                min="1"
                isInvalid={ planPrice === null && isSubmited === true  }
                onChange={(e) => this.setFormValue('planPrice',  e.target.value)}
                type="number" 
                onKeyUp={(e) => e.target.value < 0 ? e.target.value = e.target.value * -1 : e.target.value}
                placeholder="Premium Per Year" 
              />
            </Col>
          </Row>
        </Form.Group>


      <Row>
        <Col>
          <Form.Label className="label-form">Sex</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Check
            inline
            selected="selected"
            label="Female"
            checked={sex === "FEMALE"}
            name="group1"
            type="radio"
            onChange={(e) => this.setFormValue('sex',  'FEMALE')}
            id={`inline-f`}
          />
          <Form.Check
            inline
            label="Male"
            checked={sex === "MALE"}
            defaultValue={'MALE'}
            name="group1"
            type="radio"
            onChange={(e) => this.setFormValue('sex',  'MALE')}
            id={`inline-m`}
          />
        </Col>
        <Col>
          <Calendar
            onChange={(val) => this.onChange(val)}
            value={selectedDate}
          />
        </Col>
      </Row>

      <Row>
        <Col>
        <Button variant="primary" type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
        </Col>
      </Row>
      
    </Form>
    );
  };
  
};

const mapStateToProps = (state) => {
  return {
    charity : state
  }
}

export default connect(mapStateToProps)(SumForm);