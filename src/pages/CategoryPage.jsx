import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {initCategories} from '../redux/category/category.actions';
import IndividualCategory from '../components/IndividualCategory';

class CategoryPage extends Component {
    state = {
        selectedCategoryId: null,
        selected: false
    }

    componentDidMount () {
        const {initCategories} = this.props;
        initCategories();
        
        console.log("Category.jsx did mount: ", this.props)
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/products');
    }

    categorySelection = id => {
        this.setState({selectedCategoryId: id});
        this.props.history.push({pathname: '/categories/' + id})
        this.setState({selected: true}) 
    }

    render() {
        const {categories, isFetching} = this.props;
 
        return (
            <IndividualCategory categories={categories} 
                isFetching={isFetching} 
                onGoBack={this.redirectBack}
                clicked={(id) => this.categorySelection(id)} 
            />
        );
    }
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    isFetching: state.category.isFetching,
    selectedCategoryId: state.category.selectedCategoryId
})
  
const mapDispatchToProps = dispatch => ({
    initCategories: () => dispatch(initCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryPage));