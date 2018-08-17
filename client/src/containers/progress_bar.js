import React from 'react';
import { LinearProgress } from '@material-ui/core';
import {connect} from 'react-redux';
import './progress_bar.css';

function ProgressBar({ progress }) {
    return (
        <div className='progressBar'>
            <span className='progressTitle'>Your progress:</span>
            <LinearProgress variant="determinate" value={progress}/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        progress: state.progressBar.progress
    }
}

export default connect(mapStateToProps)(ProgressBar);