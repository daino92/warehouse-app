import {keyframes} from '@emotion/core'

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

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
}`;

export {fadeIn, fadeOut, spin}