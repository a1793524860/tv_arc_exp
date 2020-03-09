import React from 'react';
import styled from 'styled-components';
import { COMPONENTS_COLOR, getColor } from 'components/utils/color_handler';
import theme from 'constants/theme';

interface ButtonInterface extends COMPONENTS_COLOR {
  ghost? : boolean;
  icon? : React.ComponentType<any>;
  onClick? : () => void;
}

const ITEM_HEIGHT = 16;

const Wrapper = styled.button<ButtonInterface>`
  display: flex;
  align-items: center;
  background-color: ${p => p.ghost ? 'transparent' : p.color};
  border: 1px solid ${p => p.color};
  height: 50px;
  padding: 0px 30px;
  border-radius: 60px;
  margin: 0px 0px;
  &:hover {
    cursor: ${p => p.disabled ? 'normal' : 'pointer'};
    ${p => !p.disabled && `
      opacity: ${p.ghost ? 0.6 : 0.8}
    `}
  }
`;

const Text = styled.div<ButtonInterface>`
  line-height: ${ITEM_HEIGHT}px;
  font-size: ${ITEM_HEIGHT}px;
  color: ${p => p.ghost ? p.color : p.theme.WHITE};
  margin: 0px 10px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const IconWrapper = styled.div<ButtonInterface>`
  display: flex;
  align-items: center;
`;

const Button : React.FC<ButtonInterface> = (props) => {
  const color = getColor({ ...props, theme });
  return (
    <Wrapper {...props} color={color} >
      {props.icon && (
        <IconWrapper>
          <props.icon
            color={props.ghost ? color : theme.WHITE}
          />
        </IconWrapper>
      )}
      <Text
        ghost={props.ghost}
        color={color}
      >
        {props.children}
      </Text>
    </Wrapper>
  );
}

export default Button;
