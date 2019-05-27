import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Item from './Item'
import Pagination from '../components/Pagination'

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`

const Content = styled.div`
    text-align: center;
`

const ItemsList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`

class Items extends Component {
    render() {
        return (
            <Content>
                <Pagination page={this.props.page}></Pagination>
                <Query query={ALL_ITEMS_QUERY}>
                    {
                        ({ loading, error, data }) =>
                            (
                                loading ? <p>Loading...</p> :
                                    error ? <p>Error {error.message}</p> :
                                        <ItemsList> {data.items.map(item => <Item item={item} key={item.id} />)} </ItemsList>
                            )
                    }
                </Query>
                <Pagination page={this.props.page}></Pagination>
            </Content>
        )
    }
}

export default Items;
export { ALL_ITEMS_QUERY };