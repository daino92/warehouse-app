import React from 'react';
import capitalize from 'lodash/capitalize';
import styled from '@emotion/styled';
import {colors, dict} from '../util/variables';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {ErrorContainer} from '../components/forms/Components'

const CategoriesComponent = styled('div')`
    width: 80%;
    margin: 20px auto;
    border: 1px solid ${colors.whisper};
    box-shadow: 0 2px 3px ${colors.lightGrey};
    text-align: center;
    padding-bottom: .5em;
`;

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
    }
`;

const EditCategory = styled('div')`
    label {
        display: block;
        color: ${colors.lightGrey};
    }
`;

function Category({
    categories,
    isFetching,
    onEditProduct,
    onDeleteProduct,
    onGoBack
}) {
    if (isFetching) return <Spinner />;
    if (categories) {
        console.log("categories: ", categories);

        return (
            <CategoriesComponent>
                <CategoryTitle>{dict.categories}</CategoryTitle>
                <CategoryBody>
                    {categories.map(({id, kindOfCategory}) => (
                        <CategoryBody key={id.toString()}>
                            {capitalize(kindOfCategory)}
                        </CategoryBody>
                    ))}
                </CategoryBody>
                <EditCategory>
                    <Button btnType="edit" disabled={false} onClick={onEditProduct}>{dict.edit}</Button>
                    <Button btnType="danger" disabled={false} onClick={onDeleteProduct}>{dict.delete}</Button>
                    <Button btnType="success" disabled={false} onClick={onGoBack}>{dict.back}</Button>
                </EditCategory>
            </CategoriesComponent>
        );
    } else {
        return <ErrorContainer>{dict.categoriesNotFound}</ErrorContainer>;
    }
}

export default Category;