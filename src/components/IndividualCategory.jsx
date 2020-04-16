import React from 'react';
import capitalize from 'lodash/capitalize';
import styled from '@emotion/styled';
import {colors, dict} from '../util/variables';
import Spinner from './Spinner';
import Button from '../components/Button';
import {ErrorContainer, ButtonsContainer, MainContainer} from './Common'

const CategoryTitle = styled('h1')`
    line-height: 1.2;
`;

const CategoryBody = styled('div')`
    padding: 1.5em .5em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 80%;
	margin: 0 auto;

    div {
        padding: 1em;
        font-size: 1.2em;
        line-height: 1;
        margin: .8em .5em;
        width: 8em;
        flex: 1 0 25%;
        box-shadow: 0 3px 3px ${colors.lightGrey};

        :hover {
            background-color: ${colors.pattensBlue};
            cursor: pointer;
            
        }
    }
`;

const Category = ({categories, isFetching, clicked, onAddCategory, onEditCategory, onDeleteCategory, onGoBack}) => {
    if (isFetching) return <Spinner />;

    if (categories) {
        console.log("categories: ", categories);

        return (
            <MainContainer>
                <CategoryTitle>{dict.categories}</CategoryTitle>
                <CategoryBody>
                    { categories.map(({id, value}) => (
                        <CategoryBody key={id.toString()} onClick={() => clicked(id)}>
                            {capitalize(value)}
                        </CategoryBody>
                    ))}
                </CategoryBody>
                <ButtonsContainer>
                    <Button btnType="add"       disabled={false} onClick={onAddCategory}>{dict.add}</Button>
                    <Button btnType="success"   disabled={false} onClick={onGoBack}>{dict.back}</Button>
                </ButtonsContainer>
            </MainContainer>
        );
    } else {
        return <ErrorContainer>{dict.categoriesNotFound}</ErrorContainer>;
    }
}

export default Category;