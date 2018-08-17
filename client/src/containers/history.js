import React, {Component} from 'react';
import {connect} from 'react-redux';
import './history.css';

class History extends Component {
    renderAddress(address) {
        return (
            <li key={address}>{address}</li>
        )
    }

    render() {
        return (
            <div>
                <h4>Your search history:</h4>
                <div className='historyList'>
                    <ol>
                        {this.props.history.map(this.renderAddress)}
                    </ol>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        history: state.addresses.history
    }
}

export default connect(mapStateToProps)(History);