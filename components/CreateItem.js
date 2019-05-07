import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Form from './styles/Form'
import gql from 'graphql-tag'
import Router from 'next/router'
import formatMoney from '../lib/formatMoney'
import ErrorMessage from './ErrorMessage'

const CREATE_ITEM_MUTATION = gql`
mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
) {
    createItem(
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
    ) {
    id
    }
}
`;

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

    uploadImage = async event => {
        console.log('uploading...')
        const files = event.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'swagwear')
        const res = await fetch('https://api.cloudinary.com/v1_1/madnilo/image/upload', {
            method: 'POST',
            body: data
        })
        const image = await res.json()
        console.log(image)
        this.setState({
            image: image.secure_url,
            largeImage: image.eager[0].secure_url
        })

    }

    render() {
        const { title, description, image, largeImage, price } = this.state
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (

                    <Form onSubmit={async e => {
                        e.preventDefault()
                        const res = await createItem()
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.createItem.id }
                        })
                    }}>
                        <ErrorMessage error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="image">
                                Image
                            <input type="file" id="image" name="image"
                                    placeholder="Upload an image" onChange={this.uploadImage}></input>
                                {image && <img src={image} alt="Image preview" width="150" />}
                            </label>
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
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
