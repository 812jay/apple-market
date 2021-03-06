/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Badge, Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

function RightMenu(props) {
  const user = useSelector(state => state.user);
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href='/product/upload'>상품업로드</a>
        </Menu.Item>

        <Menu.Item key="bookmark" style={{}}>
          <Badge count={
              user.userData && user.userData.bookmark 
              ? user.userData.bookmark.length : 0}
            >
            <a href="/user/bookmark" className="head-example" style={{marginRight: -22, marginTop: 5}} >
              <HeartFilled style={{fontSize: 30, marginBottom: 3, color: '#e84118'}}/>
            </a>
          </Badge>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

