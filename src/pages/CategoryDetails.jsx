import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import capitalize from 'lodash/capitalize';
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {initSingleCategory, initDeleteCategory, initUpdateCategory, initEditCategory, initCategoryValidation} from '../redux/category/category.actions.js';
import { dict} from '../util/variables';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {Snackbar} from '../components/Snackbar';
import TextInput from '../components/forms/TextInput';
import {updateObject} from '../util/utilities';
import {validations} from '../util/validations';
import {MainContainer, FlexCentered, ModalWarning} from '../components/Common';

const CategoryTitle = styled('h1')({
    lineHeight: 1.2
});

const CategoryName = styled('div')({
    padding: "1em",
    fontSize: "1.2em"
});

class CategoryDetails extends Component {
    state = {
        snackBarOpen: false,
        snackBarMessage: '',
        openModal: false
    }

    onOpenModal = () => {
        this.setState({ openModal: true });
    };

    onCloseModal = () => {
        this.setState({ openModal: false });
    };
    
    componentDidMount () {
        console.log("ProductDetails.jsx did mount: ", this.props)
        this.loadData();
    }

    componentWillUnmount() {
        const {onUnload} = this.props;
        onUnload();
    }

    componentDidUpdate(prevProps, prevState) {
        const {category, match, response, updated} = this.props;
        console.log("ProductDetails.jsx did update: ", this.props);
        
        if (prevProps.match.params.id !== match.params.id && category && category.loadedCategory.id) {
            this.loadData();
        }

        if ((prevProps.response !== response) || (prevProps.updated !== updated)) {
            this.showSnackbarHandler()

            // if (response?.status === 404 || updated?.status === 404) {
            //     this.redirectBack()
            // }
        }
    }

    loadData() {
        const {match, initSingleCategory} = this.props;
        initSingleCategory(match.params.id);
    }

    showSnackbarHandler = () => {
        const {response, updated} = this.props; 
        console.log(`responseInfo status: ${response?.status} and updateInfo status: ${updated?.status}`)

        if (response?.status && response?.status === 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.successfulCategoryDeletion})
            
            setTimeout(() => {
               this.redirectBack()
            }, 1500);
        } 
        if (updated?.status && updated?.status === 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.successfulCategoryUpdate})
            
            setTimeout(() => {
               this.redirectBack()
            }, 1500);
        } 
        if (response?.status && response?.status !== 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.errorUponCategoryDeletion})
            
            setTimeout(() => {
                this.setState({snackBarOpen: false, snackBarMessage: ''})
            }, 3500);
        } 
        if (updated?.status && updated?.status !== 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.errorUponCategoryUpdate})

            setTimeout(() => {
               this.setState({snackBarOpen: false, snackBarMessage: ''})
            }, 3500);
        }
    }

    editCategoryHandler = () => {
        const {loadedCategory, initEditCategory} = this.props
        initEditCategory(loadedCategory.value)
    }

    deleteCategoryHandler = () => {
        const {initDeleteCategory, loadedCategory} = this.props;
        initDeleteCategory(loadedCategory.id);
    }

    changeHandler = event => {
        const {categoryForm, initCategoryValidation} = this.props;
        const name = event.target.name;
        const value = event.target.value;

        const updatedCategoryElement = updateObject(categoryForm[name], {
            value: value,
            valid: validations(value, categoryForm[name].validationRules),
            touched: true
        })

        const updatedCategoryForm = updateObject(categoryForm, {
            [name]: updatedCategoryElement
        })
  
        let formIsValid = true;
        for (let inputIdentifier in updatedCategoryForm) {
            formIsValid = updatedCategoryForm[inputIdentifier].valid && formIsValid;
        }

        const payload = {
            updatedCategoryForm,
            formIsValid
        }

        initCategoryValidation(payload)
    }

    formSubmitHandler = event => {
        event.preventDefault();

        const {initUpdateCategory, match} = this.props;
        const {categoryForm} = this.props;

        const formData = {};
        for (let formElementId in categoryForm) {
            formData[formElementId] = categoryForm[formElementId].value
        }

        /* Insert categoryId to the payload */
        formData.id = match.params.id;

        initUpdateCategory(formData)
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/categories');
    }

    render () {
        const {match, loadedCategory, response, formIsValid, editable} = this.props;
        const {snackBarOpen, snackBarMessage, openModal} = this.state;
        const {params, value, touched, valid} = this.props.categoryForm.value;

        let category;

        if (response?.status === 404) return <p style={{textAlign: 'center'}}>{dict.categoryNotFound}</p>

        if (match.params.id) category = <Spinner/>

        if (loadedCategory) {
            const capitalizedValue = capitalize(loadedCategory.value);
            category = (
                <MainContainer>
                    <Modal center open={openModal} onClose={this.onCloseModal}>
                        <ModalWarning>{dict.categoryDeletionMessage}</ModalWarning>   
                        <FlexCentered>
                            <Button btnType="danger" disabled={false} onClick={() => {
                                    this.onCloseModal()
                                    this.deleteCategoryHandler()}}>{dict.yes}</Button>
                            <Button btnType="edit"   disabled={false} onClick={this.onCloseModal}>{dict.no}</Button>
                        </FlexCentered> 
                    </Modal>
                    <Snackbar snackBarOpen={snackBarOpen} snackBarMessage={snackBarMessage}/>
                    <CategoryTitle>{dict.category}</CategoryTitle>
                    { editable ? 
                        <FlexCentered>
                            <TextInput 
                                name="value" 
                                type={params.type}
                                placeholder={params.placeholder} 
                                value={value} valid={valid} 
                                touched={touched}
                                onChange={this.changeHandler} />
                        </FlexCentered> :
                        <CategoryName>{capitalizedValue}</CategoryName>
                         }
                    <FlexCentered>
                        <Button btnType="edit"    disabled={false} onClick={this.editCategoryHandler}>{dict.edit}</Button>
                    { editable ? 
                        <Button btnType="success" disabled={!formIsValid} onClick={this.formSubmitHandler}>{dict.submit}</Button> : null }
                    { !editable ?   
                        <Button btnType="danger"  disabled={false} onClick={this.onOpenModal}>{dict.delete}</Button> : null }
                        <Button btnType="success" disabled={false} onClick={this.redirectBack}>{dict.back}</Button>
                    </FlexCentered>
                </MainContainer>
            );
        }
        return category;
    }
}

const mapStateToProps = state => ({
    loadedCategory: state.category.loadedCategory,
    response: state.category.response,
    updated: state.category.updated,
    editable: state.category.editable,
    formIsValid: state.category.formIsValid,
    categoryForm: state.category.categoryForm
})
  
const mapDispatchToProps = dispatch => ({
    initSingleCategory: id => dispatch(initSingleCategory(id)),
    initDeleteCategory: id => dispatch(initDeleteCategory(id)),
    initUpdateCategory: id => dispatch(initUpdateCategory(id)),
    initEditCategory: category => dispatch(initEditCategory(category)),
    initCategoryValidation: category => dispatch(initCategoryValidation(category)),
    onUnload: () => dispatch({type: 'PAGE_UNLOADED'})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryDetails));