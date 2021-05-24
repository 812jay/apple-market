import { Button, List } from 'antd'
import React from 'react'

function UserCardBlock(props) {
    console.log(props)
    
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
        return sort;
    };

    return (
        <div>
            <List 
                itemLayout='vertical'
                size='large'
                dataSource={props.products}
                renderItem={(item, index) => (
                    <List.Item 
                        key={item.title}
                        extra={<img width='180' height='100' alt='img' src={`http://localhost:5000/${item.images[0]}`}/>}
                        actions={[item.price+'원', formatSort(item.sort), item.writer.name, <Button onClick={() => props.removeItem(item._id)}>제거</Button>]}
                    >
                        <List.Item.Meta
                            title={item.title}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default UserCardBlock
