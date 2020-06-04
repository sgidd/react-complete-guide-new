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
import * as actions from '../../store/actions/index';


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
        // loading: false,
        // error: false
    }

    componentDidMount(){
        // axios.get('https://react-complete-guide-new.firebaseio.com/ingredients.json')
        // .then(response => {
        //     // this.setState({ingredients: response.data});
        //     console.log(response);
        //     this.props.onIngredientAdded('salad')
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // })
      
        this.props.onInitIngredients();
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


    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () =>{
        this.props.onInitPurchase();
     this.props.history.push('checkout');
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
        let burger = this.props.error ? <p>Ingredients cant be displayed!</p> : <Spinner />
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
                    ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary  =  <OrderSummary 
            ingredients={this.props.ings} 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price}/>
        }
        // if(this.state.loading) {
        //     orderSummary = <Spinner />
        // }
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ()=> dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));