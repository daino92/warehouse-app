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
import {initAddProduct, initPopulateFields, initImage, initImageUploadProperties, initProductValidation, initClearNewProduct} from '../redux/new-product/new-product.actions';
import {initCategories} from '../redux/category/category.actions';
import {initStores} from '../redux/store/store.actions';
import {initProducers} from '../redux/producer/producer.actions';
import Spinner from '../components/Spinner';
import Dropzone from '../components/Dropzone';

class NewProduct extends Component {

    componentDidMount () {
        const {initCategories, initStores, initProducers} = this.props;
        initStores();
        initCategories();
        initProducers();

        console.log("NewProduct.jsx did mount: ", this.props);
    }

    componentDidUpdate(prevProps) {
        const {categories, stores, producers, initPopulateFields} = this.props;

        //if(prevProps.categories === categories) return;
        if(prevProps.stores === stores) return;

        /* Tweak store, producer and category response because react-select lib works with value/label keys  */
        let updatedStores = stores.map(({ id: value, address: label }) => ({ value: label, label }));
        let updatedProducers = producers.map(({ id: value, value: label, ...rest }) => ({ value, label, ...rest })); 
        let updatedCategories = categories.map(({ id: value, value: label }) => ({ value, label })); 

        const payload = {
            updatedCategories,
            updatedStores,
            updatedProducers
        }

        initPopulateFields(payload)
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
        const {productForm, initProductValidation} = this.props;

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

        const payload = {
            updatedProductForm,
            formIsValid
        }

        initProductValidation(payload)
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/');
    }

    handleClearForm = event => {
        event.preventDefault();
        this.props.initClearNewProduct();
    }

    /* callback to get fileUrl and file from DropZone component */
    shouldUpload = (fileUrl, file) => {
        const {initImageUploadProperties} = this.props;

        const payload = {
            fileUrl,
            file
        }

        initImageUploadProperties(payload)
    }
    
    formSubmitHandler = event => {
        event.preventDefault();
        const {initAddProduct, initImage, imageUrl, file, productForm} = this.props;

        const formData = {};
        for (let formElementId in productForm) {
            formData[formElementId] = productForm[formElementId].value
        }

        formData.nonProduce = false;
        formData.imageUrl = imageUrl;

        if (file !== "") {
            initImage(file)
        }

        console.log("Data inserted: ", formData)
        initAddProduct(formData);
    }

    render () {
        let redirect = null;
        const {submitted, error, isFetching, formIsValid} = this.props;
        const {sku, description, price, quantity, costEu, costUsd, karats, categoryId, producerId, address, color, goldWeight, silverWeight, otherStoneWeight, diamondWeight, otherStone} = this.props.productForm;

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

                <Dropzone 
                    label="Upload Image" maxFiles={1}
                    minSize={0} maxSize={1048576}
                    shouldUpload={this.shouldUpload} />

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
    submitted: state.newProduct.submitted,
    error: state.newProduct.error,
    isFetching: state.newProduct.isFetching,
    productForm: state.newProduct.productForm,
    formIsValid: state.newProduct.formIsValid,
    file: state.newProduct.file,
    imageUrl: state.newProduct.imageUrl,
    categories: state.category.categories,
    stores: state.store.stores,
    producers: state.producer.producers
})
  
const mapDispatchToProps = dispatch => ({
    initAddProduct: product => dispatch(initAddProduct(product)),
    initCategories: () => dispatch(initCategories()),
    initStores: () => dispatch(initStores()),
    initProducers: () => dispatch(initProducers()),
    initProductValidation: product => dispatch(initProductValidation(product)),
    initPopulateFields: lists => dispatch(initPopulateFields(lists)),
    initImage: image => dispatch(initImage(image)),
    initImageUploadProperties: imageProps => dispatch(initImageUploadProperties(imageProps)),
    initClearNewProduct: () => dispatch(initClearNewProduct())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewProduct));