import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COMPONENTS_COLOR } from 'components/utils/color_handler';

import Icons from 'components/Icons';
import theme from 'constants/theme';

interface Selection {
  value? : any;
  name : string;
}

interface SelectorInterface extends COMPONENTS_COLOR {
  readOnly? : boolean;
  placeholder : string;
  className? : string;
  selected? : any;
  selection : Array<Selection>;
  onChange : (value : any) => void;
  title? : string;
}

const FONT_SIZE = 16;

const Layout = styled.div``;

const Wrapper = styled.div<{ readOnly? : boolean }>`
  color: ${theme.TEXT_DEFAULT};
  position: relative;
  height: 50px;
  border-radius: 6px;
  background-color: ${p => p.readOnly ? p.theme.LIGHT_GRAY : p.theme.WHITE};
  border: 1px solid ${p => p.theme.GRAY};
  display: flex;
  align-items: center;
  padding: 0px 15px;
  cursor: pointer;
`;

const SelectArea = styled.div`
  flex: 1;
`;

const Icon = styled.div`
  height: ${FONT_SIZE}px;
  margin-left: 20px;
  display: flex;
  align-items: center;
`;
const StyledPlaceholder = styled.div`
  color: ${theme.GRAY};
`;
const SelectedItem = styled.div``;

const Selection = styled.div<{ isSelected : boolean }>`
  padding: 15px;
  white-space: nowrap;
  background-color: ${p => p.isSelected && p.theme.LIGHT_GRAY};
  &:hover {
    background-color: ${theme.LIGHT_GRAY};
  }
`;

const SelectionWrapper = styled.div`
  position: absolute;
  background-color: ${theme.WHITE};
  width: 100%;
  padding: 2px;
  border-radius: 6px;
  border: 1px solid ${theme.GRAY};
  top: calc(100% + 5px);
  left: 0;
  max-height: 210px;
  overflow-y: auto;
  z-index: 1000;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: ${FONT_SIZE}px;
`;

const Selector = ({
  placeholder, selection, className, selected, onChange, title, readOnly
} : SelectorInterface) => {
  const [selectedValue, setSelectedValue] = useState();
  const [selectedName, setSelectedName] = useState();
  const [toggleSelection, setToggle] = useState(false);

  useEffect(() => {
    if ((selected !== selectedValue)) {
      if ((!selected)) {
        setSelectedName(undefined);
        setSelectedValue(undefined);
      } else if (selected) {
        const selectedItem = (selection || []).find(({ value }) => (value === selected));
        if (selectedItem) {
          setSelectedName(selectedItem.name);
          setSelectedValue(selectedItem.value);
        }
      }
    }
  }, [selected, selectedValue, selection]);

  return (
    <Layout className={className}>
      {title && <Title>{title}</Title>}
      <Wrapper
        readOnly={readOnly}
        onClick={() => !readOnly && setToggle(!toggleSelection)}
      >
        <SelectArea>
          {!selectedName && (
            <StyledPlaceholder>{placeholder}</StyledPlaceholder>
          )}
          {selectedName && (<SelectedItem>{selectedName}</SelectedItem>)}
        </SelectArea>
        <Icon>
          <Icons.ChevronDown color={theme.GRAY} />
        </Icon>
        {toggleSelection && (
          <SelectionWrapper>
            {selection.map(({ name, value }, key) => (
              <Selection
                isSelected={selectedValue && (selectedValue === value)}
                key={key}
                onClick={() => {
                  setSelectedName(name);
                  setSelectedValue(value);
                  onChange(value);
                }}
              >
                {name}
              </Selection>
            ))}
          </SelectionWrapper>
        )}
      </Wrapper>
    </Layout>
  );
}

export default Selector;
