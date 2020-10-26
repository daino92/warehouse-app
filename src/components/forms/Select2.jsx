import React from 'react';
import Select from 'react-select';
import {LabelComponent, FormComponent} from '../Common';

const customStyles = {
    control: base => ({
        ...base,
        fontSize: ".9em",
        width: "100%"
    }),
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

const Select2 = ({name, options, placeholder, onChange, label, autoFocus, isDisabled}) => (
    <FormComponent>
        <LabelComponent>{label}</LabelComponent>
        <Select
            name={name}
            styles={customStyles}
            options={options}
            onChange={onChange}
            placeholder={placeholder}
            autoFocus={autoFocus}
            isDisabled={isDisabled}
        />
    </FormComponent>
);

export default Select2;