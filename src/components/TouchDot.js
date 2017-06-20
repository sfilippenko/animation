import React from 'react';
require('../../styles/touchDot.scss');
import GeneralSettings from '../constants/GeneralSettings';
import {connect} from 'react-redux';

@connect(
    (state) => {
        return {
            touch: state.road.touch,
            bumpCoordinates: state.road.bumpCoordinates
        }
    }
)

export default class TouchDot extends React.Component {

    render() {
        const {touch, bumpCoordinates} = this.props;
        const display = touch ? 'block' : 'none';
        const width = GeneralSettings.bumpDotSize;
        const height = width;
        const bottom = bumpCoordinates.bottom - height / 2;
        const left = bumpCoordinates.left - width / 2;

        return <div
            className='touchDot'
            style={{display, width, height, left, bottom}}
        />
    }
}