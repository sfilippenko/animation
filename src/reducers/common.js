const initialState = {
    roadSpeed: {
        value: 3,
        label: 'Medium'
    },
    jumpTime: {
        value: 1000,
        label: '1000 ms'
    },
    jumpHeight: {
        value: 300,
        label: '300 px'
    },
    blockWidth: {
        value: 30,
        label: '30 px'
    },
    minBlockHeight: {
        value: 40,
        label: '30 px'
    },
    blockDensity: {
        value: 2,
        label: 'normal'
    },
    countDown: 0,
    newGame: false
};

export default function ball (state = initialState, action) {
    switch (action.type) {
        case 'SET_FIELD_VALUE': {
            return {...state, [action.payload.id]: action.payload.options};
        }
        case 'SET_COUNT_DOWN': {
            return {...state, countDown: action.payload};
        }
        case 'SET_NEW_GAME': {
            return {...state, newGame: action.payload};
        }
        default: {
            return state;
        }
    }
}