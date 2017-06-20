export const changeField = (id, options) => (dispatch) => {
    dispatch({
        type: 'SET_FIELD_VALUE',
        payload: {id, options}
    });
};

export const setCountDown = (number) => (dispatch) => {
    dispatch({
        type: 'SET_COUNT_DOWN',
        payload: number
    });
};

export const setNewGame = (boolean) => (dispatch) => {
    dispatch({
        type: 'SET_NEW_GAME',
        payload: boolean
    });
};