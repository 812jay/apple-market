import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';


function LandingPage(props) {

    const [Products, setProducts] = useState([]);

    useEffect(() => {
        axios.post('/api/product/products')
            .then(response => {
                if(response.data.success){
                    setProducts(response.data.productInfo);
                } else {
                    alert('상품들을 가져오는데 실패했습니다.');
                }
            })
    }, []);


    const renderCards = Products.map((product, index) => {
        console.log(product, index)
        console.log(props.user.userData.bookmark[0])
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                    cover={<img style={{width: '100%', maxHeight: '190px'}} src={`http://localhost:5000/${product.images[0]}`} alt={product.images}/>}
                >
                    <Meta 
                        title={product.title}
                        description={`₩${product.price}`}
                    />
                </Card>
            </Col>
            )
    });

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>애플마켓에 오신것을 환영합니다!</h2>
            </div>

            {/* Filter */}

            {/* Search */}

            {/* Card */}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage
