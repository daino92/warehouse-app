import React from 'react';
import styled from '@emotion/styled';
import {LabelComponent, FormComponent} from './Components';

const RadioContainer = styled('div')`
    display: flex;
    justify-content: space-evenly;

    label {
        display: flow-root;
        //display: flex;
        //margin: 0 auto; 
        //width: 100px;

        input {
            width: 100%;

        }
    }
`;

const Radio = ({name, onChange, label, type, ...props}) => (
    <FormComponent>
        <LabelComponent>{label}</LabelComponent>
        <RadioContainer>
            {props.options.map(({value, isChecked}) => (
                <label key={value}>
                    {value}
                    <input type={type} name={name} value={value} defaultChecked={isChecked} onChange={onChange} />
                </label>
            ))}
        </RadioContainer>
    </FormComponent>
);

export default Radio;