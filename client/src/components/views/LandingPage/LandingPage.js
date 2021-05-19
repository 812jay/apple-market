import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Card, Col, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/SortBox';
import RadioBox from './Sections/PriceBox';
import SearchFeature from './Sections/SearchFeature';
import { sort, price } from './Sections/Datas';

function LandingPage(props) {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        sort: [],
        price: []
    });
    const [SearchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body);
    }, []);
    console.log(Products)

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success){
                    if(body.loadMore) {
                        setProducts([...Products,...response.data.productInfo ]);
                    } else {
                        setProducts(response.data.productInfo);
                    }
                    setPostSize(response.data.postSize);
                } else {
                    alert('상품들을 가져오는데 실패했습니다.');
                }
            })
    }

    const loadMoreHandler = () => {
        
        let skip = Skip + Limit;

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body);
        setSkip(skip);
    }

    const getSort = (sortNum) => {
        let sortStr =  '';
        sort.forEach((value) => {
            if(value._id === sortNum) sortStr = value.name
        })
        return sortStr;
    }
    


    const renderCards = Products.map((product, index) => {
        // console.log('product: ', product, ', user: ',props.user.userData.bookmark)
        let sortStr = getSort(product.sort);
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                    cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
                >
                    <div className="additional">
                        <span>{product.title}</span><br />
                        <span>{sortStr}</span><br />
                        <span className="price">₩{product.price}</span><br />
                    </div>
                </Card>
            </Col>
            )
    });

    const showFilteredResults = (filters) => {
        
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(body);
        setSkip(0);
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters};

        newFilters[category] = filters;

        if(category === 'price') {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }
        showFilteredResults(newFilters);
        setFilters(newFilters);
    }

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        } 

        setSkip(0);
        setSearchTerm(newSearchTerm);
        getProducts(body);
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>애플마켓에 오신것을 환영합니다!</h2>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox list={ sort } handleFilters={filters => handleFilters(filters, 'sort')} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <RadioBox list={ price } handleFilters={filters => handleFilters(filters, 'price')} />
                </Col>
            </Row>

            {/* Search */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>
            {/* Card */}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>            
            }

        </div>
    )
}

export default LandingPage
