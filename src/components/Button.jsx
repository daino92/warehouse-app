import React from 'react';
import styled from '@emotion/styled';
import {colors} from '../util/variables';

const ButtonComponent = styled('button')`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-size: 1.2em;
    width: 5em;
	line-height: 1;
    font-weight: bold;
    box-shadow: 0 3px 3px ${colors.lightGrey};
    color: ${props => props.btnType === 'success'   ? 
        colors.verdunGreen : props.btnType === 'danger'      ? 
        colors.saddleBrown : colors.white};

    :hover {
        color: ${props => props.btnType === 'success'   ? 
        colors.altGreen : props.btnType === 'danger'      ? 
        colors.harleyDavidsonOrange : colors.white};
    }

    :active {
        box-shadow: 0 1px 3px ${colors.lightGrey};
        transform: translateY(4px);
    }

    :disabled {
        color: ${colors.lightGrey};
        cursor: not-allowed;
    }
`;

const Button = ({onClick, disabled, children, btnType}) =>(
    <ButtonComponent disabled={disabled} btnType={btnType} onClick={onClick}>{children}</ButtonComponent>
);

export default Button;