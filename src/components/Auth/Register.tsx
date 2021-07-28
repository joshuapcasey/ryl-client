import React, { FormEvent } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../helpers/environment';


type AcceptedProps = {
    updateToken: (newToken: string, newUserId: number, newRole: string) => void,
    changeView: () => void,
    handleTryIt: ()=> void
}

type RegisterState ={
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: boolean,
  tooltipOpen: boolean,
  loading: boolean
}

class Register extends React.Component <AcceptedProps, RegisterState> {
    constructor(props: AcceptedProps) {
        super (props)
        this.state={
          firstName: '',
          lastName: '',
            email: '',
            password: '',
            role: false,
            tooltipOpen: false,
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
      this.setState((state)=>{
          return {tooltipOpen: !state.tooltipOpen}
      })
    }

    handleSubmit(e: FormEvent){
        e.preventDefault()
        this.isLoading()
        console.log('handling submit');
        // this.toArray()
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ 
                user:{
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    emailAddress: this.state.email,
                    password: this.state.password,
                    role: this.state.role
                }})
        })
        .then(res => res.json())
        // .then(console.log)
        .then(data => this.props.updateToken(data.sessionToken, data.user.id, data.user.admin))
        .then(this.isLoading)
        .catch(err => console.log(err))
    }
    
    isLoading() {
        this.setState((state) => { return { loading: !state.loading } })
    }

    render () {
        return (
        <div className="Register">
            <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor='firstName'>First Name</Label>
                        <Input type='text' value={this.state.firstName} onChange={(e)=>this.setState({firstName: e.target.value})}/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Input type='text' value={this.state.lastName} onChange={(e)=>this.setState({lastName: e.target.value})}/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='text' value={this.state.email} onChange={(e)=>this.setState({email: e.target.value})}/>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='password'>Password</Label>
                        <Input type='password' value={this.state.password} onChange={(e)=>this.setState({password: e.target.value})}/>
                    </FormGroup>
                
                    <Button type='submit'>Register</Button>
                </Form>
        </div>
        );
    }
}

export default Register;