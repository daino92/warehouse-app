import React from 'react';
import styled from '@emotion/styled';
import {colors} from '../util/variables';
import {dict} from '../util/variables.js';
import imagePlaceholder from '../assets/no-image-icon.png';

const ProductContainer = styled('div')({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    margin: "10px",
    padding: "1em",
    width: "280px",
    textAlign: "center",
    cursor: "pointer",
	// borderRadius: ".5em",
    border: `1px solid ${colors.whisper}`,
    boxShadow: `0 2px 3px ${colors.lightGrey}`,
    backgroundColor: colors.white,
    
    "&:hover, &:active": {
        boxShadow: `rgba(${colors.blackAlt}, .8) 0 1px 8px`,
        transition: "all .3s"
    },
},
props => ({
    opacity: props.quantity ? '35%' : '100%',

    "&:hover, &:active": {
       transform: !props.quantity ? "scale(1.03)" : "initial",
    },

    "&::before": {
        content: '""',
        position: "absolute",
        display: "block",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        transition: `opacity .2s ease-in-out`,
        opacity: 0,
        backgroundColor: !props.quantity ? `rgba(${colors.pattensBlueAlt}, .5)` : `rgba(${colors.whiteSmokeAlt}, .5)`
    },

    "&:hover::before": {
        opacity: 1
    }
}));

const ImageContainer = styled('div')({
    height: "150px",
    backgroundSize: "contain",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
});

const FlexContainer = styled('div')({
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between"
});

const ProductIdContainer = styled('div')({
    fontSize: "1.5em",
    fontWeight: 700,
    lineHeight: 1.2,
    padding: ".5em"
});

const StonesInformation = styled('div')({
    display: "flex",
    flexDirection: "column",

    "span": {
        fontWeight: 700
    }
});

const Line = styled('div')({
	position: "absolute",
    // width: "25.5em",
    width: "24.5em",
	borderBottom: `2px solid ${colors.red}`,
	//transform: "translateY(134px) translateX(-81px) rotate(133deg)",
    transform: "translateY(125px) translateX(-73px) rotate(135deg)"
});

const Product = ({clicked, imageUrl, sku, price, quantity, goldWeight, diamondWeight, karats}) => {
    const zeroQuantity = quantity === 0;
    const imageURL = imageUrl ? imageUrl : imagePlaceholder;

    return (
        <ProductContainer quantity={zeroQuantity} onClick={clicked}>
            {zeroQuantity ? (<Line/>) : null }
            <ImageContainer alt={sku} style={{backgroundImage: `url(${imageURL})`}}/>
            <FlexContainer>
            <ProductIdContainer>{sku}</ProductIdContainer>
                <div>{price} €</div>
                {/* <div><span>Quantity:</span> {zeroQuantity ? <>{dict.noStock}</> : quantity}</div> */}
            </FlexContainer>
            <FlexContainer>
                <StonesInformation><span>{dict.goldWeight}</span> {goldWeight}</StonesInformation>
                <StonesInformation><span>{dict.diamondWeight}</span> {diamondWeight}</StonesInformation>
                <StonesInformation><span>{dict.karats}</span> {karats}</StonesInformation>
            </FlexContainer>
        </ProductContainer>
    )
}

export default Product;