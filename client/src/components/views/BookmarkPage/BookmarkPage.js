import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToBookmark, getBookmarkItems } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

function BookmarkPage(props) {
    const dispatch = useDispatch();
    const [Products, setProducts] = useState([]);

    useEffect(() => {

        let bookmarkItems = [];

        //리덕스 User state안에 bookmark에 상품이 들어있는지
        if(props.user.userData && props.user.userData.bookmark) {
            if(props.user.userData.bookmark.length > 0) {
                props.user.userData.bookmark.forEach(item => {
                    bookmarkItems.push(item);
                });

                dispatch(getBookmarkItems(bookmarkItems))
                .then(response => setProducts(response.payload.product))
            }
        }
    }, [props.user.userData]);
    const removeFromBookmark = (productId) => {
        console.log(productId);
        dispatch(addToBookmark(productId))
        .then(response => setProducts(response.payload.productInfo))
    }
    console.log('Products: ',Products)

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Bookmark</h1>
            <div>
                <UserCardBlock products={Products} removeItem={removeFromBookmark}/>
            </div>
        </div>
    )
}

export default BookmarkPage
