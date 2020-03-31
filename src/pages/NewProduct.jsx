import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import {updateObject} from '../util/utilities';
import {validations} from '../util/validations';
import TextInput from '../components/forms/TextInput';
import TextArea from '../components/forms/TextArea';
import Select from '../components/forms/Select';
import Radio from '../components/forms/RadioButton';
import Button from '../components/Button';
import {dict} from '../util/variables';
import {ErrorContainer} from '../components/forms/Components';
import {initCategories} from '../redux/category/category.actions';
import {initAddProduct} from '../redux/product/product.actions';
import Spinner from '../components/Spinner';

const NewPostContainer = styled('div')`
    width: 80%;
    margin: 20px auto;
    padding-bottom: .5em;
    border: 1px solid #EEE;
    box-shadow: 0 2px 3px #CCC;
    text-align: center;

    form {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
`;

const ButtonsContainer = styled('div')`
    margin: 0 auto;
    width: 100%;
`;

const getInitialState = () => {
    return ({
        formIsValid: false,
        productForm: {
            productName: {
                label: 'Product name',
                params: {
                    placeholder: 'Product name',
                    type: 'input'
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    isRequired: true
                }
            },
            productSKU: {
                label: 'Product SKU',
                params: {
                    placeholder: 'Product SKU',
                    type: 'input'
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 5,
                    maxLength: 5,
                    isRequired: true
                }
            },
            weight: {
                label: 'Product weight',
                params: {
                    placeholder: 'Product weight',
                    type: 'input'
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 1,
                    maxLength: 5,
                    isRequired: true,
                    isNumeric: true
                }
            },
            productDescription: {
                label: 'Product description',
                params: {
                    placeholder: 'Product description',
                    rows: 2,
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    isRequired: true
                }
            },
            price: {
                label: 'Product price',
                params: {
                    placeholder: 'Product price',
                    type: 'input'
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    isRequired: true
                }
            },
            netPrice: {
                label: 'Product net price',
                params: {
                    placeholder: 'Product net price',
                    type: 'input',
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    isRequired: true
                }
            },
            productCategory: {
                label: 'Product Category',
                value: 'Pendants',
                valid: true,              
                options: [
                    {value: 'Pendants', displayValue: 'Pendants'},
                    // {value: 'test1', displayValue: 'test1'},
                    // {value: 'test2', displayValue: 'test2'},
                ],
                validationRules: {

                }
            },
            shopAvailability: {
                label: 'Shop availability',
                value: 'office',
                valid: true,              
                options: [
                    {value: 'office', displayValue: 'Office'},
                    {value: 'kifisia', displayValue: 'Kifisia'},
                    {value: 'shop3', displayValue: 'shop3'},
                ],
                validationRules: {

                }
            },
            color: {
                label: 'Product color',
                value: 'Black',
                valid: true,
                touched: true,
                params: {
                    type: 'radio'
                },
                options: [
                    { value: 'Yellow',  isChecked: false},
                    { value: 'White',   isChecked: true},
                    { value: 'Rose',    isChecked: false},
                    { value: 'Black',   isChecked: false}
                ],
                validationRules: {
                   
                }
            }
        }
    });
}

class NewProduct extends Component {
    state = getInitialState();

    componentDidMount () {
        const {initCategories} = this.props;
        initCategories();

        console.log("NewProduct.jsx did mount: ", this.props);
    }

    componentDidUpdate(prevProps) {
        const {categories} = this.props;

        //console.log("categories: ", categories)

        if(prevProps.categories === categories) return;
        
        this.x= this.setState({
            ...this.state,
            productForm: {
                ...this.state.productForm,
                productCategory: {
                    ...this.state.productForm.productCategory,
                    options: categories
                },
                // shopAvailability: {
                //     ...this.state.productForm.shopAvailability,
                //     options: ...
                // }
            }
        });
    }

    changeHandler = event => {
        const {productForm} = this.state;
        const name = event.target.name;
        const value = event.target.type === "checkbox" 
            ? event.target.checked : event.target.value;

        const updatedFormElement = updateObject(productForm[name], {
            value: value,
            valid: validations(value, productForm[name].validationRules),
            touched: true
        })

        const updatedProductForm = updateObject(productForm, {
            [name]: updatedFormElement
        })
  
        let formIsValid = true;
        for (let inputIdentifier in updatedProductForm) {
            formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
        }
  
        this.setState({productForm: updatedProductForm, formIsValid: formIsValid});
    }

