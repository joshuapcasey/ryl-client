// import { type } from 'os';
import React from 'react';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import styled from 'styled-components';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

type AcceptedProps = {
    updateToken: (newToken: string, newUserId: number, newRole: string) => void
}

type LandingState = {
    loginView: boolean,
    loading: boolean
}

class Auth extends React.Component <AcceptedProps, LandingState> {
    constructor(props: AcceptedProps) {
    super(props);
    this.state = {
        loginView: true,
        loading: false
    }
    this.changeView = this.changeView.bind(this);
    this.handleTryIt = this.handleTryIt.bind(this)
    }

    changeView() {
        this.setState( {
            loginView: !this.state.loginView
        })
        // console.log(this.state.loginView);
    }

    handleTryIt(){
        fetch('https://jpc-ryl-client.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({
                user:{
                    emailAddress: 'jdoe@gmail.com',
                    password: 'password',
                }}),
                headers: new Headers({'Content-Type': 'application/json'})
        })
        .then(res => res.json())
        // .then(console.log)
        .then(data => this.props.updateToken(data.sessionToken, data.user.id, data.user.admin))
        .catch(err => console.log(err))
    }

    render () {
        return (
        <div className="Auth">
            <Form>
                <Login updateToken={this.props.updateToken} changeView={this.changeView} 
                />
            </Form>
            <Form>
                <Register updateToken={this.props.updateToken} changeView={this.changeView}handleTryIt={this.handleTryIt}  />
            </Form>        
        </div>
        );
    }
}

export default Auth;