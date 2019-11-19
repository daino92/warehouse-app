import React from 'react';
import styled from '@emotion/styled';

const InputComponent = styled('div')`
    width: 50%;
    padding: 10px;

    label {
        font-weight: bold;
        display: block;
        margin: 8px auto;
        text-align: left;
    }

    textarea,
    select,
    input {
        outline: none;
        border: 1px solid #CCC;
        background-color: #FFF;
        font: inherit;
        padding: 6px 10px;
        display: block;
        width: 100%;

        //background-color: ${props => props.invalid && props.shouldValidate && props.touched 
            ? '#FDA49A' : '#FFF'};
        border: ${props => props.invalid && props.shouldValidate && props.touched 
            ? '1px solid red' : '1px solid #CCC'};

        &:focus {
            outline: none;
            border: 1px solid #FA923F;
        }
    }
`;

const Input = ({type, params, value, invalid, isChecked, shouldValidate, touched, changed, label}) => {
    let inputElement = null;

    switch (type) {
        case ('input'):
            if (params.type === 'text') {
                inputElement = <input {...params} value={value} onChange={changed} />;
            } 
            else if (params.type === 'checkbox') {
                inputElement = params.options.map(({value, isChecked}) =>
                   <input type='checkbox' key={value} value={value} checked={isChecked} onChange={changed}/>
                )
            }
            break;
        case ('textarea'):
            inputElement = <textarea {...params} value={value} onChange={changed} />;
            break;
        case ('select'):
            inputElement = (
                <select value={value} onChange={changed}>
                    {params.options.map(({value, displayValue}) => (
                        <option key={value} value={value}>
                            {displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input {...params} value={value} onChange={changed} />;
    }

    return (
        <InputComponent invalid={invalid} shouldValidate={shouldValidate} touched={touched} checked={isChecked}>
            <label>{label}</label>
            {inputElement}
        </InputComponent>
    )
};

export default Input;