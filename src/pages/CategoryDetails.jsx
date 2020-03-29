import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import {initSingleCategory, initDeleteCategory} from '../redux/category/category.actions.js';
import {colors, dict} from '../util/variables';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {Snackbar} from '../components/Snackbar';
//import {ErrorContainer} from '../components/forms/Components'

const PageComponent = styled('div')`
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

// const ProductBody = styled('div')`
//     padding: 1.5em .5em;
// `;

const EditCategory = styled('div')`
    label {
        display: block;
        color: ${colors.lightGrey};
    }
`;

class CategoryDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snackBarOpen: false,
            snackBarMessage: ''
        }
    }

    // showSnackbarHandler = () => {
    //     const {response} = this.props; 

    //     if (response?.status && response?.status === 200) {
    //         console.log("responseInfo status: ", response?.status)
    //         this.setState({
    //             snackBarOpen: true,
    //             snackBarMessage: dict.successfulProductDeletion 
    //         })
    //         setTimeout(() => {
    //            this.redirectBack()
    //         }, 1500);
    //     } else {
    //         console.log("responseInfo status: ", response?.status)
    //         this.setState({
    //             snackBarOpen: true,
    //             snackBarMessage: dict.errorUponProductDeletion 
    //         })
    //     }
    // }

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
            //this.showSnackbarHandler()

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

    addCategoryHandler = () => {
        console.log("Just a test for the additon of the category..")
    }

    editCategoryHandler = () => {
        console.log("Just a test for the edition of the category..")
    }

    deleteCategoryHandler = () => {
        console.log("Just a test for the deletion of the category..")
    }

    deleteCategoryHandler = () => {
        const {initDeleteProduct, loadedCategory} = this.props;
        //console.log("loadedProduct props: ", loadedProduct.stock.id)
        
        window.confirm("Are you sure you wish to delete this category?") &&
            initDeleteProduct(loadedCategory.id);
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
                <PageComponent>
                    <Snackbar snackBarOpen={snackBarOpen} snackBarMessage={snackBarMessage}/>
                    <CategoryTitle>{dict.category}</CategoryTitle>
                    <div>{loadedCategory.kindOfCategory}</div>
                    <EditCategory>
                        <Button btnType="add"       disabled={false} onClick={this.addCategoryHandler}>{dict.add}</Button>
                        <Button btnType="edit"      disabled={false} onClick={this.editCategoryHandler}>{dict.edit}</Button>
                        <Button btnType="danger"    disabled={false} onClick={this.deleteCategoryHandler}>{dict.delete}</Button>
                        <Button btnType="success"   disabled={false} onClick={this.redirectBack}>{dict.back}</Button>
                    </EditCategory>
                </PageComponent>
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