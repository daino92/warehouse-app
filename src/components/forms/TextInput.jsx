import React from 'react';
import styled from '@emotion/styled';
import {LabelComponent, FormComponent} from './Components';
import {colors} from '../../util/variables';
import {keyframes} from '@emotion/core';

const fadeIn = keyframes`
    0%  { 
        opacity: 0; 
    }
    20% {
        opacity: .2; 
    }
    40% {
        opacity: .4; 
    }
    60% { 
        opacity: .6; 
    }
    80% {
        opacity: .8; 
    }
    100% { 
        opacity: 1; 
    }
`

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const ErrorComponent = styled('div')`
    color: ${colors.red};
    padding: .5em;
    text-align: left;
    transition: width .5s .5s, height .5s .5s, opacity .5s;
    animation: 1.1s ease 1s normal forwards 1 ${fadeIn};
`;

const InputComponent = styled('input')`
    outline: none;
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;

    border: ${props => !props.valid && props.touched ? '1px solid ' + colors.red : '1px solid ' + colors.lightGrey};

    &:focus {
        outline: none;
        border: 1px solid ${colors.sun};
    }
`;

const TextInput = ({value, onChange, touched, valid, label, maxLength, type, errorMessage, ...props}) => (
    <FormComponent>
        <LabelComponent>{label}</LabelComponent>
        <InputComponent type={type} touched={touched} valid={valid} maxLength={maxLength} value={value} onChange={onChange} {...props} />
        { !valid && touched &&
            <ErrorComponent>{errorMessage}</ErrorComponent>
            }
    </FormComponent>
    
);

export default TextInput;