import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>1640: {title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: '1640 Web Enterprise',
    description: '1640 Web Enterprise',
    keywords: '1640 Web Enterprise',
}

export default Meta