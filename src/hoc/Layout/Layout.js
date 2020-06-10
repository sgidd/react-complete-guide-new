import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component {

    state={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () =>{
        // const showSideDrawer = this.state.showSideDrawer;
        this.setState({showSideDrawer : false});
    }

    sideDrawerToggleHandler = () =>{
        // this.setState({showSideDrawer: !this.state.showSideDrawer});// this approch has flaw

        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuthenticated}/>
                    
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);