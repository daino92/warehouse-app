import React from 'react';
import styled from '@emotion/styled';
import {LabelComponent, FormComponent} from '../Common';
import {colors} from '../../util/variables';

const TextAreaComponent = styled('textarea')`
    outline: none;
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;
    resize: none;

    border: ${props => !props.valid && props.touched ? '1px solid ' + colors.red : '1px solid ' + colors.lightGrey};

    &:focus {
        outline: none;
        border: 1px solid ${colors.sun};
    }
`;

const TextArea = ({value, onChange, touched, valid, label, rows, ...props}) => (
    <FormComponent>
        <LabelComponent>{label}</LabelComponent>
        <TextAreaComponent rows={rows ? rows : 3} touched={touched} valid={valid} value={value} onChange={onChange} {...props} />
    </FormComponent>
);

export default TextArea;