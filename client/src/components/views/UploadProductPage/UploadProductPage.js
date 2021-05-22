import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Descriptions, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
import { sort } from './Sections/Data';


function UploadProductPage(props) {
    let productId = '';
    if(props.match.params){
        productId = props.match.params.productId;
    }
    const [Images, setImages] = useState('');
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState(0);
    const [Sort, setSort] = useState(1);

    useEffect(() => {
        console.log('productId: ', productId);
        if(productId){
            axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                if(response.data.success) {
                    const product = response.data.product[0];   
                    console.log('product info: ', product)
                    setImages(product.images);
                    setTitle(product.title);
                    setDescription(product.description);
                    setPrice(product.price);
                    setSort(product.sort);
                } else {
                    alert('상세정보 가져오기를 실패했습니다.')
                }
            })
        }
    }, [props.match.params])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value);
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value);
    }

    const sortChangeHandler = (event) => {
        setSort(event.currentTarget.value);
    }

    
    const updateImages = (newImages) => {
        console.log(newImages)
        setImages(newImages);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!Title || !Description || !Price || !Sort || !Images){
            return alert('모든값을 넣어주세요.');
        }

        let body = {
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            sort: Sort
        }
        if(productId) body = {...body, productId: productId}

        console.log(body)
        axios.post('/api/product', body)
            .then(response => {
                if(response.data.success){
                    alert('상품 업로드에 성공 했습니다.');
                    props.history.push('/');
                } else {
                    alert('상품 업로드에 실패 했습니다.');
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Form onSubmit={onSubmit}>
                {/* {productId ?
                    <h1>{productId}</h1>
                    :
                    null
                } */}
                <Form.Item>
                    <div>
                        <Avatar size='large' icon={<UserOutlined />}/>
                        <label style={{fontSize:'20px', fontWeight: 'bold'}}>&nbsp;&nbsp;&nbsp;{props.user.userData ? props.user.userData.name : null}</label>
                    </div>
                </Form.Item>
                <Form.Item>
                    <FileUpload refreshFunction={updateImages} images={Images}/>
                </Form.Item>
                <Form.Item>
                    <label>제목</label>
                    <Input onChange={titleChangeHandler} value={Title}/>
                </Form.Item>
                <Form.Item>
                    <label>설명</label>
                    <TextArea onChange={descriptionChangeHandler} value={Description}/>
                </Form.Item>
                <Form.Item>
                    <label>가격</label>
                    <br />
                    <Input onChange={priceChangeHandler} prefix="₩" suffix="원" style={{width: '140px'}} value={Price}/>
                </Form.Item>
                <Form.Item>
                    <label>분류</label>
                    <br />
                    <select onChange={sortChangeHandler} value={Sort}>
                        {sort.map(item => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                    </select>
                </Form.Item>
                <Form.Item>
                    <Button type='submit' onClick={onSubmit}>작성</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UploadProductPage

