import axios from 'axios';
import React, { useEffect } from 'react';

function DetailProductPage(props) {
    // console.log(props)
    const productId = props.match.params.productId;

    useEffect(() => {
        axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
            .then(response => {
                if(response.data.success) {
                    console.log('response: ', response.data)        
                } else {
                    alert('상세정보 가져오기를 실패했습니다.')
                }
            })
    }, [])

    return (
        <div>
            DetailProductPage
        </div>
    )
}

export default DetailProductPage;

