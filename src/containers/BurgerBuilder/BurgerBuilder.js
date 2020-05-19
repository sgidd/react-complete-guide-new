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

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {...};

    // }

    state = {
        ingredients : null,
        totalPrice :4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-complete-guide-new.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        })
    }

    updatePurchaseState(ingredients) {
        // const ingredients ={
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum, el) => {
                        return sum+el;
                    } , 0)
        this.setState({purchasable : sum>0})
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice =  this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice , ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler =  (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0) {
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice : newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    purchageHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () =>{
        // alert('You Continue!');

        this.setState({loading: true});
        const order ={
            ingredients : this.state.ingredients,
            price: this.state.totalPrice,
            customer : {
                name: 'Sunil Gidd',
                address: {
                    street :'Teststreet 1',
                    zipcode: '560067',
                    country: 'India'
                },
                email:'sunilgidd@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.j', order)
        .then(response => {
            console.log(response);
            this.setState({loading: false, purchasing: false});
        })
        .catch(error => {
            console.log(error);
            this.setState({loading: false, purchasing: false});
        });
    }

    componentDidUpdate(){
        console.log('[BurgerBuilder] componentDidUpdate');
    }
    
    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] =  disabledInfo[key] <=0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cant be displayed!</p> : <Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients} />              
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchageHandler}/>
                </Aux>
            );
            orderSummary  =  <OrderSummary 
            ingredients={this.state.ingredients} 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>
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

export default withErrorHandler(BurgerBuilder, axios);