    handleClearForm = event => {
        event.preventDefault();
        this.setState(getInitialState());
       //this.setState(this.x)
    }
    
    formSubmitHandler = event => {
        event.preventDefault();
        const {initAddProduct} = this.props;

        const formData = {};
        const {productForm} = this.state;
        for (let formElementId in productForm) {
            formData[formElementId] = productForm[formElementId].value
        }
        console.log(productForm);

        const data = {
            productForm: formData
        };

        initAddProduct(data);
    }

    render () {
        let redirect = null;
        const {submitted, error, isFetching} = this.props;
        const {formIsValid} = this.state;
        const {productName, productSKU, weight, productDescription, price, netPrice, productCategory, shopAvailability, color} = this.state.productForm;

        if (submitted) redirect = <Redirect to="/products"/>;

        if (error) return <ErrorContainer>{dict.errorUponProductAddition}</ErrorContainer>

        if (isFetching) return <Spinner/>

        // const formElementsArray = [];
        // for (let key in productForm) {
        //     formElementsArray.push({
        //         id: key,
        //         attr: productForm[key]
        //     })
            
        // }
        // console.log("Form: ", formElementsArray)

        let form = (
            <>
                <form>
                    <TextInput name="productName" type={productName.params.type}
                        placeholder={productName.params.placeholder} label={productName.label}
                        value={productName.value} valid={productName.valid} touched={productName.touched}
                        onChange={this.changeHandler} />
                        {/* {errorMessage.email && (<ErrorContainer>{errorMessage.email}</ErrorContainer>)} */}

                    <TextInput name="productSKU" type={productSKU.params.type}
                        placeholder={productSKU.params.placeholder} label={productSKU.label}
                        value={productSKU.value} valid={productSKU.valid} touched={productSKU.touched}
                        maxLength={productSKU.validationRules.maxLength} onChange={this.changeHandler} />

                    <TextInput name="weight" type={weight.params.type}
                        placeholder={weight.params.placeholder} label={weight.label}
                        value={weight.value} valid={weight.valid} touched={weight.touched}
                        maxLength={weight.validationRules.maxLength} onChange={this.changeHandler} />

                    <TextInput name="price" type={price.params.type}
                        placeholder={price.params.placeholder} label={price.label}
                        value={price.value} touched={price.touched} valid={price.valid}
                        maxLength={price.validationRules.maxLength} onChange={this.changeHandler} />

                    <TextArea name="productDescription"
                        placeholder={productDescription.params.placeholder} label={productDescription.label}
                        value={productDescription.value} valid={productDescription.valid} touched={productDescription.touched}
                        onChange={this.changeHandler} rows={productDescription.params.rows} />

                    <TextInput name="netPrice" type={netPrice.params.type}
                        placeholder={netPrice.params.placeholder} label={netPrice.label}
                        value={netPrice.value} valid={netPrice.valid} touched={netPrice.touched}
                        maxLength={netPrice.validationRules.maxLength} onChange={this.changeHandler} />

                    <Select name="productCategory"
                        label={productCategory.label} options={productCategory.options}
                        value={productCategory.value} valid={productCategory.valid} touched={productCategory.touched}
                        onChange={this.changeHandler} />
                        
                    <Select name="shopAvailability"
                        label={shopAvailability.label} options={shopAvailability.options}
                        value={shopAvailability.value} valid={shopAvailability.valid} touched={shopAvailability.touched}
                        onChange={this.changeHandler} />

                    <Radio name="color"
                        label={color.label} options={color.options} type={color.params.type}
                        value={color.value} valid={color.valid} touched={color.touched}
                        onChange={this.changeHandler} />

                    <ButtonsContainer>
                        <Button btnType="success" onClick={this.formSubmitHandler} disabled={!formIsValid}>{dict.submit}</Button>
                        <Button btnType="danger" onClick={this.handleClearForm}>{dict.clear}</Button>
                    </ButtonsContainer> 
                </form> 
            </>
        );  

        return (
            <NewPostContainer>
                {redirect}
                <h1>{dict.addNewProduct}</h1>
                {form}                
            </NewPostContainer>
        );
    }
}

const mapStateToProps = state => ({
    submitted: state.product.submitted,
    error: state.product.error,
    categories: state.category.categories,
    isFetching: state.product.isFetching
})
  
const mapDispatchToProps = dispatch => ({
    initAddProduct: product => dispatch(initAddProduct(product)),
    initCategories: () => dispatch(initCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewProduct));