import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import {keyframes, css} from '@emotion/core'
import {colors} from '../util/variables.js';

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

const fadeIn = keyframes`
    from {
        bottom: 0;
        opacity: 0;
    }
    to {
        bottom: 50%; 
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        bottom: 50%; 
        opacity: 1;
        }
    to {
        bottom: 0;
        opacity: 0;
    }
`;


export class Snackbar extends PureComponent {
    message = ''

    state = {
        isActive: false,
    }

    openSnackBar = message => {
        this.message = message;

        this.setState({isActive: true}, () => {
            setTimeout(() => {
                this.setState({isActive: false});
            }, 3000);
        });
    }

    render() {
        const {isActive} = this.state;
        return <SnackbarComponent isActive={isActive}>{this.message}</SnackbarComponent>
    }
}