import React from 'react'
import PaginationStyles from './styles/PaginationStyles'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { perPage } from '../config'
import Head from 'next/head'
import Link from 'next/link'

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate{
                count
            }
        }
    }
`
export default function Pagination({ page }) {
    return (

        <Query query={PAGINATION_QUERY}>
            {({ data, loading, error }) => {
                const count = data.itemsConnection.aggregate.count
                const pages = Math.ceil(count / perPage)
                if (loading) return <p>Loading</p>
                if (error) return <p>There was an error 💩</p>
                return (
                    <PaginationStyles>
                        <Head>
                            <title>Swag Wear | Page {page} of {pages}</title>
                        </Head>
                        <Link prefetch href={{
                            pathname: 'items',
                            query: { page: page > 1 ? page - 1 : page }
                        }}>
                            <a className="prev" aria-disabled={page === 1}> ◀️ Prev </a>
                        </Link>
                        <p>Page {page} of {pages}</p>
                        <p>{count} Items found</p>
                        <Link prefetch href={{
                            pathname: 'items',
                            query: { page: page < pages ? page + 1 : page }
                        }}>
                            <a className="next" aria-disabled={page === pages}>Next ▶️ </a>
                        </Link>
                    </PaginationStyles>
                )
            }}

        </Query>
    )
}
