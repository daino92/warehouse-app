import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateObject} from '../util/utilities';
import {validations} from '../util/validations';
import TextInput from '../components/forms/TextInput';
import Button from '../components/Button';
import {dict} from '../util/variables';
import {ErrorContainer, ButtonsContainer, MainContainer} from '../components/Common';
import {initAddCategory} from '../redux/category/category.actions.js';
import {Snackbar} from '../components/Snackbar';
import Spinner from '../components/Spinner';

const getInitialState = () => {
    return ({
        formIsValid: false,
        categoryForm: {
            kindOfCategory: {
                label: 'Category name',
                params: {
                    placeholder: 'Category name',
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
        snackBarMessage: ''
    });
}

class NewCategory extends Component {
    state = getInitialState();

    componentDidMount () {
        console.log("NewCategory.jsx did mount: ", this.props);
    }

    componentDidUpdate(prevProps, prevState) {
        const {response} = this.props;
        console.log("NewCategory.jsx did update: ", this.props);

        if (prevProps.response !== response) {
            this.showSnackbarHandler()

            if (response?.status === 404) {
                this.redirectBack()
            }
        }
    }

    showSnackbarHandler = () => {
        const {response} = this.props; 
        console.log("responseInfo status: ", response?.status)

        if (response?.status && response?.status === 200) {
            this.setState({snackBarOpen: true,snackBarMessage: dict.successfulCategoryAddition})

            setTimeout(() => {
               this.redirectBack()
            }, 1500);
        } 
        else if (response?.status && response?.status === 409) {
            this.setState({snackBarOpen: true,snackBarMessage: dict.categoryAlreadyExists})
        }
        else {
            this.setState({snackBarOpen: true, snackBarMessage: dict.errorUponCategoryAddition})
            setTimeout(() => {
               this.setState({snackBarOpen: false, snackBarMessage: ''})
            }, 3500);
        }
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/categories');
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

    handleClearForm = event => {
        event.preventDefault();
        this.setState(getInitialState());
    }
    
    formSubmitHandler = event => {
        event.preventDefault();
        const {initAddCategory} = this.props;
        const {categoryForm} = this.state;

        const formData = {};
        for (let formElementId in categoryForm) {
            formData[formElementId] = categoryForm[formElementId].value
        }

        console.log("Data inserted: ", formData)
        initAddCategory(formData);
    }

    render () {
        const {error, isFetching, response} = this.props;
        const {formIsValid, snackBarOpen, snackBarMessage} = this.state;
        const {params, label, value, touched, valid} = this.state.categoryForm.kindOfCategory;
        console.log("lalala", response)
        //if (error) return <ErrorContainer>{dict.errorUponProductAddition}</ErrorContainer>

        if (isFetching) return <Spinner/>

        let form = (
            <>
                <form>
                    <TextInput name="kindOfCategory" type={params.type}
                        placeholder={params.placeholder} label={label}
                        value={value} valid={valid} touched={touched}
                        onChange={this.changeHandler} />

                    <ButtonsContainer>
                        <Button btnType="success"   disabled={!formIsValid} onClick={this.formSubmitHandler} >{dict.submit}</Button>
                        <Button btnType="danger"    disabled={false}        onClick={this.handleClearForm}>{dict.clear}</Button>
                        <Button btnType='success'   disabled={false}        onClick={this.redirectBack}>{dict.back}</Button>
                    </ButtonsContainer> 
                </form> 
            </>
        );  

        return (
            <MainContainer>
                <Snackbar snackBarOpen={snackBarOpen} snackBarMessage={snackBarMessage}/>
                <h1>{dict.addNewCategory}</h1>
                {form}                
            </MainContainer>
        );
    }
}

const mapStateToProps = state => ({
    error: state.category.error,
    response: state.category.response,
    isFetching: state.category.isFetching
})
  
const mapDispatchToProps = dispatch => ({
    initAddCategory: category => dispatch(initAddCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewCategory));