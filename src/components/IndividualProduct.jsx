import React from 'react';
import styled from '@emotion/styled';
import {colors} from '../util/variables';

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

    &:hover,
    &:active {
        //background-color: ${colors.pattensBlue};
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

const QuantityContainer = styled('div')`

`;

const FlexContainer = styled('div')`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`;

const Product = ({clicked, imageUrl, title, price, quantity}) => (
    <ProductContainer onClick={clicked}>
        <img src={imageUrl} alt={title}/>
        <h1>{title}</h1>
        <FlexContainer>
            <PriceContainer>{price} €</PriceContainer>
            <QuantityContainer>{quantity}</QuantityContainer>
        </FlexContainer>
    </ProductContainer>
)

export default Product;