import React from 'react';
require('../../styles/ball.scss');
import ball from '../../images/ball.png';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setBallBottomPosition, setBallRotateAngle} from '../actions/ball';
import GeneralSettings from '../constants/GeneralSettings';

@connect(
    (state) => {
        let {bottom, rotateAngle} = state.ball;
        return {
            bottom,
            rotateAngle,
            touch: state.road.touch
        }
    },
    (dispatch) => {
        return {
            setBallBottomPosition: bindActionCreators(setBallBottomPosition, dispatch),
            setBallRotateAngle: bindActionCreators(setBallRotateAngle, dispatch)
        }
    }
)

export default class Ball extends React.Component {
    constructor(props) {
        super(props);
        this.pressTimeArr = [];
        this.rotateInterval = null;
    }

    animationJump = (animationTime, jumpHeight) => {
        const {setBallBottomPosition} = this.props;
        const constGravity = 4 * jumpHeight / (animationTime * animationTime);
        const speed = constGravity * animationTime;
        const timeInterval = 10;
        let time = 0;
        let bottomCoordinate = 0;
        const interval = setInterval(() => {
            bottomCoordinate = GeneralSettings.gravityFunction(speed, time, constGravity);
            time += timeInterval;
            if (this.props.touch) {
                setBallBottomPosition(this.props.bottom);
                clearInterval(interval);
            } else if (bottomCoordinate < 0) {
                setBallBottomPosition(GeneralSettings.bottomBallPosition);
                clearInterval(interval);
            } else {
                setBallBottomPosition(GeneralSettings.bottomBallPosition + bottomCoordinate);
            }
        }, timeInterval);
    };

    animationRotate = () => {
        const {setBallRotateAngle, roadSpeed = 3} = this.props;
        const angleAdd = GeneralSettings.rotateCoef * roadSpeed;
        let angle = 0;
        this.rotateInterval = setInterval(() => {
            if (this.props.touch) {
                clearInterval(this.rotateInterval);
                this.rotateInterval = null;
            } else {
                if (angle === Math.PI) angle = 0;
                setBallRotateAngle(angle);
                angle += angleAdd;
            }
        }, GeneralSettings.rotateBallTimeInterval)
    };

    keydownEventListener = (event) => {
        const {animationTime, jumpHeight} = this.props;
        if (event.keyCode === 32) {
            this.pressTimeArr.push(Date.now());
            let pressTimeArr = this.pressTimeArr;
            if (pressTimeArr.length === 1) {
                this.animationJump(animationTime, jumpHeight);
            } else if (pressTimeArr.length > 1) {
                const last = pressTimeArr[pressTimeArr.length - 1];
                const prevLast = pressTimeArr[pressTimeArr.length - 2];
                const dif = last - prevLast;
                if (dif < animationTime) {
                    pressTimeArr.pop();
                    return null;
                } else {
                    this.animationJump(animationTime, jumpHeight);
                }
            }
        }
    };

    componentWillMount() {
        window.addEventListener('keydown', this.keydownEventListener);
        this.animationRotate();
    }

    componentWillReceiveProps(newProps) {
        if (!this.rotateInterval && !newProps.touch) {
            this.animationRotate();
            window.removeEventListener('keydown', this.keydownEventListener);
            window.addEventListener('keydown', this.keydownEventListener);
        }
    }

    render() {
        const {bottom, rotateAngle} = this.props;
        const {windowWidth} = this.props;
        const ballSize = GeneralSettings.ballSize;
        const left = (windowWidth - ballSize) / 2;
        return <img
            id='ball'
            src={ball}
            style={{
                width: ballSize,
                left,
                bottom,
                transform: `rotate(${rotateAngle}rad)`
            }}
        />
    }
}