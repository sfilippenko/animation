import Dictionaries from '../constants/Dictionaries';

import React from 'react';
require('react-select/dist/react-select.css');
import Dialog from 'material-ui/Dialog';
import SelectWrapper from './wrappers/SelectWrapper';
import Grid from './wrappers/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class NewGameDialog extends React.Component {

    render() {
        const {open, actions, onRequestClose, changeField, settings} = this.props;
        return (
            <MuiThemeProvider>
                <Dialog
                    open={open}
                    title='Play again?'
                    actions={actions}
                    onRequestClose={onRequestClose}
                    titleStyle={{textAlign: 'center'}}
                    actionsContainerStyle={{display: 'flex', justifyContent: 'space-around'}}
                    autoScrollBodyContent={true}
                >
                    <Grid
                        flexBasis={300}
                        style={{marginBottom: '70px'}}
                    >
                        <SelectWrapper
                            id='roadSpeed'
                            header='Select road speed'
                            onChangeHandler={changeField}
                            options={Dictionaries.roadSpeed}
                            value={settings.roadSpeed}
                        />
                        <SelectWrapper
                            id='jumpTime'
                            header='Select jump time'
                            onChangeHandler={changeField}
                            options={Dictionaries.jumpTime}
                            value={settings.jumpTime}
                        />
                        <SelectWrapper
                            id='jumpHeight'
                            header='Select jump height'
                            onChangeHandler={changeField}
                            options={Dictionaries.jumpHeight}
                            value={settings.jumpHeight}
                        />
                        <SelectWrapper
                            id='blockWidth'
                            header='Select block width'
                            onChangeHandler={changeField}
                            options={Dictionaries.blockWidth}
                            value={settings.blockWidth}
                        />
                        <SelectWrapper
                            id='minBlockHeight'
                            header='Select minimum block height'
                            onChangeHandler={changeField}
                            options={Dictionaries.minBlockHeight}
                            value={settings.minBlockHeight}
                        />
                        <SelectWrapper
                            id='blockDensity'
                            header='Select block density'
                            onChangeHandler={changeField}
                            options={Dictionaries.blockDensity}
                            value={settings.blockDensity}
                        />
                    </Grid>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}