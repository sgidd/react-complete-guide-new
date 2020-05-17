import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;