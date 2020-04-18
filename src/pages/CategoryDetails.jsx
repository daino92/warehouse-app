import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import capitalize from 'lodash/capitalize';
import {initSingleCategory, initDeleteCategory, initUpdateCategory} from '../redux/category/category.actions.js';
import { dict} from '../util/variables';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {Snackbar} from '../components/Snackbar';
import TextInput from '../components/forms/TextInput';
import {updateObject} from '../util/utilities';
import {validations} from '../util/validations';
import {MainContainer, ButtonsContainer, FlexCentered} from '../components/Common';

const CategoryTitle = styled('h1')`
    line-height: 1.2;
`;

const CategoryName = styled('div')({
    padding: "1em",
    fontSize: "1.2em"
});

class CategoryDetails extends Component {
    state = {
        formIsValid: false,
        categoryForm: {
            value: {
                params: {
                    type: 'input'
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    isRequired: true
                }
            }
        },
        snackBarOpen: false,
        snackBarMessage: '',
        editable: false
    }
    
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
        const {loadedCategory} = this.props
        this.setState(prevState => ({
            ...this.state,
            categoryForm: {
                ...this.state.categoryForm,
                value: {
                    ...this.state.categoryForm.value,
                    value: loadedCategory.value
                }
            },
            editable: !prevState.editable
        }));
    }

    deleteCategoryHandler = () => {
        const {initDeleteCategory, loadedCategory} = this.props;
        console.log("loadedCategory props: ", loadedCategory.id)
        
        window.confirm("Are you sure you wish to delete this category?") &&
            initDeleteCategory(loadedCategory.id);
    }

    changeHandler = event => {
        const {categoryForm} = this.state;
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
  
        this.setState({categoryForm: updatedCategoryForm, formIsValid: formIsValid});
    }

    formSubmitHandler = event => {
        event.preventDefault();

        const {initUpdateCategory, match} = this.props;
        const {categoryForm} = this.state;

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
        const {match, loadedCategory, response} = this.props;
        const {snackBarOpen, snackBarMessage, editable, formIsValid} = this.state;
        const {params, value, touched, valid} = this.state.categoryForm.value;

        let category;

        if (response?.status === 404) return <p style={{textAlign: 'center'}}>{dict.categoryNotFound}</p>

        if (match.params.id) category = <Spinner/>

        if (loadedCategory) {
            const capitalizedValue = capitalize(loadedCategory.value);
            category = (
                <MainContainer>
                    <Snackbar snackBarOpen={snackBarOpen} snackBarMessage={snackBarMessage}/>
                    <CategoryTitle>{dict.category}</CategoryTitle>
                    { editable ? 
                        <FlexCentered>
                            <TextInput name="value" type={params.type}
                                placeholder={params.placeholder} 
                                value={value} valid={valid} 
                                touched={touched}
                                onChange={this.changeHandler} />
                        </FlexCentered> :
                        <CategoryName>{capitalizedValue}</CategoryName>
                         }
                    <ButtonsContainer>
                    { editable ? 
                        <Button btnType="success"   disabled={!formIsValid} onClick={this.formSubmitHandler} >{dict.submit}</Button> : null }
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
    response: state.category.response,
    updated: state.category.updated
})
  
const mapDispatchToProps = dispatch => ({
    initSingleCategory: id => dispatch(initSingleCategory(id)),
    initDeleteCategory: id => dispatch(initDeleteCategory(id)),
    initUpdateCategory: id => dispatch(initUpdateCategory(id)),
    onUnload: () => dispatch({type: 'PAGE_UNLOADED'})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryDetails));