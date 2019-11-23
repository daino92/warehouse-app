import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import {initSingleProduct, initDeleteProduct} from '../redux/product/product.actions';
import Spinner from './Spinner';
import Button from './Button';
import {colors, dict} from '../util/variables';
import {ErrorContainer} from '../components/forms/Components';

const FullProduct = styled('div')`
    width: 80%;
    margin: 20px auto;
    border: 1px solid ${colors.whisper};
    box-shadow: 0 2px 3px ${colors.lightGrey};
    text-align: center;
    padding-bottom: .5em;
`;

const ProductTitle = styled('h1')`
    line-height: 1.2;
`;

const ProductBody = styled('p')`
    padding: 1.5em .5em;
`;

const EditProduct = styled('div')`
    label {
        display: block;
        color: grey;
    }
`;

class ProductDetails extends Component {
    componentDidMount () {
        console.log(this.props)
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const {product, match} = this.props;

        if (prevProps.match.params.id !== match.params.id && product && product.loadedProduct.id) {
            this.loadData();
        }
    }

    loadData() {
        const {match, initSingleProduct} = this.props;
        initSingleProduct(match.params.id);
    }

    deleteProductHandler = () => {
        const {match, initDeleteProduct} = this.props;

        window.confirm("Are you sure you wish to delete this product?") &&
        initDeleteProduct(match.params.id);

        // axiosInstance.delete('/posts/' + match.params.id)
        //     .then(response => {
        //         console.log(response);
        //         //return (<p>Successful deletion!</p>)
        //         this.redirectBack();
        //     }).catch(error => {
        //         this.setState({error: true})
        //         this.redirectBack();
        //     });
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/products');
    }

    render () {
        const {error, match, loadedProduct} = this.props;

        let product = <p style={{textAlign: 'center'}}>{dict.selectProduct}</p>;
        if (match.params.id) product = <Spinner/>

        if (error) return (
            <ErrorContainer>{dict.errorUponPostDeletion}</ErrorContainer>
        )
        // if (!error) return (<h1>{dict.successfulPostDeletion}</h1>)
        if (loadedProduct) {
            product = (
                <FullProduct>
                    <ProductTitle>{loadedProduct.title}</ProductTitle>
                    <ProductBody>{loadedProduct.body}</ProductBody>
                    <EditProduct>
                        <Button btnType='danger'  disabled={false}  onClick={this.deleteProductHandler}>{dict.delete}</Button>
                        <Button btnType='success' disabled={false}  onClick={this.redirectBack}>{dict.back}</Button>
                    </EditProduct>
                </FullProduct>
            );
        }
        return product;
    }
}

const mapStateToProps = state => ({
    loadedProduct: state.product.loadedProduct,
    error: state.product.error
})
  
const mapDispatchToProps = dispatch => ({
    initSingleProduct: id => dispatch(initSingleProduct(id)),
    initDeleteProduct: id => dispatch(initDeleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));