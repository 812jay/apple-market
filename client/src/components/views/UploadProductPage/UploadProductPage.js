import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import FileUpload from '../../utils/FileUpload'

const sortList = [
    {key: 1, value: '디지털/가전'}, 
    {key: 2, value: '가구/인테리어'}, 
    {key: 3, value: '유아동/유아도서'}, 
    {key: 4, value: '패션/잡화'}, 
    {key: 5, value: '게임/취미'}, 
    {key: 6, value: '뷰티/미용'}, 
    {key: 7, value: '반려동물'},
    {key: 8, value: '도서/티켓/음반'},
    {key: 9, value: '기타'}
];

function UploadProductPage(props) {
    const [Images, setImages] = useState('');
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState(0);
    const [Sort, setSort] = useState([]);

    const sortChangeHandler = (event) => {
        console.log(event.currentTarget.value)
        setSort(event.currentTarget.value);
    }

    
    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!Title || !Description || !Price || !Sort || !Images){
            return alert('모든값을 넣어주세요.');
        }
    }
    console.log(Images)

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Form>
                <Form.Item>
                    <div>
                        <Avatar size='large' icon={<UserOutlined />}/>
                        <label style={{fontSize:'20px', fontWeight: 'bold'}}>&nbsp;&nbsp;&nbsp;{props.user.userData ? props.user.userData.name : null}</label>
                    </div>
                </Form.Item>
                <Form.Item>
                    <FileUpload refreshFunction={updateImages}/>
                </Form.Item>
                <Form.Item>
                    <label>제목</label>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <label>설명</label>
                    <TextArea />
                </Form.Item>
                <Form.Item>
                    <label>가격</label>
                    <br />
                    <Input prefix="₩" suffix="원" style={{width: '140px'}}/>
                </Form.Item>
                <Form.Item>
                    <label>분류</label>
                    <br />
                    <select onChange={sortChangeHandler}>
                        {sortList.map(item => (
                            <option key={item.key} value={Sort}>{item.value}</option>
                        ))}
                    </select>
                </Form.Item>
                <Form.Item>
                    <Button type='submit'>작성</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UploadProductPage

