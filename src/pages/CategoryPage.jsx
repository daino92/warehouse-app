import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {initCategories} from '../redux/category/category.actions';
import Category from '../components/Category';

class CategoryPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snackBarOpen: false,
            snackBarMessage: ''
        }
    }

    componentDidMount () {
        const {initCategories} = this.props;
        initCategories();

        console.log("Category.jsx did mount: ", this.props)
    }

    addCategoryHandler = () => {
        console.log("Just a test for the additon of the category..")
    }

    editCategoryHandler = () => {
        console.log("Just a test for the edition of the category..")
    }

    deleteCategoryHandler = () => {
        console.log("Just a test for the deletion of the category..")
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/products');
    }

    // categorySelection = id => {
    //     this.props.history.push({pathname: '/categories/' + id})
    // }

    render() {
        const {categories, isFetching} = this.props;

        return (
            <Category categories={categories} isFetching={isFetching} onGoBack={this.redirectBack}
                //onSelection={this.categorySelection} 
                onAddCategory={this.addCategoryHandler}
                onEditCategory={this.editCategoryHandler} 
                onDeleteCategory={this.deleteCategoryHandler} />
        );
    }
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    isFetching: state.category.isFetching
})
  
const mapDispatchToProps = dispatch => ({
    initCategories: () => dispatch(initCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryPage));