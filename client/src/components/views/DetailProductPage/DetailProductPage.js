import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';

function DetailProductPage(props) {
    const productId = props.match.params.productId;

    const [Product, setProduct] = useState({});
    const [Bookmark, setBookmark] = useState([]);
    const [UserId, setUserId] = useState('');

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                if(response.data.success) {
                    console.log('response: ', response.data)        
                    setProduct(response.data.product[0]);
                } else {
                    alert('상세정보 가져오기를 실패했습니다.')
                }
            })
    }, []);

    useEffect(() => {
        if(props.user.userData && props.user.userData._id){
            console.log(props.user.userData);
            setBookmark(props.user.userData.bookmark);
            setUserId(props.user.userData._id)
        }
    },[props.user.userData])

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <Row gutter={[16, 16]}>
                <Col lg={11} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={13} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} bookmarks={Bookmark} userId={UserId} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage;

