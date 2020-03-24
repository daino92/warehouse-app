import React, {Component} from "react";
import {connect} from "react-redux";
import styled from "@emotion/styled";
import {initHistory} from '../redux/product/product.actions';
import {colors, dict} from '../util/variables';
import Spinner from '../components/Spinner';

const HistoryContainer = styled("section")`
    display: flex;
    flex-flow: row wrap;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    margin: auto;
`;

const ProductHistoryContainer = styled("div")`
    width: 35%;
    padding: 1em;
    border: 1px solid ${colors.whisper};
    box-shadow: 0 2px 3px ${colors.lightGrey};
    margin: 10px;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    flex-grow: 1;
    background-color: ${colors.solitude};
	border-radius: .5em;
`;

const AttributesColumn = styled("div")`
    /* width: 20%; */
 
`;

const Attributes = styled("div")`

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
                                <Attributes>{dict.time}: {timestamp}</Attributes>
                                <Attributes>{dict.color}: {color}</Attributes>
                                <Attributes>{dict.productID}: {productId}</Attributes>
                                <Attributes>{dict.quantity}: {quantity}</Attributes>
                            </AttributesColumn>
                            <AttributesColumn>
                                <Attributes>{dict.goldWeight}: {gold_weight}</Attributes>
                                <Attributes>{dict.silverWeight}: {silver_weight}</Attributes>
                                <Attributes>{dict.stoneWeight}: {stoneWeight}</Attributes>
                                <Attributes>{dict.karats}: {karats}</Attributes>
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