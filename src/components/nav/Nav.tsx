import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import LandlordTable from '../landlord/LandlordTable';
import UserProfile from '../profile/UserProfile';


type AcceptedProps = {
    clickLogout: () => void,
    isUserAuthenticated: boolean
}


class NavBar extends React.Component <AcceptedProps, {}> {
    constructor(props: AcceptedProps) {
        super (props)
        
        
    }
    Nav = styled.nav`
    list-style: none;
    `

    NavLinks = styled.div`
    display: flex;
    `

    LogOutButton = styled.button`
    color: #ffffff;
    `

    render () {
        return (
        <div className="NavBar">
            <this.Nav>
                <this.NavLinks>
                <li><Link className='NavLinks' to='/landlord'>Landlord</Link></li>
                <li><Link className='NavLinks' to='/profile'>Profile</Link></li>
                </this.NavLinks>

                <this.LogOutButton onClick={this.props.clickLogout}>

                </this.LogOutButton>
            </this.Nav>
            
            <Switch>
                <Route
                    exact
                    path="/"
                    render = {() => {
                        return (
                            this.props.isUserAuthenticated ?
                            <Redirect to="/home" /> :
                            null
                        )
                    }} />
                <Route exact path='/landlord'><LandlordTable /></Route>
                <Route exact path='/profile'><UserProfile /></Route>

            </Switch>
        </div>
        );
    }
}

export default NavBar;