import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import Router from 'next/router'
import formatMoney from '../lib/formatMoney'
import ErrorMessage from './ErrorMessage'

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!){
        item(where: { id: $id }){
            id
            title
            description
            price
        }
    }
`

const UPDATE_ITEM_MUTATION = gql`
mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
    id
    title
    description
    price
    }
}
`;

class UpdateItem extends Component {
    state = {}

    handleChange = event => {
        const { name, type, value } = event.target
        const realValue = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: realValue })
    }

    updateItem = async (e, updateItemMutation) => {
        e.preventDefault()
        const res = await updateItemMutation({
            variables: {
                id: this.props.id,
                ...this.state
            }
        })
        // Router.push({
        //     pathname: '/item',
        //     query: { id: this.props.id }
        // })
    }


    render() {
        const { id } = this.props
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
                {({ data, loading }) => {
                    if (loading) return <p>Loading...</p>
                    if (!data.item) return <p>No item found with this ID...</p>
                    return (
                        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                            {(updateItem, { loading, error }) => (
                                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                                    <ErrorMessage error={error} />
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <label htmlFor="title">
                                            Title
                                            <input type="text" id="title" name="title" defaultValue={data.item.title}
                                                placeholder="Title" required onChange={this.handleChange} />
                                        </label>
                                        <label htmlFor="price">
                                            Price
                                            <input type="number" id="price" name="price" defaultValue={data.item.price}
                                                required onChange={this.handleChange} />
                                        </label>
                                        <label htmlFor="description">
                                            Description
                                            <textarea type="text" id="description" name="description" defaultValue={data.item.description}
                                                placeholder="Description" required onChange={this.handleChange}></textarea>
                                        </label>
                                        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes{loading && '...'}</button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        )
    }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
