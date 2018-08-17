import React, {Component} from 'react';
import AddressScreenForm from '../containers/address_screen_form';

export default class AddressScreen extends Component {
    render() {
        return (
            <div>
                <h4 style={{marginLeft: '50px'}}>What is the address you are looking for?</h4>
                <AddressScreenForm/>
            </div>
        )
    }
}