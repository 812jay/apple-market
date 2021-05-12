import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Row } from 'antd';
import { CommentOutlined, HeartFilled, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { changeBookmark } from '../../../../_actions/user_actions';

function ProductInfo(props) {
    console.log(props)
    const dispatch = useDispatch();

    const [Writer, setWriter] = useState('');
    const [DateForm, setDateForm] = useState('');
    const [Sort, setSort] = useState('');
    const [Price, setPrice] = useState('');
    const [IsBookmark, setIsBookmark] = useState(false);

    useEffect(() => {
        let writer = '';
        if(props.detail.writer) {
            writer = props.detail.writer.name;
        }
        setWriter(writer);
        setPrice(props.detail.price);
        formatDate(new Date(props.detail.updatedAt));
        formatSort(props.detail.sort);
        findBookmark(props.bookmarks);
    }, [props.detail]);

    const formatDate = (value) => {
        console.log(value)
        let year = value.getFullYear();
        let month = value.getMonth() + 1;
        let day = value.getDate();
        let hours = value.getHours();
        let minutes = value.getMinutes();
        if(month < 10) month = '0'+month;
        if(day < 10) day = '0'+day;
        if(hours < 10) hours = '0'+hours;
        if(minutes < 10) minutes = '0'+minutes;
        let dateForm = year+'-'+month+'-'+day+' '+hours+':'+minutes;
        setDateForm(dateForm);
    }

    const formatSort = (value) => {
        console.log(value)
        let sort = '';
        if(value === 1) sort = '디지털/가전';
        if(value === 2) sort = '가구/인테리어';
        if(value === 3) sort = '유아동/유아도서';
        if(value === 4) sort = '패션/잡화';
        if(value === 5) sort = '게임/취미';
        if(value === 6) sort = '뷰티/미용';
        if(value === 7) sort = '반려동물';
        if(value === 8) sort = '도서/티켓/음반';
        if(value === 9) sort = '기타';
        setSort(sort);
    };

    const bookmarkHandler = () => {
        dispatch(changeBookmark(props.detail._id))
        .then(response => findBookmark(response.payload))
    }

    const findBookmark = (bookmarks) => {
        let bookmark = false;
        bookmarks.forEach((value, index) => {
            console.log(value, index);
            if(value === props.detail._id) bookmark = true;
        })
        setIsBookmark(bookmark)
    }

    return (
        <div>
            <Row style={{fontSize: '25px'}}>
                <Col><Avatar icon={<UserOutlined />} />&nbsp;</Col>
                <Col>{Writer}</Col>
            </Row>
            <hr />
            <Row style={{display: 'flex'}}>
                <Col span={22} style={{fontSize: '20px', fontWeight: 'bold'}}>{props.detail.title}</Col>
                {/* {props.userId ===  ? } */}
                <Col onClick={bookmarkHandler}>
                    {IsBookmark ? 
                    <HeartFilled style={{fontSize: '30px', color: '#e84118', cursor: 'pointer'}}/> 
                    : <HeartOutlined style={{fontSize: '30px', cursor: 'pointer'}}/>}
                    
                </Col>  
            </Row>
            <Row>
                <Col style={{color: '#7f8c8d'}}>{Sort} ▫ {DateForm}</Col>
            </Row>
            <Row>
                <Col span={20}><Button icon={<CommentOutlined />}>채팅으로 거래하기</Button></Col>
            </Row>
            <Row>
                <Col><span style={{fontSize: '20px'}}>₩{Price}</span></Col>
            </Row>
            <br />
            <Row>
                <Col>{props.detail.description}</Col>
            </Row>
        </div>
    )
}

export default ProductInfo
