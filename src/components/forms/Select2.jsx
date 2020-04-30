import React, {Component} from 'react';
import Select from 'react-select';
import {LabelComponent, FormComponent} from '../Common';
import mq from '../../util/mediaQueries.js';

const customStyles = {
    control: base => [{
        ...base,
        fontSize: ".9em"
    },
    mq({
        width: ["100%", "150px"]
    })],
    menuList: base => ({
        ...base,
        maxHeight: '15em'
    }),
    option: base => ({
        ...base,
        padding: "10px",
        overflow: "hidden",
        textOverflow: "ellipsis",

        "&:hover": {
            cursor: "pointer"
        }
    }),
    menu: base => ({
        ...base,
        marginTop: 0,
        zIndex: 2,
        fontSize: ".9em"
    }),
    dropdownIndicator: base => ({
        ...base,
        
        "&:hover": {
            cursor: "pointer"   
        }
    })
};

class Select2 extends Component {

    render() {
        const {name, options, placeholder, onChange, label, autoFocus} = this.props;

        return (
            <FormComponent>
                <LabelComponent>{label}</LabelComponent>
                <Select
                    name={name}
                    styles={customStyles}
                    options={options}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                />
            </FormComponent>
        );
    }
}

export default Select2;