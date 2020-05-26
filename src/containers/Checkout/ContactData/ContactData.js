import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state={
        orderForm: {
            customer : {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeHolder:'Your Name'
                    },
                    value:''
                },
                street :{
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeHolder:'Your Street'
                    },
                    value:''
                }
                ,
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeHolder:'Zip Code'
                    },
                    value:''
                }
                ,
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeHolder:'Your Country'
                    },
                    value:''
                }
                ,     
                email:{
                    elementType: 'input',
                    elementConfig: {
                        type:'email',
                        placeHolder:'Your Email'
                    },
                    value:''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options : [
                            {value: 'fastest', displayValue:'fastest'},
                            {value: 'cheapest', displayValue:'Cheapest'}
                        ]
                    },
                    value:''
                }
            }
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        
        this.setState({loading: true});
        const order ={
            ingredients : this.props.ingredients,
            price: this.props.price,
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            console.log(response);
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error);
            this.setState({loading: false});
        });
    }
    render() {
        let form = (
            <form>
            <Input  elementType="..." elementConfig="..." value="..." />
            <Input  inputtype="input" type="email" name="email" placeholder="Your Email" />
            <Input  inputtype="input" type="text" name="street" placeholder="Your Street" />
            <Input  inputtype="input" type="text" name="postal" placeholder="Your Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;