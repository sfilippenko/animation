import React from 'react';

export default class Grid extends React.Component {

    render() {
        const {flexBasis, children = [], style = {}} =this.props;
        let flexArr = [];
        children.forEach((item, index) => {
            flexArr.push(
                <div
                    key={index}
                    style={{
                        flex: '1 0',
                        flexBasis: `${flexBasis}px`,
                        padding: '0 10px'
                    }}
                >
                    {item}
                </div>
            );
        });
        return (
            <div
                style={{display: 'flex',
                    flexWrap: 'wrap',
                    ...style
                }}
            >
                {flexArr}
            </div>
        );
    }
}