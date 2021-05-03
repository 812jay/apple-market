import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    useEffect(() => {
        axios.post('/api/product/products')
            .then(response => {
                if(response.data.success){
                    console.log(response.data.productInfo)
                } else {
                    alert('상품들을 가져오는데 실패했습니다.');
                }
            })
    }, [])
    return (
        <div>

        </div>
    )
}

export default LandingPage
