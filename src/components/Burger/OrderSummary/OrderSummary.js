import React from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
                .map(igKey => 
                <li key={igKey}> 
                <span style={{textTransform:'capitalize'}} >{igKey}</span> : {props.ingredients[igKey]}</li>
                );

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the below Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>

        </Aux>
    );
}

export default orderSummary;