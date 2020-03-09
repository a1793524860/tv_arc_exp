import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Icons from 'components/Icons';
import theme from 'constants/theme';

interface ExpandInterface {
  title : string;
  content : React.ComponentElement<any, any>;
  className? : string;
  mark? : string;
  actionButton? : React.ComponentElement<any, any>;
  forceOpen? : number;
  forceClose? : number;
}

const Wrapper = styled.div`
  position: relative;
  background-color: ${theme.WHITE};
  color: ${theme.TEXT_DEFAULT};
  border-radius: 6px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  height: auto;
`;
const Title = styled.div<{ mark? : string }>`
  display: flex;
  font-size: large;
  padding: 15px 40px;
  border-bottom: 2px solid ${theme.LIGHT_GRAY};
  border-left: 5px solid ${p => p.mark ? p.mark : theme.WHITE};
`;

const Padding = styled.div`
  flex: 1;
`;

const ContentWrapper = styled.div<{ close? : boolean, maxHeight : number }>`
  height: ${p => (p.close ? 0 : p.maxHeight)}px;
  transition: .3s all ease-out;
  opacity: ${p => p.close ? 0 : 1};
  pointer-events: ${p => p.close ? 'none' : 'normal'};
`;
const IconArea = styled.div<{ close : boolean }>`
  cursor: pointer;
  transform: rotate(${p => (p.close ? 180 : 0)}deg);
  transition: .3s transform ease-out;
`;

const Content = styled.div``;

const ActionButtonArea = styled.div<{ close : boolean }>`
  position: absolute;
  height: 50px;
  bottom: -25px;
  right: 30px;
  opacity: ${p => p.close ? 0 : 1};
  pointer-events: ${p => p.close ? 'none' : 'normal'};
  transition: .3s opacity ease-out;
`;

const ExpandArea : React.FC<ExpandInterface> = (
  { title, content, className, mark, actionButton, forceOpen, forceClose }
) => {

  const [collapse, setCollapse] = useState(true);
  const [wrapperHeight, setWrapperHeight] = useState();
  const gridEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (gridEl && gridEl.current) {
      const el : HTMLDivElement = gridEl.current;
      setWrapperHeight(el.clientHeight);
    }
  }, [content, gridEl]);

  useEffect(() => {
    if (forceOpen) {
      setCollapse(false);
    }
  }, [forceOpen]);

  useEffect(() => {
    if (forceClose) {
      setCollapse(true);
    }
  }, [forceClose]);

  return (
    <Wrapper className={className}>
      <Title mark={mark}>
        {title}
        <Padding />
        <IconArea
          close={collapse}
          onClick={() => setCollapse(!collapse)}
        >
          <Icons.ChevronDown  />
        </IconArea>
      </Title>
      <ContentWrapper maxHeight={wrapperHeight} close={collapse}>
        <Content ref={gridEl} >
          {content}
        </Content>
      </ContentWrapper>
      {actionButton && (
        <ActionButtonArea close={collapse}>
          {actionButton}
        </ActionButtonArea>
      )}
    </Wrapper>
  );
};

export default ExpandArea;
