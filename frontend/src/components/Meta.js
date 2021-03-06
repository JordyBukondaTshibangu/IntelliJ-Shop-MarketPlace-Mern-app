import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description , keyword}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keyword} />
        </Helmet>
    )
}

export default Meta
