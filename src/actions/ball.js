export const setBallBottomPosition = (position) => (dispatch) => {
    dispatch({
        type: 'SET_BOTTOM_BALL_POSITION',
        payload: position
    })
};

export const setBallRotateAngle = (angle) => (dispatch) => {
    dispatch({
        type: 'SET_BALL_ROTATE_ANGLE',
        payload: angle
    });
};