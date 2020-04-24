import React from 'react';
import styled from '@emotion/styled';
import {colors} from '../util/variables';
//import {dict} from '../util/variables.js';
import imagePlaceholder from '../assets/no-image-icon.png';

const ProductContainer = styled('div')({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    }
},
props => ({
    opacity: props.quantity ? '35%' : '100%',

    "&:hover, &:active": {
       transform: !props.quantity ? "scale(1.03)" : "0",
       //backgroundColor: !props.quantity ? `rgba(${colors.pattensBlueAlt}, .7)` : `rgba(${colors.whiteSmokeAlt}, .7)`
    }
}));

const ImageContainer = styled('div')({
    height: "150px",
    width: "150px",
    margin: "0 auto",
    backgroundImage: `url(${imagePlaceholder})`,
    backgroundSize: "cover"
},
// props => ({
//     "&:hover, &:active": {
//         boxShadow: !props.quantity ? `0 3000px rgba(${colors.pattensBlueAlt}, .7) inset` : `0 3000px rgba(${colors.whiteSmokeAlt}, .7) inset`
//     }
// })
);

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

const Product = ({clicked, imageUrl, sku, price, quantity, goldWeight, diamondWeight, otherStoneWeight}) => {
    const zeroQuantity = quantity === 0;
    const imageURL = imageUrl ? imageUrl : imagePlaceholder;

    return (
        <ProductContainer quantity={zeroQuantity} onClick={clicked}>
            {zeroQuantity ? (<Line/>) : null }
            <ImageContainer src={imageURL} alt={sku}/>
            <FlexContainer>
            <ProductIdContainer>{sku}</ProductIdContainer>
                <div>{price} €</div>
                {/* <div><span>Quantity:</span> {zeroQuantity ? <>{dict.noStock}</> : quantity}</div> */}
            </FlexContainer>
            <FlexContainer>
                <StonesInformation><span>Gold</span> {goldWeight}</StonesInformation>
                <StonesInformation><span>Diamond</span> {diamondWeight}</StonesInformation>
                <StonesInformation><span>Other stone</span> {otherStoneWeight}</StonesInformation>
            </FlexContainer>
        </ProductContainer>
    )
}

export default Product;