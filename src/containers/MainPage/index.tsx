import React, {  } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';


const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Main = () => {

  const dispatch = useDispatch();

  return (
   <Wrapper>
     首頁
    </Wrapper>
  );
}

export default Main;
