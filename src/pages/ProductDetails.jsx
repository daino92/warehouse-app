import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import get from 'lodash/get';
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {initSingleProduct, initDeleteProduct, initDisableProduct} from '../redux/product/product.actions';
import {initCategories, initSingleCategory} from '../redux/category/category.actions';
import {initProducers, initSingleProducer} from '../redux/producer/producer.actions';
import {initStores} from '../redux/store/store.actions';
import {initEditProduct, initProductValidation, initUpdateProduct, initImage, initImageUploadProperties, initPopulateFields} from '../redux/new-product/new-product.actions';
import TextInput from '../components/forms/TextInput';
import TextArea from '../components/forms/TextArea';
import Dropzone from '../components/Dropzone';
import {updateObject} from '../util/utilities';
import {validations} from '../util/validations';
import {dict} from '../util/variables';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {Snackbar} from '../components/Snackbar';
import imagePlaceholder from '../assets/no-image-icon.png';
import mq from '../util/mediaQueries.js';
import {MainContainer, FlexCentered, ModalWarning} from '../components/Common';

const ProductTitle = styled('h1')({
    fontSize: "2.4em"
});

const ProductBody = styled('div')({
    display: "flex",
    flexWrap: "wrap"
},
mq({
    padding: ["1em", "4em"]
}));

const ProductImage = styled('div')({
    display: "flex",
    justifyContent: "center"
},
mq({
    width: ["100%", "100%", "50%"]
}));

const ImageComponent = styled('div')({
	width: "100%",
    maxWidth: "90%",
    borderRadius: "1em",
    backgroundSize: "contain",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
},
mq({
    height: ["150px", "230px", "100%"]
}));

const ProductInformation = styled('div')({
    display: "flex",
    flexWrap: "wrap"
},
mq({
    width: ["100%", "100%", "50%"]
}));

const AttributesColumn = styled("div")({
    "> div": {
        padding: ".2em"
    }
},
mq({
    width: ["100%", "100%", "50%"]
}));

const InformationTitle = styled('div')({
    fontSize: "2em",
    width: "100%",
    fontWeight: 700,
    padding: ".4em"
});

const OtherShops = styled('div')({
    margin: "0 auto"
});

class ProductDetails extends Component {
    state = {
        snackBarOpen: false,
        snackBarMessage: '',
        openModalDisable: false,
        openModalDelete: false
    }

    showSnackbarHandler = () => {
        const {response, updated} = this.props; 
        console.log(`responseInfo status: ${response?.status} and updateInfo status: ${updated?.status}`)

        if (response?.status && response?.status === 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.successfulProductDeletion})
            
