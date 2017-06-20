
const initialState = {
    roadContainerLeft: 0,
    blockOptionsArr: [],
    touch: false,
    bumpCoordinates: {bottom: 0, left: 0}
};

export default function road (state = initialState, action) {
    switch (action.type) {
        case 'SET_ROAD_LEFT_POSITION': {
            return {...state, roadContainerLeft: action.payload};
        }
        case 'CHANGE_BLOCK_OPTIONS_ARR': {
            return {...state, blockOptionsArr: action.payload};
        }
        case 'BALL_TOUCH_BLOCK': {
            return {...state, touch: action.payload};
        }
        case 'REMEMBER_BUMP_COORDINATES': {
            return {...state, bumpCoordinates: action.payload};
        }
        default: {
            return state;
        }
    }
}