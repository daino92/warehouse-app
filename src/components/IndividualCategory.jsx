import React from 'react';
import capitalize from 'lodash/capitalize';
import styled from '@emotion/styled';
import mq from '../util/mediaQueries.js';
import {colors, dict} from '../util/variables';
import Spinner from './Spinner';
import Button from '../components/Button';
import {ErrorContainer, FlexCentered, MainContainer} from './Common'

const CategoryTitle = styled('h1')({
    lineHeight: 1.2
});

const CategoryBody = styled('div')({
    padding: "1.5em .5em",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "80%",
	margin: "0 auto"
});

const Categories = styled('div')({
    padding: "1em",
    fontSize: "1.2em",
    lineHeight: 1,
    margin: ".8em .5em",
    boxShadow: `0 3px 3px ${colors.lightGrey}`,
    overflow: "hidden",
    textOverflow: "ellipsis",

    "&:hover": {
        backgroundColor: colors.pattensBlue,
        cursor: "pointer"
    }
},
mq({
    width: ["100%", "8em"],
    flex: ["1 0 100%", "1 0 33%", "1 0 25%"]
}));

const Category = ({categories, isFetching, clicked, onAddCategory, onEditCategory, onDeleteCategory, onGoBack}) => {
    
    if (isFetching) return <Spinner />;

    return (
        <MainContainer>
            <CategoryTitle>{dict.categories}</CategoryTitle>
            <CategoryBody>
                { 
                categories.length ?
                    categories.map(({id, value}) => (
                        <Categories key={id.toString()} onClick={() => clicked(id)}>
                            {capitalize(value)}
                        </Categories>
                    )) : (<ErrorContainer>{dict.categoriesNotFound}</ErrorContainer>)
                }
            </CategoryBody>
            <FlexCentered>
                <Button btnType="add"       disabled={false} onClick={onAddCategory}>{dict.add}</Button>
                <Button btnType="success"   disabled={false} onClick={onGoBack}>{dict.back}</Button>
            </FlexCentered>
        </MainContainer>
    );
}

export default Category;