            setTimeout(() => {
               this.redirectBack()
            }, 1500);
        } 
        if (updated?.status && updated?.status === 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.successfulProductUpdate})
            
            setTimeout(() => {
               this.redirectBack()
            }, 1500);
        } 
        if (response?.status && response?.status !== 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.errorUponProductDeletion})
            
            setTimeout(() => {
                this.setState({snackBarOpen: false, snackBarMessage: ''})
            }, 3500);
        } 
        if (updated?.status && updated?.status !== 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.errorUponProductUpdate})

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
        const {product, match, response, updated} = this.props;
        console.log("ProductDetails.jsx did update: ", this.props);
        
        if (prevProps.match.params.stockId !== match.params.stockId && product && product.loadedProduct.stock.id) {
            this.loadData();
        }

        if ((prevProps.response !== response) || (prevProps.updated !== updated)) {
            this.showSnackbarHandler()
        }
    }

    onOpenModalDisable = () => {
        this.setState({ openModalDisable: true });
    };

    onCloseModalDisable = () => {
        this.setState({ openModalDisable: false });
    };

    onOpenModalDelete = () => {
        this.setState({ openModalDelete: true });
    };

    onCloseModalDelete = () => {
        this.setState({ openModalDelete: false });
    };

    loadData = () => {
        const {match, history, initSingleProduct, initCategories, initProducers, initStores, initSingleProducer, initSingleCategory} = this.props;

        if (history.location.state) {
            // initSingleProducer(history.location.state?.producerId);
            // initSingleCategory(history.location.state?.categoryId);
            initCategories();
            initProducers();
        } else {
            initCategories();
            initProducers();
        }
        initStores();
        initSingleProduct(match.params.productId);
    }

    addProductHandler = () => {
        const {history} = this.props;
        const path = (history.location.pathname).split('/')[1];
        history.push({pathname: `/${path}/new-product`})
    }

    editProductHandler = () => {
        const {loadedProduct, initEditProduct, categories, stores, producers, initPopulateFields} = this.props;

        initEditProduct(loadedProduct[0][0])

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

    /* callback to get fileUrl and file from DropZone component */
    shouldUpload = (fileUrl, file) => {
        const {initImageUploadProperties} = this.props;

        const payload = {
            fileUrl,
            file
        }

        console.log("PAYLOAD: ", payload)

        initImageUploadProperties(payload)

        this.changeHandler({
            target: {
                name: "imageUrl",
                value: fileUrl
            }
        })
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

        console.log("updatedProductForm",updatedProductForm)

        initProductValidation(payload)
    }

    formSubmitHandler = event => {
        event.preventDefault();
        const {match, initUpdateProduct, initImage, imageUrl, file, productForm} = this.props;

        const formData = {};
        for (let formElementId in productForm) {
            formData[formElementId] = productForm[formElementId].value
        }
         /* Insert categoryId to the payload */
        formData.id = match.params.productId;
        console.log("imageUrl", imageUrl)
        formData.nonProduce = false;
        if (imageUrl !== "") {
            formData.imageUrl = imageUrl.value;
        }

        if (file !== "") {
            initImage(file)
        }

        console.log("Data inserted: ", formData)
        initUpdateProduct(formData);
    }

    disableProductHandler = () => {
        const {initDisableProduct, loadedProduct} = this.props;
        initDisableProduct(loadedProduct[0][0])
    }

    componentWillUnmount() {
        const {onUnload} = this.props;
        onUnload();
    }

    deleteProductHandler = () => {
        const {initDeleteProduct, loadedProduct} = this.props;
        initDeleteProduct(loadedProduct[0][0].sku);
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/products/Kifisia/1');
    }

    render () {
        const {match, loadedProduct, categories, producers, loadedproducer, loadedCategory, response, editable, formIsValid} = this.props;
        const {description, price, quantity, costEu, costUsd, karats, goldWeight, otherStoneWeight, diamondWeight, otherStone, imageUrl} = this.props.productForm;
        
        const {snackBarOpen, snackBarMessage, openModalDisable, openModalDelete} = this.state;

        console.log("props", this.props)

        let product;       

        if (response?.status === 404) return <p style={{textAlign: 'center'}}>{dict.productNotFound}</p>
        
        if (match.params.productId) product = <Spinner/>

        if (loadedProduct) {
            const currentProduct = get(loadedProduct, '[0][0]', 0);
            const otherStock1    = get(loadedProduct, '[1][0][0].other', "");
            const otherStock2    = get(loadedProduct, '[1][0][1].other', "");
            const zeroQuantity   = currentProduct.quantity === 0;
            const zeroQuantityOtherShops = otherStock1?.quantity || otherStock2?.quantity === 0;

            const imageSource = currentProduct.imageUrl === "" || currentProduct.imageUrl === null ? imagePlaceholder : currentProduct.imageUrl;

            let _categoryId = get(loadedProduct, '[0][0].categoryId', "");
            let _producerId = get(loadedProduct, '[0][0].producerId', "");

            let category = categories.find(cat => cat.id  === _categoryId);
            let producer = producers.find(prod => prod.id === _producerId);

            let producerValue = "";
            let categoryValue = "";

            if (loadedproducer?.value) {
                producerValue = loadedproducer?.value;
            } else {
                producerValue = producer?.value;
            }

            if (loadedCategory?.value) {
                categoryValue = loadedCategory?.value;
            } else {
                categoryValue = category?.value;
            }

            product = (
                <MainContainer>
                    <Modal center open={openModalDisable} onClose={this.onCloseModalDisable}>
                        <ModalWarning>{dict.productDisableMessage}</ModalWarning>   
                        <FlexCentered>
                            <Button btnType="danger" disabled={false} onClick={() => {
                                    this.onCloseModalDisable()
                                    this.disableProductHandler()}}>{dict.yes}</Button>
                            <Button btnType="edit"   disabled={false} onClick={this.onCloseModalDisable}>{dict.no}</Button>
                        </FlexCentered> 
                    </Modal>
                    <Modal center open={openModalDelete} onClose={this.onCloseModalDelete}>
                        <ModalWarning>{dict.productDeleteMessage}</ModalWarning>   
                        <FlexCentered>
                            <Button btnType="danger" disabled={false} onClick={() => {
                                    this.onCloseModalDelete()
                                    this.deleteProductHandler()}}>{dict.yes}</Button>
                            <Button btnType="edit"   disabled={false} onClick={this.onCloseModalDelete}>{dict.no}</Button>
                        </FlexCentered> 
                    </Modal>
                    <Snackbar snackBarOpen={snackBarOpen} snackBarMessage={snackBarMessage}/>
                    { editable ? 
                        <form>
                            <TextInput name="quantity" type={quantity.params.type}
                                placeholder={quantity.params.placeholder} label={quantity.label}
                                value={quantity.value} valid={quantity.valid} touched={quantity.touched}
                                minLength={quantity.validationRules.minLength}
                                maxLength={quantity.validationRules.maxLength}
                                onChange={this.changeHandler} 
                                validationMessage={quantity.validationMessage} />

                            <TextInput name="goldWeight" type={goldWeight.params.type}
                                placeholder={goldWeight.params.placeholder} label={goldWeight.label}
                                value={goldWeight.value} valid={goldWeight.valid} touched={goldWeight.touched}
                                minLength={goldWeight.validationRules.minLength}
                                maxLength={goldWeight.validationRules.maxLength}
                                onChange={this.changeHandler}
                                validationMessage={goldWeight.validationMessage} />

                            <TextInput name="diamondWeight" type={diamondWeight.params.type}
                                placeholder={diamondWeight.params.placeholder} label={diamondWeight.label}
                                value={diamondWeight.value} valid={diamondWeight.valid} touched={diamondWeight.touched}
                                minLength={diamondWeight.validationRules.minLength}
                                maxLength={diamondWeight.validationRules.maxLength}
                                onChange={this.changeHandler} 
                                validationMessage={diamondWeight.validationMessage} />

                            <TextInput name="price" type={price.params.type}
                                placeholder={price.params.placeholder} label={price.label}
                                value={price.value} touched={price.touched} valid={price.valid}
                                minLength={price.validationRules.minLength}
                                maxLength={price.validationRules.maxLength}
                                onChange={this.changeHandler}
                                validationMessage={price.validationMessage} />

                            <TextInput name="karats" type={karats.params.type}
                                placeholder={karats.params.placeholder} label={karats.label}
                                value={karats.value} valid={karats.valid} touched={karats.touched}
                                onChange={this.changeHandler}
                                validationMessage={karats.validationMessage} />

                            <TextInput name="costEu" type={costEu.params.type}
                                placeholder={costEu.params.placeholder} label={costEu.label}
                                value={costEu.value} valid={costEu.valid} touched={costEu.touched}
                                minLength={costEu.validationRules.minLength}
                                maxLength={costEu.validationRules.maxLength} 
                                onChange={this.changeHandler}
                                validationMessage={costEu.validationMessage} />

                            <TextInput name="costUsd" type={costUsd.params.type}
                                placeholder={costUsd.params.placeholder} label={costUsd.label}
                                value={costUsd.value} valid={costUsd.valid} touched={costUsd.touched}
                                minLength={costUsd.validationRules.minLength}
                                maxLength={costUsd.validationRules.maxLength}
                                onChange={this.changeHandler}
                                validationMessage={costUsd.validationMessage} />

                            <TextArea name="description"
                                placeholder={description.params.placeholder} label={description.label}
                                value={description.value} valid={description.valid} touched={description.touched}
                                minLength={description.validationRules.minLength}
                                maxLength={description.validationRules.maxLength}
                                rows={description.params.rows}
                                onChange={this.changeHandler} />

                            <TextArea name="otherStone" type={otherStone.params.type}
                                placeholder={otherStone.params.placeholder} label={otherStone.label}
                                value={otherStone.value} valid={otherStone.valid} touched={otherStone.touched}
                                minLength={otherStone.validationRules.minLength}
                                maxLength={otherStone.validationRules.maxLength}
                                rows={otherStone.params.rows}
                                onChange={this.changeHandler} />

                            <TextInput name="otherStoneWeight" type={otherStoneWeight.params.type}
                                placeholder={otherStoneWeight.params.placeholder} label={otherStoneWeight.label}
                                value={otherStoneWeight.value} valid={otherStoneWeight.valid} touched={otherStoneWeight.touched}
                                minLength={otherStoneWeight.validationRules.minLength}
                                maxLength={otherStoneWeight.validationRules.maxLength}
                                onChange={this.changeHandler}
                                validationMessage={otherStoneWeight.validationMessage} />

                            <Dropzone name="imageUrl"
                                label={imageUrl.label} maxFiles={imageUrl.maxFiles}
                                minSize={imageUrl.minSize} 
                                maxSize={imageUrl.maxSize}
                                shouldUpload={this.shouldUpload} /> 

                        </form> :
                        <>
                            <ProductTitle>{currentProduct.sku}</ProductTitle>
                            <ProductBody>
                                <ProductImage>
                                    <ImageComponent alt={currentProduct.description} style={{backgroundImage: `url(${imageSource})`}}/>
                                </ProductImage>
                                <ProductInformation>
                                    <InformationTitle>{dict.productInfo}</InformationTitle>
                                    <AttributesColumn>
                                        <div>{dict.producerCode}: {producerValue}</div>
                                        <div>{dict.description}: {currentProduct.description}</div>
                                        <div>{dict.karats}: {currentProduct.karats}</div>
                                        <div>{dict.color}: {currentProduct.color}</div>
                                        <div>{dict.costDollars}: {currentProduct.costUsd}$</div>
                                        <div>{dict.costEuro}: {currentProduct.costEu}€</div>
                                    </AttributesColumn>
                                    <AttributesColumn>
                                        <div>{dict.stones}: {currentProduct.otherStone}</div>
                                        <div>{dict.goldWeight}: {currentProduct.goldWeight}</div>
                                        <div>{dict.silverWeight}: {currentProduct.silverWeight}</div>
                                        <div>{dict.stoneWeight}: {currentProduct.otherStoneWeight}</div>
                                        <div>{dict.quantity}: {zeroQuantity ? <>{dict.noStock}</> : currentProduct.quantity}</div>
                                        <div>{dict.category}: {categoryValue}</div>
                                    </AttributesColumn>

                                    {otherStock1 && otherStock2 &&
                                        <OtherShops>  
                                            <InformationTitle>{dict.otherShops}</InformationTitle> 
                                            <div>{otherStock1.address} : {dict.quantity}: {zeroQuantityOtherShops ? <>{dict.noStock}</> : otherStock1.quantity}</div>
                                            <div>{otherStock2.address} : {dict.quantity}: {zeroQuantityOtherShops ? <>{dict.noStock}</> : otherStock2.quantity}</div>
                                        </OtherShops>
                                    }
                                </ProductInformation>
                            </ProductBody>
                        </>
                    }
                    <FlexCentered>
                        <Button btnType='edit'    disabled={false} onClick={this.editProductHandler}>{dict.edit}</Button>
                    { editable ? 
                        <Button btnType="success" disabled={!formIsValid} onClick={this.formSubmitHandler}>{dict.submit}</Button> : null }
                    { !editable ?   
                        <>
                            <Button btnType="add"    disabled={false} onClick={this.addProductHandler}>{dict.add}</Button>
                            <Button btnType='danger' disabled={false} onClick={this.onOpenModalDisable}>{dict.disable}</Button>
                            <Button btnType='danger' disabled={false} onClick={this.onOpenModalDelete}>{dict.delete}</Button> 
                        </> : null }
                        <Button btnType='success' disabled={false} onClick={this.redirectBack}>{dict.back}</Button>
                    </FlexCentered>
                </MainContainer>
            );
        }
        return product;
    }
}

