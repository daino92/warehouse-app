import React from 'react';
import styled from '@emotion/styled';
import {LabelComponent, FormComponent} from '../Common';
import {colors} from '../../util/variables';

const TextAreaComponent = styled('textarea')({
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

const TextArea = ({value, onChange, touched, valid, label, rows, ...props}) => (
    <FormComponent>
        <LabelComponent>{label}</LabelComponent>
        <TextAreaComponent rows={rows ? rows : 3} touched={touched} valid={valid} value={value} onChange={onChange} {...props} />
    </FormComponent>
);

export default TextArea;