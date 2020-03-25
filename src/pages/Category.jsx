import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import capitalize from 'lodash/capitalize';
import styled from '@emotion/styled';
import {initCategories} from '../redux/product/product.actions';
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

class Category extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snackBarOpen: false,
            snackBarMessage: ''
        }
    }

    componentDidMount () {
        const {initCategories} = this.props;
        initCategories();

        console.log("Category.jsx did mount: ", this.props)
    }

    editProductHandler = () => {
        console.log("Just a test for the edition of the category..")
    }

    deleteProductHandler = () => {
        console.log("Just a test for the deletion of the category..")
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/products');
    }

    render () {
        const {categories, isFetching} = this.props;

        console.log("categories: ", categories)

        if (isFetching) return <Spinner/>

        return (
            <>
                <CategoriesComponent>
                    <CategoryTitle>{dict.categories}</CategoryTitle>
                    <CategoryBody>
                    {
                    categories ?
                        categories.map(({id, kindOfCategory}) => {
                            const capitalizedCategories = capitalize(kindOfCategory)
                            return (
                                <CategoryBody key={id.toString()}>
                                    {capitalizedCategories}
                                </CategoryBody>
                            )
                        }) : (<ErrorContainer>{dict.categoriesNotFound}</ErrorContainer>)
                    }
                    </CategoryBody>
                    <EditCategory>
                        <Button btnType='edit'      disabled={false}  onClick={this.editProductHandler}>{dict.edit}</Button>
                        <Button btnType='danger'    disabled={false}  onClick={this.deleteProductHandler}>{dict.delete}</Button>
                        <Button btnType='success'   disabled={false}  onClick={this.redirectBack}>{dict.back}</Button>
                    </EditCategory>
                </CategoriesComponent>
            </>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.product.categories,
    response: state.product.response,
    isFetching: state.product.isFetching
})
  
const mapDispatchToProps = dispatch => ({
    initCategories: () => dispatch(initCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Category));