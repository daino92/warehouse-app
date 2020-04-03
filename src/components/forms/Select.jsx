import React from 'react';
import styled from '@emotion/styled';
import capitalize from 'lodash/capitalize';
import {v4 as uuidv4} from 'uuid';
import {LabelComponent, FormComponent} from './Components';
import {colors} from '../../util/variables';

const SelectComponent = styled('select')`
    outline: none;
    border: 1px solid ${colors.lightGrey};
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;

    &:focus {
        outline: none;
        border: 1px solid ${colors.sun};
    }
`;

const Select = ({value, onChange, name, label, ...props}) => (
    <FormComponent>
        <LabelComponent>{label}</LabelComponent>
        <SelectComponent value={value} onChange={onChange} name={name}>
            {props.options.map(({value, kindOfCategory, displayValue}) => {
                const capitalizedValue = capitalize(kindOfCategory)

                return (
                    <option key={uuidv4()} value={capitalizedValue}>
                    {capitalizedValue} {displayValue}
                    </option>
                )})
            }
        </SelectComponent>
    </FormComponent>
);

export default Select;