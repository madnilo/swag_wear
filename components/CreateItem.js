import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import gql from 'react-apollo'
import { MutationStore } from 'apollo-client/data/mutations';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        data:{
            $title: String!
            $description: String!
            $price: Int!
            $image: String
            $largeImage: String
        }
    ) {
        createItem (data: {
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        }){
            id
        }
    }
`

class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0,
    }

    handleChange = event => {
        const { name, type, value } = event.target
        const realValue = type === 'number' ? parseFloat(value) : value
        this.setState({ [name]: realValue })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log("hi")
    }

    render() {
        const { title, description, image, largeImage, price } = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor="title">
                        Title
                        <input type="text" id="title" name="title" value={title}
                            placeholder="Title" required onChange={this.handleChange}></input>
                    </label>
                    <label htmlFor="price">
                        Price
                        <input type="number" id="price" name="price" value={price}
                            required onChange={this.handleChange}></input>
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea type="text" id="description" name="description" value={description}
                            placeholder="Description" required onChange={this.handleChange}></textarea>
                    </label>
                    <button type="submit">Submit</button>
                </fieldset>
            </Form >
        )
    }
}

export default CreateItem;
// export { CREATE_ITEM_MUTATION };
