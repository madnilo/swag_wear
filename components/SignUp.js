import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'


const SIGN_UP_MUTATION = gql`
    mutation SIGN_UP_MUTATION(
        $email: String!,
        $name: String!,
        $password: String!
    ) {
        signup(email: $email, name: $name, password: $password){
            id
            email
            name
        }
    }
`

export default class SignUp extends Component {
    state = {
        email: '',
        name: '',
        password: '',
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    clearState(){
        this.setState({name: '', email: '', password: ''})
    }

    render() {
        const { name, email, password } = this.state
        return (
            <Mutation
                mutation={SIGN_UP_MUTATION}
                variables={this.state}>
                {(signup, { error, loading }) => {
                    return (
                        <Form method="post" onSubmit={async e => {
                            e.preventDefault()
                            const res = await signup()
                            this.clearState()
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <ErrorMessage error={error} />
                                <h2>Sign Up for An Account</h2>
                                <label htmlFor='email'>
                                    Email
                                    <input
                                        type='text'
                                        name='email'
                                        placeholder='email'
                                        value={email}
                                        onChange={this.handleChange} />
                                </label>
                                <label htmlFor='name'>
                                    Name
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder='name'
                                        value={name}
                                        onChange={this.handleChange} />
                                </label>
                                <label htmlFor='password'>
                                    Password
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder='********'
                                        value={password}
                                        onChange={this.handleChange} />
                                </label>

                                <button type="submit">Sign Up!</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        )
    }
}
