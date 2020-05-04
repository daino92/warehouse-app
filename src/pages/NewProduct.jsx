import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateObject} from '../util/utilities';
import {validations} from '../util/validations';
import TextInput from '../components/forms/TextInput';
import TextArea from '../components/forms/TextArea';
import Select2 from '../components/forms/Select2';
import Radio from '../components/forms/RadioButton';
import Button from '../components/Button';
import {dict} from '../util/variables';
import {ErrorContainer, MainContainer, FlexCentered} from '../components/Common';
import {initCategories} from '../redux/category/category.actions';
import {initAddProduct, initImage} from '../redux/product/product.actions';
import {initStores} from '../redux/store/store.actions';
import {initProducers} from '../redux/producer/producer.actions';
import Spinner from '../components/Spinner';
import DropZone from '../components/Dropzone-uploader'

const getInitialState = () => {
    return ({
        formIsValid: false,
        imageUrl: "",
        productForm: {
            sku: {
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
                    maxLength: 7,
                    isRequired: true
                },
                validationMessage: 'SKU should have at least 5 letters'
            },
            goldWeight: {
                label: 'Gold weight',
                params: {
                    placeholder: 'Gold weight',
                    type: 'input'
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 1,
                    maxLength: 5,
                    isRequired: true,
                    isNumeric: true,
                },
                validationMessage: 'This field is required and it should have 1-5 letters'
            },
            silverWeight: {
                label: 'Silver weight',
                params: {
                    placeholder: 'Silver weight',
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
            otherStoneWeight: {
                label: 'Other Stone weight',
                params: {
                    placeholder: 'Other Stone weight',
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
            diamondWeight: {
                label: 'Diamond weight',
                params: {
                    placeholder: 'Diamond weight',
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
            quantity: {
                label: 'Quantity',
                params: {
                    placeholder: 'Quantity',
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
            otherStone: {
                label: 'Other stones',
                params: {
                    placeholder: 'Other stones',
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
            karats: {
                label: 'Karats',
                params: {
                    placeholder: 'Karats',
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
            description: {
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
            costEu: {
                label: 'Product price EU',
                params: {
                    placeholder: 'Product price EU',
                    type: 'input'
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    isRequired: true
                }
            },
            costUsd: {
                label: 'Product price USD',
                params: {
                    placeholder: 'Product price USD',
                    type: 'input',
                },
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    isRequired: true
                }
            },
            categoryId: {
                label: 'Product Category',
                value: '',
                valid: false,   
                touched: false,           
                options: [],
                validationRules: {
                    isRequired: true
                }
            },
            producerId: {
                label: 'Producer Category',
                value: '',
                valid: false,   
                touched: false,           
                options: [],
                validationRules: {
                    isRequired: true
                }
            },
            address: {
                label: 'Shop availability',
                value: '',
                valid: false,   
                touched: false,          
                options: [],
                validationRules: {
                    isRequired: true
                }
            },
            color: {
                label: 'Product color',
                value: '',
                valid: false,
                touched: false,
                params: {
                    type: 'radio'
                },
                options: [
                    { value: 'Yellow',  isChecked: false},
                    { value: 'White',   isChecked: false},
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
        const {initCategories, initStores, initProducers} = this.props;
        initStores();
        initCategories();
        initProducers();

        console.log("NewProduct.jsx did mount: ", this.props);
    }

    componentDidUpdate(prevProps) {
        const {categories, stores, producers} = this.props;

        //if(prevProps.categories === categories) return;
        if(prevProps.stores === stores) return;

        /* Tweak store, producer and category response because react-select lib works with value/label keys  */
        let updatedStores = stores.map(({ id: value, address: label }) => ({ value: label, label }));
        let updatedProducers = producers.map(({ id: value, value: label, ...rest }) => ({ value, label, ...rest })); 
        let updatedCategories = categories.map(({ id: value, value: label }) => ({ value, label })); 

        this.setState({
            ...this.state,
            productForm: {
                ...this.state.productForm,
                categoryId: {
                    ...this.state.productForm.categoryId,
                    options: [
                        ...updatedCategories
                    ]
                },
                address: {
                    ...this.state.productForm.address,
                    options: [
                        ...updatedStores
                    ]
                },
                producerId: {
                    ...this.state.productForm.producerId,
                    options: [
                        ...updatedProducers
                    ]
                }
            }
        });
    }

    /* Helper function to send info to changeHandler for react-select library */
    changeSelect2Handler = name => ({value, label}) => {
        this.changeHandler({
            target: {
                name,
                value
            }
        })
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

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/');
    }

    handleClearForm = event => {
        event.preventDefault();
        this.setState(getInitialState());
    }

    /* callback to get fileUrl from DropZone component */
    getFileURL = fileUrl => {
        this.setState({imageUrl: fileUrl})
    }
    
    formSubmitHandler = event => {
        event.preventDefault();
        const {initAddProduct} = this.props;
        const {imageUrl} = this.state;

        const formData = {};
        const {productForm} = this.state;
        for (let formElementId in productForm) {
            formData[formElementId] = productForm[formElementId].value
        }

        formData.nonProduce = false;
        formData.imageUrl = imageUrl;

        console.log("Data inserted: ", formData)
        initAddProduct(formData);
    }

    render () {
        let redirect = null;
        const {submitted, error, isFetching} = this.props;
        const {formIsValid} = this.state;
        const {sku, description, price, quantity, costEu, costUsd, karats, categoryId, producerId, address, color, goldWeight, silverWeight, otherStoneWeight, diamondWeight, otherStone} = this.state.productForm;

        if (submitted) redirect = <Redirect to="/"/>;

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
            <form>
                <TextInput name="sku" type={sku.params.type}
                    placeholder={sku.params.placeholder} label={sku.label}
                    value={sku.value} valid={sku.valid} touched={sku.touched}
                    maxLength={sku.validationRules.maxLength} onChange={this.changeHandler}
                    validationMessage={sku.validationMessage} />

                <TextArea name="description"
                    placeholder={description.params.placeholder} label={description.label}
                    value={description.value} valid={description.valid} touched={description.touched}
                    onChange={this.changeHandler} rows={description.params.rows} />

                <TextInput name="goldWeight" type={goldWeight.params.type}
                    placeholder={goldWeight.params.placeholder} label={goldWeight.label}
                    value={goldWeight.value} valid={goldWeight.valid} touched={goldWeight.touched}
                    maxLength={goldWeight.validationRules.maxLength} onChange={this.changeHandler}
                    validationMessage={goldWeight.validationMessage} />

                <TextInput name="silverWeight" type={silverWeight.params.type}
                    placeholder={silverWeight.params.placeholder} label={silverWeight.label}
                    value={silverWeight.value} valid={silverWeight.valid} touched={silverWeight.touched}
                    maxLength={silverWeight.validationRules.maxLength} onChange={this.changeHandler} />

                <TextInput name="otherStoneWeight" type={otherStoneWeight.params.type}
                    placeholder={otherStoneWeight.params.placeholder} label={otherStoneWeight.label}
                    value={otherStoneWeight.value} valid={otherStoneWeight.valid} touched={otherStoneWeight.touched}
                    maxLength={otherStoneWeight.validationRules.maxLength} onChange={this.changeHandler} />

                <TextInput name="diamondWeight" type={diamondWeight.params.type}
                    placeholder={diamondWeight.params.placeholder} label={diamondWeight.label}
                    value={diamondWeight.value} valid={diamondWeight.valid} touched={diamondWeight.touched}
                    maxLength={diamondWeight.validationRules.maxLength} onChange={this.changeHandler} />

                <TextInput name="quantity" type={quantity.params.type}
                    placeholder={quantity.params.placeholder} label={quantity.label}
                    value={quantity.value} valid={quantity.valid} touched={quantity.touched}
                    maxLength={quantity.validationRules.maxLength} onChange={this.changeHandler} />

                <TextInput name="otherStone" type={otherStone.params.type}
                    placeholder={otherStone.params.placeholder} label={otherStone.label}
                    value={otherStone.value} valid={otherStone.valid} touched={otherStone.touched}
                    maxLength={otherStone.validationRules.maxLength} onChange={this.changeHandler} />

                <TextInput name="price" type={price.params.type}
                    placeholder={price.params.placeholder} label={price.label}
                    value={price.value} touched={price.touched} valid={price.valid}
                    maxLength={price.validationRules.maxLength} onChange={this.changeHandler} />
                
                <TextInput name="karats" type={karats.params.type}
                    placeholder={karats.params.placeholder} label={karats.label}
                    value={karats.value} valid={karats.valid} touched={karats.touched}
                    maxLength={karats.validationRules.maxLength} onChange={this.changeHandler} />

                <TextInput name="costEu" type={costEu.params.type}
                    placeholder={costEu.params.placeholder} label={costEu.label}
                    value={costEu.value} valid={costEu.valid} touched={costEu.touched}
                    maxLength={costEu.validationRules.maxLength} onChange={this.changeHandler} />

                <TextInput name="costUsd" type={costUsd.params.type}
                    placeholder={costUsd.params.placeholder} label={costUsd.label}
                    value={costUsd.value} valid={costUsd.valid} touched={costUsd.touched}
                    maxLength={costUsd.validationRules.maxLength} onChange={this.changeHandler} />

                <Select2 name="categoryId"
                    placeholder={categoryId.value ? categoryId.value : "Select..."}
                    label={categoryId.label} valid={categoryId.valid} touched={categoryId.touched} 
                    options={categoryId.options} onChange={this.changeSelect2Handler("categoryId")} />

                <Select2 name="address"
                    placeholder={address.value ? address.value : "Select..."}
                    label={address.label} valid={address.valid} touched={address.touched} 
                    options={address.options} onChange={this.changeSelect2Handler("address")} />

                <Select2 name="producerId"
                    placeholder={producerId.value ? producerId.value : "Select..."}
                    label={producerId.label} valid={producerId.valid} touched={producerId.touched} 
                    options={producerId.options} onChange={this.changeSelect2Handler("producerId")} />

                <Radio name="color"
                    label={color.label} options={color.options} type={color.params.type}
                    value={color.value} valid={color.valid} touched={color.touched}
                    onChange={this.changeHandler} />

                <DropZone 
                    label="Upload Image" maxFiles={1}
                    minSize={0} maxSize={1048576}
                    fileDestinaton={this.getFileURL} />

                <FlexCentered>
                    <Button btnType="success"   disabled={!formIsValid} onClick={this.formSubmitHandler} >{dict.submit}</Button>
                    <Button btnType="danger"    disabled={false}        onClick={this.handleClearForm}>{dict.clear}</Button>
                    <Button btnType='success'   disabled={false}        onClick={this.redirectBack}>{dict.back}</Button>
                </FlexCentered> 
            </form>
        );  

        return (
            <MainContainer>
                {redirect}
                <h1>{dict.addNewProduct}</h1>
                {form}                
            </MainContainer>
        );
    }
}

const mapStateToProps = state => ({
    submitted: state.product.submitted,
    error: state.product.error,
    stores: state.store.stores,
    categories: state.category.categories,
    producers: state.producer.producers,
    isFetching: state.product.isFetching
})
  
const mapDispatchToProps = dispatch => ({
    initAddProduct: product => dispatch(initAddProduct(product)),
    initCategories: () => dispatch(initCategories()),
    initProducers: () => dispatch(initProducers()),
    initStores: () => dispatch(initStores()),
    initImage: image => dispatch(initImage(image))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewProduct));