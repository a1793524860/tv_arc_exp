import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'constants/theme';

interface SelectionInterface {
  name : string;
  value : string;
}

interface BoxesInterface {
  selections : Array<SelectionInterface>;
  className? : string;
  onSelect? : (value : string) => void;
  rowCount? : number;
  selected? : string;
}

const Box = styled.div<{ isSelected? : boolean }>`
  height: 100px;
  background-color: ${theme.WHITE};
  border: 1px solid ${p => p.isSelected ? theme.GOLD : theme.GRAY};
  border-radius: 6px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
`;

const Radio = styled.div<{ isSelected? : boolean }>`
  border-radius: 100%;
  height: 20px;
  width: 20px;
  border: ${p => p.isSelected
    ? `6px solid ${theme.GOLD}`
    : `1px solid ${theme.GRAY}`
  };
  transition: 0.2s border ease-in;
`;

const TextArea = styled.div`
  padding: 0px 20px;
`;
const Title = styled.div`

`;
const Wrapper = styled.div<{ rowCount : number }>`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(${p => p.rowCount}, 1fr);
`;

const Boxes = ({ selections, className, onSelect, rowCount, selected } : BoxesInterface) => {
  const [selectedItem, setSelected] = useState();

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <Wrapper className={className} rowCount={rowCount || 0}>
      {selections.map(({ name, value }) => (
        <Box
          key={value}
          onClick={() => {
            setSelected(value);
            if (onSelect) {
              onSelect(value);
            }
          }}
          isSelected={(selectedItem === value)}
        >
          <Radio
            isSelected={(selectedItem === value)}
          />
          <TextArea>
            <Title>{name}</Title>
          </TextArea>
        </Box>
      ))}
    </Wrapper>
  );
}

export default Boxes;
