import React from 'react';
import styled from 'styled-components';

import theme from 'constants/theme';

export const LeftBar = styled.div`
  background-color: ${theme.WHITE};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  /* border: 1px solid red; */
`;

interface MenuItemProps {
  text : string;
  icon? : React.ComponentElement<any, any>;
  selected? : boolean
  onClick? : () => any;
}

export const ItemWrapper = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid ${theme.LIGHT_GRAY};
  cursor: pointer;
`;

export const ItemIcon = styled.div`
  padding: 0px 15px;
  display: flex;
  align-items: center;
`;

export const ItemText = styled.div<{ color? : string }>`
  color: ${p => p.color};
`;


export const MenuItem = ({ text, icon, selected, onClick } : MenuItemProps) => (
  <ItemWrapper onClick={onClick} >
    {icon && (<ItemIcon>{icon}</ItemIcon>)}
    <ItemText color={selected ? theme.PRIMARY : theme.GRAY} >{text}</ItemText>
  </ItemWrapper>
);

