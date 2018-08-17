import React, {Component} from 'react';
import WelcomeScreenForm from '../containers/welcome_screen_form';
import './welcome_screen.css';
import {withRouter} from 'react-router-dom';
import {changeProgressBarProgress} from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class WelcomeScreen extends Component {
    componentWillMount() {
        const {changeProgressBarProgress, history} = this.props;
        this.props.history.listen(() => {
            changeProgressBarProgress(history.location.pathname);
        });
    }

    render() {
        return (
            <div>
                <p>Please provide the following details to start the journey to your new home:</p>
                <WelcomeScreenForm/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({changeProgressBarProgress}, dispatch);
}

WelcomeScreen = withRouter(WelcomeScreen);

export default connect(null, mapDispatchToProps)(WelcomeScreen);