import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import QRCODE from 'qrcode';

const Img = styled.img`
  height: 400px;
  height: 400px;
`;

const QRCode = ({ text } : { text: string }) => {

  const [dataURL, setDataURL] = useState('');

  useEffect(() => {
    QRCODE
      .toDataURL(text, { version: 6 })
      .then(url => setDataURL(url))
  }, [text]);

  return (
    <Img src={dataURL} />
  );
}

export default QRCode;
