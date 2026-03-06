import React from 'react'
import LatestArrivals from '@/components/LatestArrivals'
import products from '../../../data/products'

const page = () => {
    return (
        <div>
            <LatestArrivals products={products} />
        </div>
    )
}

export default page