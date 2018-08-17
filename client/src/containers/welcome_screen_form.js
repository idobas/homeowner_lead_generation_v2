import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import {saveUserdetails} from '../actions/index';
import './welcome_screen_form.css';
import {withRouter} from 'react-router-dom';



const validate = values => {
    const errors = {};
    const requiredFields = [ 'firstName', 'lastName', 'email'];
    requiredFields.forEach(field => {
      if (!values[ field ]) {
        errors[ field ] = 'Required';
      }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }

const renderTextField = ({ inputType, text, input, label, meta: { touched, error }, ...custom }) => (
    <TextField
        label={text}
        helperText={touched && error}
        error={touched && error ? true : false}
        {...input}
        {...custom}
        InputProps= {{
            inputComponent: inputType === 'phone' ? NumberFormatCustom : null
        }}
    />
)

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        ref={inputRef}
        format="+1 (###) ###-####" 
        mask="_"
      />
    );
  }

class WelcomeScreenForm extends Component {
  constructor(props) {
    super(props);
    this.dispatchSubmit = this.dispatchSubmit.bind(this);
  }

  dispatchSubmit(data, dispatch) {
    dispatch(saveUserdetails(data));
    this.props.history.push('/address');
  }

  render() {
    const { handleSubmit, dispatch } = this.props;
    return (
      <form className="welcomeScreenForm" onSubmit={handleSubmit(data => this.dispatchSubmit(data, dispatch))}>
        <div className="textField">
            <Field name="firstName" component={renderTextField} props={{text: 'First Name'}} type="text"/>
        </div>
        <div className="textField">
            <Field name="lastName" component={renderTextField} props={{text: 'Last Name'}} type="text"/>
        </div>
        <div className="textField">
            <Field name="email" component={renderTextField} props={{text: 'Email'}} type="email"/>
        </div>
        <div className="textField">
            <Field name="phone" component={renderTextField} props={{text: 'Phone Number', inputType: 'phone'}} type="text"/>
        </div>
        <div className="submitButton">
            <Button variant="contained" color="primary" type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

// Decorate the form component
WelcomeScreenForm = reduxForm({
  form: 'welcomeScreenForm', // a unique name for this form
  validate 
})(WelcomeScreenForm);

export default withRouter(WelcomeScreenForm);

