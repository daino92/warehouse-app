import styled from '@emotion/styled';
import mq from '../util/mediaQueries.js';
import {colors} from '../util/variables';

const LabelComponent = styled('label')`
    font-weight: bold;
    display: block;
    margin: 8px auto;
    text-align: left;
`;

const FormComponent = styled('div')({
    padding: "10px",
},
mq({
    width: ["100%", "50%"],

    "&:nth-of-type(2n+1)": {
        paddingLeft: ["10px", "initial", "1em"]
    },

    "&:nth-of-type(2n+2)": {
        paddingRight: ["10px", "initial", "1em"]
    }
}));

const MainContainer = styled('div')({
    margin: "20px auto",
    paddingBottom: ".5em",
    border: `1px solid ${colors.whisper}`,
    boxShadow: `0 2px 3px ${colors.lightGrey}`,
    textAlign: "center",

    "form": {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    }
},
mq({
    width: ["95%", "80%"],
}));

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

const PaginationWrapper = styled('div')({
    display: "flex",
    justifyContent: "center",

    "> div": {
        maxWidth: "360px"
    },

    "ul": {
        display: "flex",
        fontSize: "1.1em",
	    lineHeight: 1.8,
        listStyleType: "none",
        padding: "1em",
        justifyContent: "center",

        "a": {
            display: "inline-block",
            width: "35px",
            height: "35px",
            textAlign: "center",
        },

        ".active": {
            backgroundColor: colors.sun,
            borderRadius: "50%",

            ".activePage": {
                color: colors.white
            }
        }
    },

    ".disabled-navigation a, .disabled-navigation a:hover": {
        cursor: "not-allowed",
        color: colors.lightGrey
    }
},
mq({
    flexDirection: ["column", "row"],
    marginBottom: ["1em", 0],

    "> div": {
        padding: ["0 10px 10px", "0 .5em .5em"],
        margin: ["0 auto", "initial"],
        width: ["100%", "initial"]
    },

    "ul": {
        margin: [0, "17.6px 0"]
    }
}));

const FlexCentered = styled('div')({
    display: "flex",
	justifyContent: "center"
});

export {
    LabelComponent, 
    FormComponent, 
    ErrorContainer,
    ButtonsContainer,
    MainContainer,
    PaginationWrapper,
    FlexCentered
};