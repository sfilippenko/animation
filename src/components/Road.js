import React from 'react';
import TouchDot from './TouchDot';
require('../../styles/road.scss');
import GeneralSettings from '../constants/GeneralSettings';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setRoadContainerLeft, changeBlockOptionsArr, ballTouchBlock, rememberBumpCoordinates} from '../actions/road';
import {setCountDown, setNewGame} from '../actions/common';

@connect(
    (state) => {
        const {roadContainerLeft, blockOptionsArr, touch} = state.road;
        return {
            roadContainerLeft,
            blockOptionsArr,
            touch,
            ballBottom: state.ball.bottom,
            countDown: state.common.countDown,
            newGame: state.common.newGame,
        }
    },
    (dispatch) => {
        return {
            setRoadContainerLeft: bindActionCreators(setRoadContainerLeft, dispatch),
            changeBlockOptionsArr: bindActionCreators(changeBlockOptionsArr, dispatch),
            ballTouchBlock: bindActionCreators(ballTouchBlock, dispatch),
            setCountDown: bindActionCreators(setCountDown, dispatch),
            setNewGame: bindActionCreators(setNewGame, dispatch),
            rememberBumpCoordinates: bindActionCreators(rememberBumpCoordinates, dispatch)
        }
    }
)

export default class Road extends React.Component {

    roadAnimation = () => {
        const {speed, minBlockHeight = 30, setRoadContainerLeft, blockWidth = 30,
            changeBlockOptionsArr, ballTouchBlock, blockDensity, rememberBumpCoordinates
        } = this.props;
        const ballDiameter = GeneralSettings.ballSize;
        const ballRadius = ballDiameter / 2;
        const blockDensityDif = blockWidth + ballDiameter * (1 + 2 / blockDensity);
        let blockOptionsArr = [];

        //Движение дороги
        this.roadInterval = setInterval(() => {
            const {windowWidth, roadContainerLeft} = this.props;
            if (blockOptionsArr.length) {

                //Координата Х левого края мяча
                const ballLeft = (windowWidth - ballDiameter) / 2;
                //Координата Х центра мяча
                const ballCenterX = ballLeft + ballRadius;
                blockOptionsArr.forEach((option) => {

                    //Координата У центра мяча
                    const ballCenterY = this.props.ballBottom + ballRadius;

                    //Координаты блока
                    const blockTop = option.top;
                    const blockLeft = option.left;
                    const relativeBlockLeft = roadContainerLeft + blockLeft;
                    const relativeBlockRight = relativeBlockLeft + blockWidth;
                    const relativeBlockTop = GeneralSettings.roadHeight - blockTop;

                    /**
                     * 3 условия столконовения
                     * слева (либо мяч больше блока, либо наооборот)
                     * сверху
                     * справа об угол
                     */
                    //Мяч ударился слева о блок
                    if (ballCenterX < relativeBlockLeft) {

                        //Центр мяча ниже верхенего уровня блока
                        if (ballCenterY < relativeBlockTop) {

                            if (relativeBlockLeft - ballCenterX < ballRadius) {
                                ballTouchBlock(true);
                                rememberBumpCoordinates({
                                    left: relativeBlockLeft,
                                    bottom: ballCenterY
                                });
                            }
                            //Центр мяча выше верхнего уровня блока
                        } else {
                            if (Math.pow(ballCenterY - relativeBlockTop, 2) + Math.pow(relativeBlockLeft - ballCenterX, 2) < Math.pow(ballRadius, 2)) {
                                ballTouchBlock(true);
                                rememberBumpCoordinates({
                                    left: relativeBlockLeft,
                                    bottom: relativeBlockTop
                                });
                            }
                        }
                        //Мяч ударился слева о верхюю грань блока
                    } else if (ballCenterX > relativeBlockLeft && ballCenterX < relativeBlockRight) {
                        if (ballCenterY - relativeBlockTop < ballRadius) {
                            ballTouchBlock(true);
                            rememberBumpCoordinates({
                                left: ballCenterX,
                                bottom: relativeBlockTop
                            });
                        }
                        //Мяч ударился слева о правый угол верхней грани
                    } else if (ballCenterX > relativeBlockRight) {

                        if (Math.pow(ballCenterY - relativeBlockTop, 2) + Math.pow(relativeBlockRight - ballCenterX, 2) < Math.pow(ballRadius, 2)) {
                            ballTouchBlock(true);
                            rememberBumpCoordinates({
                                left: relativeBlockRight,
                                bottom: relativeBlockTop
                            });
                        }
                    }
                });
            }
            if (this.props.touch) {
                clearInterval(this.roadInterval);
                this.roadInterval = null;
            } else {
                setRoadContainerLeft(roadContainerLeft - speed);
            }
        }, GeneralSettings.roadTimeInterval);
        //Появление преград
        this.blockInterval = setInterval(() => {
            const blockOptions = {};
            const {windowWidth, roadContainerLeft} = this.props;
            blockOptions.left = -roadContainerLeft + windowWidth + Math.random() * 1000;
            blockOptionsArr.push(blockOptions);
            const blockHeight = minBlockHeight + (Math.random() < 0.5 ? 0 : minBlockHeight);
            const arrLength = blockOptionsArr.length;
            if (arrLength > 1) {
                let dif = blockOptionsArr[arrLength - 1].left - blockOptionsArr[arrLength - 2].left;
                //Удаление слишком близко находящйся преграды
                if (dif < blockDensityDif) {
                    blockOptionsArr.pop();
                } else {
                    blockOptions.width = blockWidth;
                    blockOptions.height = blockHeight;
                    blockOptions.top = -blockHeight;
                    changeBlockOptionsArr(blockOptionsArr);
                }
            } else {
                blockOptions.width = blockWidth;
                blockOptions.height = blockHeight;
                blockOptions.top = -blockHeight;
                changeBlockOptionsArr(blockOptionsArr);
            }
            //Обрезка слишком большого массива для ускорения вычислений
            if (arrLength > 15) {
                blockOptionsArr.splice(0, 10);
            }
            if (this.props.touch) {
                clearInterval(this.blockInterval);
                this.blockInterval = null;
            }
        }, 500);
    };

