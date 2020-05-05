import styled from '@emotion/styled';
import mq from '../util/mediaQueries.js';
import {colors} from '../util/variables';

const LabelComponent = styled('label')({
    fontWeight: "bold",
    display: "block",
    margin: "8px auto",
    textAlign: "left"
});

const FormComponent = styled('div')({
    padding: "10px"
},
mq({
    width: ["100%", "50%"]
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
        justifyContent: "flex-start"
    }
},
mq({
    width: ["95%", "80%"]
}));

const ErrorContainer = styled('div')({
    display: "block",
    fontStyle: "italic",
    textAlign: "center",
    fontSize: "1.3em",
    lineHeight: 1.1,
    padding: "1.5em",
    color: colors.red
});

const ValidationComponent = styled('div')({
    display: "flex",
	justifyContent: "center",
	padding: ".5em",
	fontWeight: 700,
    color: colors.cinnabar,
	fontStyle: "italic"
});

const PaginationWrapper = styled('div')({
    display: "flex",
    justifyContent: "center",
    maxWidth: "1100px",
    margin: "0 auto 1em",

    "> div": {
        maxWidth: "35em",
        width: "100%"
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
            textAlign: "center"
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

    "> div": {
        padding: ["0 10px 10px", "0 .5em .5em"],
        margin: ["0 auto", "initial"]
    },

    "ul": {
        margin: [0, "17.6px 0"]
    }
}));

const FlexCentered = styled('div')({
    display: "flex",
	justifyContent: "center",
    flexWrap: "wrap",
    width: "100%"
});

const ModalWarning = styled('div')({
    fontStyle: "italic"
},
mq({
    padding: ["1.4em .4em", "2em"],
    fontSize: ["1.2em", "1.4em"]
}));

export {
    LabelComponent, 
    FormComponent, 
    ValidationComponent,
    ErrorContainer,
    MainContainer,
    PaginationWrapper,
    FlexCentered,
    ModalWarning
};