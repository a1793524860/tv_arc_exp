import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import mainImage from 'assets/login_bg.jpg';
import logo from 'assets/headerLogo.png';

import { displayMessage } from 'services/modal';

import { login } from 'services/login';

import Input from 'components/Input';
import Button from 'components/Button';

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
`;

const Logo = styled.img`
  height: 80px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 20px;
`;
const StyledButton = styled(Button)`
  width: 100%;
  margin: 10px 0px;
`;

const ImageArea = styled.div`
  flex: 2;
  background-image: url(${mainImage});
  background-size: cover;
  background-position: center;
`;

const FormArea = styled.div`
  flex: 1;
  min-width: 400px;
  max-width: 600px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Padding = styled.div`
  flex: 1;
`;
const Slogan = styled.div`
  color: ${p => p.theme.GOLD};
  margin: 20px 0px;
`;

const Login = () => {

  const dispatch = useDispatch();
  const [channel, setChannelCode] = useState('02');
  const [username, setUserName] = useState('010509');
  // const [username, setUserName] = useState('admin');
  const [password, setPassword] = useState('123456');

  useEffect(() => {
    setTimeout(() => {
      // dispatch(
      //   login(channel, username, password)
      // );
    }, 100);
  }, [dispatch]);

  return (
    <Wrapper>
      <ImageArea />
      <FormArea>
        <Padding />
        <Logo src={logo} />
        <Slogan>是誰住在深海的大鳳梨裡?</Slogan>
        <Padding />
        <StyledInput
          value={channel}
          title={'通路代碼'}
          placeholder={'請輸入您的通路代碼'}
          onChange={val => setChannelCode(val)}
        />
        <StyledInput
          value={username}
          title={'帳號'}
          placeholder={'請輸入您的帳號'}
          onChange={val => setUserName(val)}
        />
        <StyledInput
          type="password"
          value={password}
          title={'密碼'}
          placeholder={'請輸入您的密碼'}
          onChange={val => setPassword(val)}
        />
         <Padding />
        <StyledButton
          onClick={() => {
            dispatch(displayMessage('請稍待片刻....', '登入中', true));
            dispatch(login(channel, username, password));
        }}
        >
          登入
        </StyledButton>
        <Padding />
        <Padding />
        <Padding />
      </FormArea>
    </Wrapper>
  );
}

export default Login;
