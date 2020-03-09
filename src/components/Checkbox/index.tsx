import React from 'react';
import styled from 'styled-components';

import theme from 'constants/theme';
import Icon from 'components/Icons';

interface CheckBoxInterface {
  checked? : boolean;
  onClick? : () => void;
  title? : string;
  className? : string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  flex: 1;
  color: ${theme.TEXT_DEFAULT};
  margin-left: 10px;
  text-overflow: ellipsis;
`;

const CheckItem = styled.div<{ checked? : boolean }>`
  height: 25px;
  width: 25px;
  border-radius: 6px;
  border: 1px solid ${p => p.checked ? 'none' : theme.GRAY};
  background-color: ${p => p.checked ? theme.SECONDARY : theme.WHITE};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckBox : React.FC<CheckBoxInterface> = (
  { checked, onClick, title, className }
) => {
  return (
    <Wrapper className={className}>
      <CheckItem
        checked={checked}
        onClick={onClick}
      >
        {checked && <Icon.Check color={theme.WHITE} />}
      </CheckItem>
      {title && <Title>{title}</Title>}
    </Wrapper>
  );
}

export default CheckBox;
