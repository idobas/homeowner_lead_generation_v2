import React, {Component} from 'react';
import {connect} from 'react-redux';
import './history.css';
import {withRouter} from 'react-router-dom';

class History extends Component {
    renderAddress(address) {
        return (
            <li key={`${address}${Math.random()}`}>{address}</li>
        )
    }

    render() {
        const {pathname} = this.props.location;
        if (pathname !== '/') {
            return (
                pathname !== '/' &&             
                <div>
                    <h4 className='historyTitle'>Your search history:</h4>
                    <div className='historyList'>
                        <ol>
                            {this.props.history.map(this.renderAddress)}
                        </ol>
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

function mapStateToProps(state) {
    return {
        history: state.addresses.history
    }
}

History = connect(mapStateToProps)(History);

export default withRouter(History);