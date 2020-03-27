import React from 'react';
import styled from '@emotion/styled';
import {colors} from '../util/variables.js';
import {spin} from '../util/keyframes.js';

const SpinnerOverlay = styled('div')`
    height: 60vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SpinnerContainer = styled('div')`
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(${colors.silver}, .6);
    border-radius: 50%;
    border-top-color: ${colors.nevada};
    animation: ${spin} 1s ease-in-out infinite;
`;

const spinner = () => (
    <SpinnerOverlay>
        <SpinnerContainer/>
    </SpinnerOverlay>
)

export default spinner;