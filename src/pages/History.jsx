import React, {Component} from "react";
import {connect} from "react-redux";
import styled from "@emotion/styled";
import {initHistory} from '../redux/product/product.actions';
import {colors, dict} from '../util/variables';
import Spinner from '../components/Spinner';

const HistoryContainer = styled("section")`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 80%;
    margin: auto;
`;

const ProductHistoryContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    padding: 1em;
    width: 48%;
    border: 1px solid ${colors.whisper};
	border-radius: .5em;
    box-shadow: 0 2px 3px ${colors.lightGrey};
    background-color: ${colors.solitude};
`;

const AttributesColumn = styled("div")`

`;

const Attributes = styled("div")`
    padding: 2px 20px 0px 2px;
    margin-right: 5px;

    label {
        font-weight: 700;
    }
`;

class History extends Component {

    componentDidMount () {
        const {initHistory} = this.props;
        initHistory();

        console.log("History.jsx did mount: ", this.props);
    }

    render() {
        const {products, isFetching} = this.props;

        if (isFetching) return <Spinner/>

        return (
            <>
                <HistoryContainer>
                    {products.map(({id, timestamp, stock: {color, productId, quantity, gold_weight, stoneWeight, karats, silver_weight}}) => (
                        <ProductHistoryContainer key={id.toString()}>
                            <AttributesColumn>
                                <Attributes>
                                    <label>{dict.time}: </label> {timestamp}
                                </Attributes>
                                <Attributes>
                                    <label>{dict.color}: </label> {color}
                                </Attributes>
                                <Attributes>
                                    <label>{dict.productID}: </label> {productId}
                                </Attributes>
                                <Attributes>
                                    <label>{dict.quantity}: </label> {quantity > 0 ? quantity : <>{dict.noStock}</> }
                                </Attributes>
                            </AttributesColumn>
                            <AttributesColumn>
                                <Attributes>
                                    <label>{dict.goldWeight}: </label> {gold_weight}
                                </Attributes>
                                <Attributes>
                                    <label>{dict.silverWeight}: </label> {silver_weight}
                                </Attributes>
                                <Attributes>
                                    <label>{dict.stoneWeight}: </label> {stoneWeight}
                                </Attributes>
                                <Attributes>
                                    <label>{dict.karats}: </label> {karats}
                                </Attributes>
                            </AttributesColumn> 
                        </ProductHistoryContainer>
                    ))}
                </HistoryContainer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    isFetching: state.product.isFetching
})

const mapDispatchToProps = dispatch => ({
    initHistory: () => dispatch(initHistory())
})

export default connect(mapStateToProps, mapDispatchToProps)(History);