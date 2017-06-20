import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ballTouchBlock, setRoadContainerLeft, changeBlockOptionsArr} from '../actions/road';
import {setBallBottomPosition} from '../actions/ball';
import {changeField, setNewGame} from '../actions/common';

require('../../styles/app.scss');

import React from 'react';
import Road from './Road';
import Ball from './Ball';
import NewGameDialog from './NewGameDialog';
import GeneralSettings from'../constants/GeneralSettings';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

@connect(
    (state) => {
        return {
            touch: state.road.touch,
            settings: state.common,
            newGame: state.common.newGame
        }
    },
    (dispatch) => {
        return {
            ballTouchBlock: bindActionCreators(ballTouchBlock, dispatch),
            setRoadContainerLeft: bindActionCreators(setRoadContainerLeft, dispatch),
            changeBlockOptionsArr: bindActionCreators(changeBlockOptionsArr, dispatch),
            setBallBottomPosition: bindActionCreators(setBallBottomPosition, dispatch),
            changeField: bindActionCreators(changeField, dispatch),
            setNewGame: bindActionCreators(setNewGame, dispatch),
        }
    }
)

export default class RootContainer extends React.Component {

    handleDialogClose = () => {
        this.setState({
            delayedTouch: false
        });
    };

    handleNewGame = () => {
        const {ballTouchBlock, setRoadContainerLeft, changeBlockOptionsArr,
            setBallBottomPosition, setNewGame
        } = this.props;
        setNewGame(true);
        this.handleDialogClose();
        ballTouchBlock(false);
        setBallBottomPosition(GeneralSettings.bottomBallPosition);
        setRoadContainerLeft(0);
        changeBlockOptionsArr([]);
    };

    state = {
        windowWidth: 0,
        delayedTouch: false
    };

    componentWillMount() {
        const defineWindowWidth = () => {
            this.setState({
                windowWidth: document.body.clientWidth
            });
        };
        defineWindowWidth();
        window.addEventListener('resize', () => {
            if (!this.props.touch) {
                defineWindowWidth();
            }
        });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.touch && !this.props.delayedTouch) {
            setTimeout(() => {
                this.setState({
                    delayedTouch: true
                });
            }, 1000);
        }
    }



    render() {
        const {windowWidth, delayedTouch} = this.state;
        const {settings} = this.props;
        const actions = [
            <FlatButton
                label="Yes"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleNewGame}
            />,
            <FlatButton
                label="No"
                primary={true}
                onTouchTap={() => {
                    this.clicked = false;
                    this.handleDialogClose();
                }}
            />,
        ];
        return(
            <div>
                <MuiThemeProvider>
                    <RaisedButton
                        label="Start game"
                        primary={true}
                        onTouchTap={() => {
                            this.clicked = true;
                            this.handleNewGame();
                        }}
                        style={{
                            width: '200px',
                            margin: '200px auto 0',
                            display: this.clicked ? 'none' : 'block'
                        }}
                        visible={false}
                    />
                </MuiThemeProvider>
                <Road
                    windowWidth={windowWidth}
                    speed={settings.roadSpeed.value}
                    minBlockHeight={settings.minBlockHeight.value}
                    blockWidth={settings.blockWidth.value}
                    blockDensity={settings.blockDensity.value}
                />
                <Ball
                    roadSpeed={settings.roadSpeed.value}
                    windowWidth={windowWidth}
                    animationTime={settings.jumpTime.value}
                    jumpHeight={settings.jumpHeight.value}
                />
                <NewGameDialog
                    settings={settings}
                    changeField={this.props.changeField}
                    open={delayedTouch}
                    actions={actions}
                    onRequestClose={this.handleDialogClose}
                />
            </div>
        );
    }
}