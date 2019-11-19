import React from 'react';
import styled from '@emotion/styled';
import {LabelComponent, FormComponent} from './Components';
import {colors} from '../../util/variables';

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

const TextInput = ({value, onChange, touched, valid, label, maxLength, type, ...props}) => (
    <FormComponent>
        <LabelComponent>{label}</LabelComponent>
        <InputComponent type={type} touched={touched} valid={valid} maxLength={maxLength} value={value} onChange={onChange} {...props} />
    </FormComponent>
);

export default TextInput;