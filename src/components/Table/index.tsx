import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  background-color: ${p => p.theme.WHITE};
  border-collapse:collapse;
  border-radius: 6px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;
export const Thead = styled.thead`
  background-color: ${p => p.theme.PRIMARY};
`;

export const Tr = styled.tr`
`;
export const Th = styled.th<{ textAlign? : string }>`
  font-weight: normal;
  padding: 20px 40px;
  font-size: large;
  text-align: ${p => p.textAlign || 'center'};
  color: ${p => p.theme.WHITE};
`;
export const Tbody = styled.tbody`
  & > tr {
    padding: 0px 40px;
    &:nth-child(even) {
      background-color: #F5F5F5;
    }
    &:nth-child(odd) {
      background-color: white;
    }
  }
`;
export const Td = styled.td`
  color: ${p => p.theme.TEXT_DEFAULT};
  padding: 20px 20px;
  text-align: center;
`;