const mapStateToProps = state => ({
    loadedProduct: state.product.loadedProduct,
    loadedproducer: state.producer.loadedproducer,
    loadedCategory: state.category.loadedCategory,
    categories: state.category.categories,
    stores: state.store.stores,
    producers: state.producer.producers,
    response: state.product.response,
    updated: state.newProduct.updated,
    editable: state.newProduct.editable,
    file: state.newProduct.file,
    imageUrl: state.newProduct.imageUrl,
    productForm: state.newProduct.productForm,
    formIsValid: state.newProduct.formIsValid,
})
  
const mapDispatchToProps = dispatch => ({
    initSingleProduct: productId => dispatch(initSingleProduct(productId)),
    initDeleteProduct: productId => dispatch(initDeleteProduct(productId)),
    initDisableProduct: productId => dispatch(initDisableProduct(productId)),
    initUpdateProduct: product => dispatch(initUpdateProduct(product)),
    initCategories: () => dispatch(initCategories()),
    initProducers: () => dispatch(initProducers()),
    initStores: () => dispatch(initStores()),
    initEditProduct: product => dispatch(initEditProduct(product)),
    initPopulateFields: lists => dispatch(initPopulateFields(lists)),
    initProductValidation: product => dispatch(initProductValidation(product)),
    initSingleCategory: (categoryId) => dispatch(initSingleCategory(categoryId)),
    initImage: image => dispatch(initImage(image)),
    initSingleProducer: (producerId) => dispatch(initSingleProducer(producerId)),
    initImageUploadProperties: imageProps => dispatch(initImageUploadProperties(imageProps)),
    onUnload: () => dispatch({type: 'PAGE_UNLOADED'})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));