import React, { Component } from 'react';
import BurgerIngredient from './Burgeringredient/Burgeringredient';
import Aux from '../../hoc/Auxillary';

class Burger extends Component {
    render(){
        return(
            <Aux>
                <BurgerIngredient type="bread-top" />
                <BurgerIngredient type="meat" />
                <BurgerIngredient type="cheese" />
                <BurgerIngredient type="bacon" />
                <BurgerIngredient type="salad" />
                <BurgerIngredient type="bread-bottom" />
            </Aux>
        );
    }
}

export default Burger;