import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Row } from 'antd';
import { CommentOutlined, DeleteOutlined, EditOutlined, HeartFilled, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { changeBookmark } from '../../../../_actions/user_actions';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

function ProductInfo(props) {
    console.log(props)
    const dispatch = useDispatch();

    const [ProductId, setProductId] = useState('');
    const [Writer, setWriter] = useState('');
    const [DateForm, setDateForm] = useState('');
    const [Sort, setSort] = useState('');
    const [Price, setPrice] = useState('');
    const [IsBookmark, setIsBookmark] = useState(false);
    const [IsWriter, setIsWriter] = useState(false);

    useEffect(() => {
        let writer = '';
        if(props.detail.writer) {
            writer = props.detail.writer.name;
            if(props.userId === props.detail.writer._id) {
                setIsWriter(true);
            }
        }

        setProductId(props.detail._id);
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
        if(value === 4) sort = '생활/가공식품';
        if(value === 5) sort = '스포츠/레저';
        if(value === 6) sort = '여성패션/잡화';
        if(value === 7) sort = '남성패션/잡화';
        if(value === 8) sort = '게임/취미';
        if(value === 9) sort = '뷰티/미용';
        if(value === 10) sort = '반려동물용품';
        if(value === 11) sort = '도서/티켓/음반';
        if(value === 12) sort = '식물';
        if(value === 13) sort = '기타';
        if(value === 14) sort = '삽니다';
        setSort(sort);
    };

    const bookmarkHandler = () => {
        dispatch(changeBookmark(props.detail._id))
        .then(response => findBookmark(response.payload.bookmark))
    }

    const findBookmark = (bookmarks) => {
        let bookmark = false;
        console.log(bookmarks)
        bookmarks.forEach((value, index) => {
            console.log(value, index);
            if(value === props.detail._id) bookmark = true;
        })
        setIsBookmark(bookmark)
    }

    const removeProduct = () => {
        let productId = '';
        let confirm = window.confirm('해당 게시글을 삭제 하시겠습니까?');
        if(props.detail){
            productId = props.detail._id;
        }
        console.log(productId)
        if(confirm){
            axios.get(`/api/product/remove_product?productId=${productId}`)
            .then(response => {
                if(response.data.success){
                    alert('게시글을 삭제 했습니다.');
                    props.history.push('/');
                } else {
                    alert('게시글 삭제에 실패 했습니다.');
                }
            })
        }        
    }



    return (
        <div>
            <Row style={{fontSize: '25px'}}>
                <Col><Avatar icon={<UserOutlined />} />&nbsp;</Col>
                <Col>{Writer}</Col>
            </Row>
            <hr />
            <Row style={{display: 'flex'}}>
                <Col lg={23} xs={18} style={{fontSize: '20px', fontWeight: 'bold'}}>
                    <span style={{marginRight: '10px'}}>{props.detail.title}</span>
                    {IsWriter ?
                        <>
                            {/* <a href={`/product/edit/${ProductId}`}><EditOutlined style={{fontSize: '30px', cursor: 'pointer', marginRight: '15px'}}/></a>
                            <span><DeleteOutlined onClick={removeProduct} style={{fontSize: '30px', cursor: 'pointer'}}/></span> */}
                            <a href={`/product/edit/${ProductId}`}><Button>수정</Button></a>
                            <span><Button onClick={removeProduct}>삭제</Button></span>
                        </>
                        : 
                        null
                    }
                </Col>
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
                <Col lg={19} xs={12}><span style={{fontSize: '20px'}}>₩{Price}</span></Col>
                <Col><Button icon={<CommentOutlined />}>채팅으로 거래하기</Button></Col>
            </Row>
            <br />
            <Row>
                <Col>{props.detail.description}</Col>
            </Row>
        </div>
    )
}

export default withRouter(ProductInfo);
