import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import axiosInstance from '../axios';
import {initSingleProduct} from '../redux/product/product.actions';
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
    state = {
        loadedProduct: null,
        error: false
    }
    
    componentDidMount () {
        console.log(this.props)
        this.loadData();
        // const {initSingleProduct} = this.props;
        // initSingleProduct();
    }

    componentDidUpdate() {
        console.log(this.props)
        // const {initSingleProduct} = this.props;
        // initSingleProduct();
        this.loadData();
    }

    loadData() {
        const {loadedProduct} = this.state;
        const {match, initSingleProduct} = this.props;
        
        if (match.params.id) {
            if (!loadedProduct || (loadedProduct && loadedProduct.id != match.params.id)) {
                axiosInstance.get('/posts/' + match.params.id)
                    .then(response => {
                        console.log("Data of individual product: ", response);
                        this.setState({loadedProduct: response.data});
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }

    deleteProductHandler = () => {
        const {match} = this.props;

        window.confirm("Are you sure you wish to delete this product?") &&
 
        axiosInstance.delete('/posts/' + match.params.id)
            .then(response => {
                console.log(response);
                //return (<p>Successful deletion!</p>)
                this.redirectBack();
            }).catch(error => {
                this.setState({error: true})
                this.redirectBack();
            });
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/products');
    }

    render () {
        const {loadedProduct, error} = this.state;
        const {match} = this.props;

        let product = <p style={{textAlign: 'center'}}>{dict.selectProduct}</p>;
        if (match.params.id) product = <Spinner/>

        if (error) return (<ErrorContainer>{dict.errorUponPostDeletion}</ErrorContainer>)
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
    product: state.product.product
})
  
const mapDispatchToProps = dispatch => ({
    initSingleProduct: () => dispatch(initSingleProduct())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));