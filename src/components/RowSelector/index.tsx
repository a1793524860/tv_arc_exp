import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import theme from 'constants/theme';

interface Selection {
  value? : string;
  name : string;
}

interface RowSelectorInterface {
  value? : string;
  selection : Array<Selection>;
  onSelect? : (val : any) => void;
  readOnly? : boolean
}

const Wrapper = styled.div`
  display: flex;
`;

const Items = styled.div<{ selected : boolean, readOnly? : boolean }>`
  padding: 0px 25px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background-color: ${theme.WHITE};
  color: ${p => p.selected ? theme.PRIMARY : theme.GRAY};
  border: 1px solid ${p => p.selected ? theme.PRIMARY : theme.LIGHT_GRAY};
  border-left: 1px solid ${p => p.selected ? theme.PRIMARY : 'transparent'};
  margin-left: -1px;
  cursor: pointer;
  z-index: ${p => p.selected ? 10 : ''};
  &:first-child {
    border-left: 1px solid ${p => p.selected ? theme.PRIMARY : theme.LIGHT_GRAY};
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  &:last-child {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  &:hover {
    ${p => !p.readOnly && `
        border: 1px solid ${theme.PRIMARY};
        color: ${theme.PRIMARY};
        z-index: 10;
    `}
  }
  transition: 0.1s all ease-out;
`;

const RowSelector = ({ selection, onSelect, value, readOnly } : RowSelectorInterface) => {
  const [selected, setSelected] = useState();
  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <Wrapper>
      {selection.map(it =>
        <Items
        readOnly={readOnly}
          selected={selected === it.value}
          key={it.value}
          onClick={() => {
            if (!readOnly) {
              setSelected(it.value)
              if (onSelect) {
                onSelect(it.value);
              }
            }
          }}
        >
          {it.name}
        </Items>
      )}
    </Wrapper>
  );
}

export default RowSelector;
