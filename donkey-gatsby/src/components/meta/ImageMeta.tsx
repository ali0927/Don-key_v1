import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

const ImageMeta = ({ image }: {image?: string}) => {
    if (!image) {
        return null
    }

    return (
        <Helmet>
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={image} />
            <meta property="og:image" itemProp="image" content={image} />
        </Helmet >
    )
}

ImageMeta.propTypes = {
    image: PropTypes.string,
}

export default ImageMeta
