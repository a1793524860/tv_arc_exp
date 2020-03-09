import styled from 'styled-components';
import theme from 'constants/theme';

export const Table = styled.table`
  width: 100%;
  background-color: ${p => p.theme.WHITE};
  border-collapse: collapse;
  border-radius: 6px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Thead = styled.thead`
  background-color: #F5F5F5;
`;

export const Tr = styled.tr`
`;

export const Th = styled.th<{ textAlign? : string }>`
  font-weight: normal;
  padding: 20px 40px;
  text-align: ${p => p.textAlign || 'left'};
  color: ${theme.GRAY};
`;

export const Tbody = styled.tbody``;

export const Td = styled.td`
  background-color: ${theme.WHITE};
  color: ${p => p.theme.TEXT_DEFAULT};
  text-align: center;
  border-bottom: 1px solid ${theme.LIGHT_GRAY};
  padding: 15px;
  white-space: nowrap;
`;

export const TitleTd = styled(Td)`
  background-color: #F5F5F5;
  color: ${theme.GRAY};
`;