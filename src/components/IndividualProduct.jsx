import React from 'react';
import styled from '@emotion/styled';
import {colors} from '../util/variables';
import {dict} from '../util/variables.js';
import imagePlaceholder from '../assets/picture-not-available.jpg';

const ProductContainer = styled('div')`
    width: 250px;
    padding: 16px;
    text-align: center;
    border: 1px solid ${colors.whisper};
    box-shadow: 0 2px 3px ${colors.lightGrey};
    margin: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${colors.solitude};
	border-radius: .5em;
    opacity: ${props => props.quantity ? '35%' : '100%'};

    &:hover,
    &:active {
        /* background-color: ${colors.pattensBlue}; */
        box-shadow: rgba(${colors.black}, .8) 0 1px 8px;
        transform: scale(1.03);
        transition: all .3s;
        z-index: 2;
    }

    img {
        height: 140px;
    }
`;

const PriceContainer = styled('div')`
    color: ${colors.black};
    font-weight: 700;
`;

const Line = styled('div')`
    width: 21em;
	height: 47px;
	border-bottom: 2px solid red;
	transform: translateY(93px) translateX(-45px) rotate(137deg);
	position: absolute;
`;

const QuantityContainer = styled('div')`

`;

const ColorContainer = styled('div')`

`;

const ProductIdContainer = styled('div')`
    color: ${colors.red};
    font-weight: 700;
`;

const FlexContainer = styled('div')`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`;

const Product = ({clicked, imageUrl, title, product, stock}) => {
    const {price} = product || {};
    const {color, productId, quantity} = stock;
    const zeroQuantity = quantity === 0;
    const imageURL = imageUrl ? imageUrl : imagePlaceholder

    return (
        <ProductContainer quantity={zeroQuantity} onClick={clicked}>
            {zeroQuantity ? (<Line/>) : null }
            <img src={imageURL} alt={title}/>
            <h1>{title}</h1>
            <FlexContainer>
                <PriceContainer>{price} €</PriceContainer>
                <QuantityContainer>{zeroQuantity ? <>{dict.noStock}</> : quantity}</QuantityContainer>
                <ColorContainer>{color}</ColorContainer>
                <ProductIdContainer>{productId}</ProductIdContainer>
            </FlexContainer>
        </ProductContainer>
    )
}

export default Product;