const ballSize = 120;
const roadHeight = 200;
const roadTimeInterval = 10;
const rotateBallTimeInterval = 30;
const rotateCoef = rotateBallTimeInterval / (ballSize * roadTimeInterval);

const GeneralSettings = {
    roadTimeInterval,
    rotateCoef,
    rotateBallTimeInterval,
    ballSize,
    bottomBallPosition: roadHeight,
    gravityFunction: (speed, time, constGravity) => speed * time - constGravity * time * time,
    bumpDotSize: 30,
    roadHeight,
    startCount: 3,
    countDownContainerWidth: 100,
};

export default GeneralSettings