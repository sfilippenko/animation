import GeneralSettings from '../constants/GeneralSettings';

const initialState = {
    bottom: GeneralSettings.bottomBallPosition,
    rotateAngle: 0
};

export default function ball (state = initialState, action) {
    switch (action.type) {
        case 'SET_BOTTOM_BALL_POSITION': {
            return {...state, bottom: action.payload};
        }
        case 'SET_BALL_ROTATE_ANGLE': {
            return {...state, rotateAngle: action.payload};
        }
        default: {
            return state;
        }
    }
}