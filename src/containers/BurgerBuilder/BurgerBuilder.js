import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {...};

    // }

    state = {
        // ingredients : null,
        // totalPrice :4,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('https://react-complete-guide-new.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum, el) => {
                        return sum+el;
                    } , 0)
        return sum>0;
    }


    purchageHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () =>{
        // alert('You Continue!');

        // 223 -this.props.history.push('/checkout');

        //225 - here defined const but chaging the value : we can modify the array lements in const 
        //but can not assign new array or any new value to it 
        //like const ab = []  and then ab= 1233
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })


    }

    componentDidUpdate(){
        console.log('[BurgerBuilder] componentDidUpdate');
    }
    
    render() {

        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] =  disabledInfo[key] <=0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cant be displayed!</p> : <Spinner />
        if(this.props.ings){
            burger = (
                <Aux>
                <Burger ingredients={this.props.ings} />              
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price = {this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchageHandler}/>
                </Aux>
            );
            orderSummary  =  <OrderSummary 
            ingredients={this.props.ings} 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price}/>
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                 {/* <Backdrop show={this.state.purchasing} clicked={this.purchaseCancelHandler}/>  */}
                 {/* as per max placing it in modal as its related to modal at this point */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                            {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved : (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));