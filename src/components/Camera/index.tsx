import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import apiClient from 'services/api/config';

import theme from 'constants/theme';
import Icons from 'components/Icons';

interface CameraProps {
  title : string;
  uploadUrl? : string;
  imgUrl? : string;
  filename? : string;
  logo? : React.ComponentType<any>;
  img ? : string;
  hint? : string;
  className? : string;
  onChange? : (image : File | undefined) => void;
  onUploaded? : () => void;
  imgDelete? : () => void;
  onError? : () => void;
}

const Wrapper = styled.div`
  color: ${theme.TEXT_DEFAULT};
  min-width: 300px;
  border: 1px solid ${theme.GRAY};
  background-color: ${theme.WHITE};
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
`;
const Padding = styled.div`
  flex: 1;
`;
const Footer = styled.div`
  text-align: center;
  color: ${theme.GRAY};
`;
const LogoArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const DeleteIcon = styled.div`
  cursor: pointer;
  &:hover {
    svg {
      stroke: ${theme.WARNING};
    }
  }
`;

const StyledInput = styled.input`
  display: none;
  pointer-events: none;
`;

const Preview = styled.div<{ image : string }>`
  width: 100%;
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${p => p.image});
`;

const Camera = ({
  title, logo : Logo, hint, className, onChange, img,
  uploadUrl, imgUrl, filename, onUploaded, imgDelete, onError
} : CameraProps) => {

  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [uploading, setUploading] = useState();
  const [dummy, setDummy] = useState(Math.random());
  const onUpload = useCallback((e) => {
    e.preventDefault();
    setUploading(true);
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = async () => {
      setUploading(false);
      if (onChange) {
        onChange(file);
      }
      if (uploadUrl) {
        try {
          const formData = new FormData();
          formData.append('file', file, filename || `megainsurance_${file.name}`);
          await apiClient({
            method: 'PUT',
            url: uploadUrl,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
          });
          setDummy(Math.random());
          if (onUploaded) {
            onUploaded();
          }
        } catch (e) {
          console.error(e);
          if (onError) {
            onError();
          }
        }
      }
    };
    reader.readAsDataURL(file);
  }, [onChange, uploadUrl, filename, onUploaded, onError]);


  return (
    <Wrapper
      className={className}
      onClick={() => {
        if (inputEl && inputEl.current && !imgUrl && !uploading) {
          (inputEl.current as any).click();
        }
      }}
    >
      <StyledInput
        ref={inputEl}
        type='file'
        accept="image/*"
        capture="camera"
        onChange={onUpload}
      />
      <Header>
        {title}
        <Padding />
        {imgUrl && (
          <DeleteIcon>
            <Icons.Trash
              color={theme.GRAY}
              onClick={() => {
                if (imgDelete) {
                  imgDelete();
                }
              }}
            />
          </DeleteIcon>
        )}
      </Header>
      {(!imgUrl && (Logo || img)) && (
        <LogoArea>
          {!uploading && (
            <>
              {Logo && <Logo color={theme.LIGHT_GRAY} size={150} />}
              {img && <img src={img} height={150} alt="img"/>}
            </>
          )}
          {uploading && ('上傳中...')}
        </LogoArea>
      )}
      {(!uploading && imgUrl) && <Preview image={`${imgUrl}?dummy=${dummy}`} />}
      {hint && (<Footer>{hint}</Footer>)}
    </Wrapper>
  );
};

export default Camera;
