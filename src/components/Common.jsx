import styled from '@emotion/styled';
import {colors} from '../util/variables';

const LabelComponent = styled('label')`
    font-weight: bold;
    display: block;
    margin: 8px auto;
    text-align: left;
`;

const FormComponent = styled('div')`
    width: 50%;
    padding: 10px;

    &:nth-of-type(2n+1) {
        padding-left: 1em;
    }

    &:nth-of-type(2n+2) {
        padding-right: 1em
    }
`;

const MainContainer = styled('div')`
    width: 80%;
    margin: 20px auto;
    padding-bottom: .5em;
    border: 1px solid ${colors.whisper};
    box-shadow: 0 2px 3px ${colors.lightGrey};
    text-align: center;

    form {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
`;

const ButtonsContainer = styled('div')`
    margin: 0 auto;
    width: 100%;
`;

const ErrorContainer = styled('div')`
    display: block;
    font-style: italic;
    text-align: center;
    font-size: 1.3em;
    line-height: 1.1;
    padding: 1.5em;
    color: ${colors.red};
`;

export {
    LabelComponent, 
    FormComponent, 
    ErrorContainer,
    ButtonsContainer,
    MainContainer
};