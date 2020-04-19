import React from 'react';
import styled from '@emotion/styled';
import capitalize from 'lodash/capitalize';
import {v4 as uuidv4} from 'uuid';
import {LabelComponent, FormComponent} from '../Common';
import {colors} from '../../util/variables';

const SelectComponent = styled('select')({
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

    "&:focus": {
        boxShadow: colors.curiousBlue + ' 0 0 0 1px',
        borderColor: colors.curiousBlue
    }
});

const Select = ({value, onChange, name, label, ...props}) => (
    <FormComponent>
        <LabelComponent>{label}</LabelComponent>
        <SelectComponent value={value} onChange={onChange} name={name}>
            {props.options.map(({id, value, address}) => {
                const capitalizedValue = capitalize(value || address)

                return (
                    <option key={uuidv4()} value={id}>
                        {capitalizedValue}
                    </option>
                )})
            }
        </SelectComponent>
    </FormComponent>
);

export default Select;