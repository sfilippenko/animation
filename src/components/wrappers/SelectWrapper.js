import React from 'react';
import Select from 'react-select';
require('react-select/dist/react-select.css');

export default class SelectWrapper extends React.Component {

    onChange = (newValue) => {
        const {id, onChangeHandler} = this.props;
        if (newValue === null || newValue.length === 0) {
            onChangeHandler(id, {value: null, label: ''});
        } else {
            onChangeHandler(id, newValue);
        }
    };

    onBlur = (event) => {
        const {id, onChangeHandler, options = []} = this.props;
        const target = event.target;
        if (target.tagName === 'INPUT') {
            const inputVal = target.value;
            if (inputVal !== '') {
                options.forEach((option) => {
                    if (inputVal.toLowerCase() === option.label.toLowerCase()) {
                        onChangeHandler(id, {...option})
                    } else return null;
                });
            }
        }
    };

    render() {
        const {id, options = [], value = {}, header = 'Select'} = this.props;
        return (
            <div>
                <div>
                    {header}
                </div>
                <Select
                    id={id}
                    options={options}
                    value={value}
                    openOnFocus={true}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    style={{margin: '10px 0'}}
                />
            </div>
        );
    }
}