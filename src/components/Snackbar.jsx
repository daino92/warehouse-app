import React, {PureComponent} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {colors} from '../util/variables.js';
import {fadeIn, fadeOut} from '../util/keyframes.js';

const SnackbarComponent = styled('div')`
    visibility: ${props => props.isActive ? `visible` : 'hidden'};
    min-width: 250px;
    margin-left: -125px;
    background-color: ${colors.nightRider};
    color: ${colors.white};
    text-align: center;
    border-radius: 2px;
    padding: 1em;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 50%;
    font-size: 1rem;
    animation: ${props => props.isActive ? css`${fadeIn} 1s, ${fadeOut} 1s 2.5s` : ''};
`;

export class Snackbar extends PureComponent {

    render() {
        const {snackBarOpen, snackBarMessage} = this.props;
        return <SnackbarComponent isActive={snackBarOpen}>{snackBarMessage}</SnackbarComponent>
    }
}