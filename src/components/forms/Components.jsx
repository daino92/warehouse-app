import styled from '@emotion/styled';
import {colors} from '../../util/variables';

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

const ErrorContainer = styled('div')`
    display: block;
    color: ${colors.red};
`;

export {LabelComponent, FormComponent, ErrorContainer};