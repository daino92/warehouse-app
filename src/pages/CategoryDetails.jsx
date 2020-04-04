import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import capitalize from 'lodash/capitalize';
import {initSingleCategory, initDeleteCategory} from '../redux/category/category.actions.js';
import { dict} from '../util/variables';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {Snackbar} from '../components/Snackbar';
import {MainContainer, ButtonsContainer} from '../components/Common'

const CategoryTitle = styled('h1')`
    line-height: 1.2;
`;

class CategoryDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snackBarOpen: false,
            snackBarMessage: ''
        }
    }

    showSnackbarHandler = () => {
        const {response} = this.props; 
        console.log("responseInfo status: ", response?.status)

        if (response?.status && response?.status === 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.successfulCategoryDeletion})
            
            setTimeout(() => {
               this.redirectBack()
            }, 1500);
        } else {
            this.setState({snackBarOpen: true, snackBarMessage: dict.errorUponCategoryDeletion})

            setTimeout(() => {
               this.setState({snackBarOpen: false, snackBarMessage: ''})
            }, 3500);
        }
    }

    componentDidMount () {
        console.log("ProductDetails.jsx did mount: ", this.props)
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        const {category, match, response} = this.props;
        console.log("ProductDetails.jsx did update: ", this.props);
        
        if (prevProps.match.params.id !== match.params.id && category && category.loadedCategory.id) {
            this.loadData();
        }

        if (prevProps.response !== response) {
            this.showSnackbarHandler()

            if (response?.status === 404) {
                this.redirectBack()
                //return (<ErrorContainer>{dict.productNotExist}</ErrorContainer>)
            }
        }
    }

    loadData() {
        const {match, initSingleCategory} = this.props;
        initSingleCategory(match.params.id);
    }

    editCategoryHandler = () => {
        console.log("Just a test for the edition of the category..")
    }

    deleteCategoryHandler = () => {
        const {initDeleteCategory, loadedCategory} = this.props;
        console.log("loadedCategory props: ", loadedCategory.id)
        
        window.confirm("Are you sure you wish to delete this category?") &&
            initDeleteCategory(loadedCategory.id);
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/categories');
    }

    render () {
        const {match, loadedCategory} = this.props;
        const {snackBarOpen, snackBarMessage} = this.state;

        let category = <p style={{textAlign: 'center'}}>{dict.selectProduct}</p>;

        if (match.params.id) category = <Spinner/>

        if (loadedCategory) {
            category = (
                <MainContainer>
                    <Snackbar snackBarOpen={snackBarOpen} snackBarMessage={snackBarMessage}/>
                    <CategoryTitle>{dict.category}</CategoryTitle>
                    <div>{capitalize(loadedCategory.kindOfCategory)}</div>
                    <ButtonsContainer>
                        <Button btnType="edit"      disabled={false} onClick={this.editCategoryHandler}>{dict.edit}</Button>
                        <Button btnType="danger"    disabled={false} onClick={this.deleteCategoryHandler}>{dict.delete}</Button>
                        <Button btnType="success"   disabled={false} onClick={this.redirectBack}>{dict.back}</Button>
                    </ButtonsContainer>
                </MainContainer>
            );
        }
        return category;
    }
}

const mapStateToProps = state => ({
    loadedCategory: state.category.loadedCategory,
    response: state.category.response
})
  
const mapDispatchToProps = dispatch => ({
    initSingleCategory:  id => dispatch(initSingleCategory(id)),
    initDeleteCategory: id => dispatch(initDeleteCategory(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryDetails));