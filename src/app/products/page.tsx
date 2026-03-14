import React from 'react'
import LatestArrivals from '@/components/LatestArrivals'
import { staticProducts } from '@/lib/static-data'

const page = () => {
    const products = staticProducts.filter(p => p.is_published && !p.is_sold);
    return (
        <div>
            <LatestArrivals products={products} />
        </div>
    )
}

export default page
