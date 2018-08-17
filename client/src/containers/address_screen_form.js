import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import LocationSearchInput from '../components/places_autocomplete';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import './addresses_screen.css';
import {getZestimate} from '../actions/index';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

class AddressScreenForm extends Component {
    dispatchSubmit() {
        const { dispatch, address, getZestimate, history } = this.props;
        dispatch(getZestimate(address));
        history.push('/zestimate');
    }

    render() {
        const { handleSubmit, isAddressValid} = this.props;
        return (
            <form className="welcomeScreenForm" onSubmit={handleSubmit(() => this.dispatchSubmit())}>
                <div className="addressInput">
                    <Field name="address" component={LocationSearchInput} props={{text: 'Address'}} type="text"/>
                </div>
                <div className="submitButton">
                    <Button disabled={!isAddressValid} variant="contained" color="primary" type="submit">Check Zestimate!</Button>
                </div>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAddressValid: state.addresses.isInMaps,
        address: state.addresses.address
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getZestimate}, dispatch);
  }

AddressScreenForm = reduxForm({
    form: 'addressScreenForm'
})(connect(mapStateToProps, mapDispatchToProps)(AddressScreenForm));

export default withRouter(AddressScreenForm);