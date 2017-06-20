//Установка левого позиционирования дороги - дорога движется
export const setRoadContainerLeft = (position) => (dispatch) => {
    dispatch({
        type: 'SET_ROAD_LEFT_POSITION',
        payload: position
    })
};
//Массив настроек блоков, по нему рендерятся блоки
export const changeBlockOptionsArr = (option) => (dispatch) => {
    dispatch({
        type: 'CHANGE_BLOCK_OPTIONS_ARR',
        payload: option
    })
};
//Наезд на блок
export const ballTouchBlock = (boolean) => (dispatch) => {
    dispatch({
        type: 'BALL_TOUCH_BLOCK',
        payload: boolean
    })
};
//Запоминание координаты ударения мяча о блок
export const rememberBumpCoordinates = (bumpCoordinates) => (dispatch) => {
    dispatch({
        type: 'REMEMBER_BUMP_COORDINATES',
        payload: bumpCoordinates
    })
};