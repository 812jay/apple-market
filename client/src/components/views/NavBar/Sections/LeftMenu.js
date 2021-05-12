import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user);
  const [UserName, setUserName] = useState('');
  useEffect(() => {
    console.log(user)
    if(user.userData && user.userData.name){
      setUserName(user.userData.name);
    }
  }, [user.userData])
  return (
    <>
      <Avatar icon={<UserOutlined />}/>&nbsp;&nbsp;
      <span>{UserName}님 환영합니다!</span>
    </>
  )
}

export default LeftMenu