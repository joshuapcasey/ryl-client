import React from 'react';
import logoTag from '../../assets/logo-tag.png';
import styled from 'styled-components';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Loader from 'react-loader-spinner';
import APIURL from '../helpers/environment';



const Logo = styled.img`
    width: 20vw;
`
const Wrapper = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`
const ErrorBox = styled.div`
    border: 1px solid #891A1C;
    padding: 20px;
    background-color: #F5CCCD;
    color: #891A1C;
    font-weight: bold;
`

const LoaderDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

type AcceptedProps = {
  updateToken: (newToken: string, newUserId: number, newRole: string) => void,
  changeView: () => void,
}

type LoginState = {
  email: string,
  password: string,
  errorDisplay: boolean,
  loading: boolean
}

class Login extends React.Component <AcceptedProps, LoginState> {
    constructor(props: AcceptedProps) {
        super (props);
        this.state = {
          email: '',
          password: '',
          errorDisplay: false,
          loading: false
      }
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e: any) {
      e.preventDefault()
      this.isLoading()
      fetch(`${APIURL}/user/login`, {
          method: 'POST',
          body: JSON.stringify({
              user: {
                  email: this.state.email,
                  password: this.state.password,
              }
          }),
          headers: new Headers({ 'Content-Type': 'application/json' })
      })
          .then((res) => { if (res.status === 200) { return res.json() } else { this.showErrorBox(); this.isLoading() } })
          // .then(console.log)
          .then(data => this.props.updateToken(data.sessionToken, data.user.id, data.user.admin))
          .then(this.isLoading)
          .catch(err => console.log(err))
  }

  showErrorBox() {
      this.setState({ errorDisplay: true })
  }
  isLoading() {
      this.setState((state) => { return { loading: !state.loading } })
  }
    render () {
        return (
          <div className='Login'> 
          {/* <Logo src={logoTag} alt="" /> */}
          <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                  <Label htmlFor='email'>Email</Label>
                  <Input type='text' value={this.state.email} onChange={(e)=> this.setState({email: e.target.value})}/>
              </FormGroup>

              <FormGroup>
                  <Label htmlFor='password'>password</Label>
                  <Input type='password' value={this.state.password} onChange={(e)=> this.setState({password: e.target.value})}/>
              </FormGroup>
              <br />
              <Button type='submit'>Log In</Button>
          </Form>
          </div>
        )
    }
}

export default Login;

