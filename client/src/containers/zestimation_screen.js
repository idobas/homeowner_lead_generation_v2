import React, {Component} from 'react';
import {connect} from 'react-redux';
import './zestimation_screen.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


class ZestimationScreen extends Component {
    render() {
        const {zestimate, address} = this.props;
        const errorMessage = 'Sorry, could not calculate zestimate for this address :)';
        return (
            <div className='zestimate'>
                <h4>Here is your zestimate for the address:</h4>
                <h3>{address}</h3>
                <h2 className={zestimate === errorMessage ? 'errorMessage' : 'money'}>{`${zestimate} ${zestimate === errorMessage ? '' : '$'}`}</h2>
                <Link to='/address' className='back'>
                    <Button variant="contained" color="secondary" type="submit">Back</Button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        zestimate: state.addresses.zestimate,
        address: state.addresses.address
    }
}

export default connect(mapStateToProps)(ZestimationScreen);