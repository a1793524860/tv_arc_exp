import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Icon from 'components/Icons';
import theme from 'constants/theme';

interface Tab {
  title : string;
  component : React.FC<any>;
  props? : Object;
  hide? : boolean;
}
interface TabItem {
  isSelected : boolean;
  onClick : () => void;
  tab : Tab;
  status? : number;
}
interface TabsArea {
  tabs : Array<Tab>;
  switchTo? : number;
  onSwitch? : (index : number) => void;
  status? : { [tabId : number] : number };
}

const TabArea = styled.div`
  display: flex;
`;

const TabItemWrapper = styled.div<{ isSelected : boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  border-bottom: 3px solid ${p => p.isSelected ? p.theme.PRIMARY : p.theme.LIGHT_GRAY};
  transition: 0.3s border-bottom ease-in;
  cursor: pointer;
`;
const TabIcon = styled.div<{ err? : boolean, done? : boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  margin: 0px 10px;
  border: 1px solid ${p => p.err ? theme.WARNING : theme.PRIMARY};
  background-color: ${p => p.err
    ? theme.WARNING
    : p.done ? theme.PRIMARY : 'none'
  };
  border-radius: 100%;
`;

const ErrorText = styled.span`
  line-height: 25px;
  color: ${theme.WHITE};
`;

const TabItem = ({ tab, onClick, isSelected, status } : TabItem) => {
  const hasError = (status && (status > 0));
  const done = !hasError && status && (status < 0);
  return (
    <TabItemWrapper
      onClick={onClick}
      isSelected={isSelected}
    >
      {(status !== undefined) && (
        <TabIcon
          err={!!hasError}
          done={!!done}
        >
          {(hasError)
            ? (<ErrorText>{status}</ErrorText>)
            : (
              <Icon.Check
                color={done ? theme.WHITE : theme.PRIMARY}
                height={20}
              />
            )
          }
        </TabIcon>
      )}
      {tab.title}
    </TabItemWrapper>
  );
};

const Tabs = ({ tabs : Tabs, switchTo, onSwitch, status={} } : TabsArea) => {

  const [selected, setSelected] = useState(0);
  const Component = Tabs[selected] ? Tabs[selected].component : undefined;
  const props = Tabs[selected] ? Tabs[selected].props : {};
  useEffect(() => {
    const nextIndex = switchTo || 0;
    setSelected(nextIndex);
    if (onSwitch) {
      onSwitch(nextIndex);
    }
  }, [switchTo, onSwitch]);

  return (
    <>
      <TabArea>
        {Tabs.map((it, key) => (
          !it.hide && (
            <TabItem
              key={key}
              isSelected={selected === key}
              status={status[key]}
              onClick={() => {
                setSelected(key);
                if (onSwitch) {
                  onSwitch(key);
                }
              }}
              tab={it}
            />
          )
        ))}
      </TabArea>
      {Component && (
        <Component
          {...props}
        />
      )}
    </>
  );
};

export default Tabs;
