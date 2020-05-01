import React from 'react';
import Aux from '../../../hoc/Auxillary';

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
            <p>Continue to checkout?</p>
        </Aux>
    );
}

export default orderSummary;