    countDownAnimation = () => {
        const {setCountDown} = this.props;
        let iteration = 0;
        let interval = 100;
        let countDown = 3;
        const countDownInterval = setInterval(() => {
            iteration++;
            const amount = 1000 * (GeneralSettings.startCount - countDown + 1) / interval;
            if (iteration === amount - 1) {
                setCountDown(-1);
            } else if (iteration === amount) {
                countDown -= 1;
                setCountDown(countDown);
                if (countDown === 0) {
                    this.roadAnimation();
                    clearInterval(countDownInterval);
                    setCountDown(0);
                }
            }
        }, interval);
    };

    componentWillReceiveProps(newProps) {
        if (newProps.newGame && !this.roadInterval && !this.blockInterval) {
            this.props.setNewGame(false);
            this.props.setCountDown(GeneralSettings.startCount);
            this.countDownAnimation();
        }
    }

    render() {
        const {roadContainerLeft, blockOptionsArr, countDown, windowWidth} = this.props;
        const size = GeneralSettings.countDownContainerWidth;
        return(
            <div
                className='road-container'
                style={{
                    left: roadContainerLeft,
                    height: GeneralSettings.roadHeight
                }}
            >
                <div className='score'>Счет: {-roadContainerLeft}</div>
                {
                    countDown !== 0 &&
                    <div
                        className='countDown'
                        style={{
                            display: countDown === -1 ? 'none' : 'block',
                            width: size,
                            left: `${(windowWidth - size) / 2}px`
                        }}
                    >
                        {countDown}
                    </div>
                }
                <TouchDot/>
                <div className='road'>
                    {
                        blockOptionsArr.map((item, index) => {
                            const {left, top, height, width} = item;
                            return(
                                <div
                                    className='block'
                                    key={index}
                                    style={{left, top, height, width}}
                                ></div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}