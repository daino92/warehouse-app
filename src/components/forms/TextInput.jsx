import React from 'react';
import styled from '@emotion/styled';
import {LabelComponent, FormComponent, ValidationComponent} from '../Common';
import {colors} from '../../util/variables';

const InputComponent = styled('input')({
	display: "flex",
	alignItems: "center",
	position: "relative",
    width: "100%",
    padding: ".4em 1em",
    font: "inherit",
    borderWidth: "1px",
    borderStyle: "solid",
	borderRadius: ".25em",
    outline: "none",
	transition: "all .2s ease 0s",
},
props => ({
    boxShadow: !props.valid && props.touched ? colors.cinnabar + ' 0 0 0 1px' : '',
    borderColor: !props.valid && props.touched ? colors.cinnabar : colors.lightGrey,

    "&:focus": {
        boxShadow: !props.valid && props.touched ? colors.cinnabar + ' 0 0 0 1px' : colors.curiousBlue + ' 0 0 0 1px',
        borderColor: !props.valid && props.touched ? colors.cinnabar : colors.curiousBlue
    }
}));

const TextInput = ({value, onChange, touched, valid, label, maxLength, type, validationMessage, ...props}) => (
    <FormComponent>
        <LabelComponent>{label}</LabelComponent>
        <InputComponent type={type} touched={touched} valid={valid} maxLength={maxLength} value={value} onChange={onChange} {...props} />
        { !valid && touched ? 
            <ValidationComponent>{validationMessage}</ValidationComponent> : null }
    </FormComponent>
);

export default TextInput;