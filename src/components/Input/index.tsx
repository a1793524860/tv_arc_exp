import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COMPONENTS_COLOR } from 'components/utils/color_handler';
import theme from 'constants/theme';
import debounce from 'lodash-es/debounce';

interface Validator {
  func : (data : string | number) => boolean;
  message : string;
}

interface InputInterface extends COMPONENTS_COLOR {
  title? : string;
  className? : string;
  placeholder? : string;
  readOnly? : boolean;
  icon? : React.ComponentType<any>;
  unit? : string;
  type? : string;
  value? : string | number;
  onChange : (data : string) => void;
  validator? : Array<Validator>;
  maxLength? : number;
  onIconClick? : () => void;
}

const Wrapper = styled.div`
  color: ${theme.TEXT_DEFAULT};
`;

const InputWrapper = styled.div<{ readOnly? : boolean, hasError? : boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 15px;
  border-radius: 6px;
  border: 1px solid ${p => p.hasError ? p.theme.WARNING : p.theme.GRAY};
  background-color: ${p => p.readOnly ? p.theme.LIGHT_GRAY : p.theme.WHITE};
`;

const FONT_SIZE = 16;

const StyledInput = styled.input<{ hasError? : boolean }>`
  flex: 1;
  min-width: 10px;
  font-size: ${FONT_SIZE}px;
  height: 48px;
  border: none;
  background-color: transparent;
  &::placeholder {
    font-size: ${FONT_SIZE}px;
    color: ${p => p.theme.GRAY};
  }
  color: ${p => p.hasError ? theme.WARNING : theme.BLACK};
`;
const Title = styled.div`
  margin-bottom: 10px;
  font-size: ${FONT_SIZE}px;
`;

const TrailingArea = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;
`;

const Icon = styled(TrailingArea)`
  height: ${FONT_SIZE}px;
`;
const Uint = styled(TrailingArea)`
  font-size: ${FONT_SIZE}px;
`;
const ErrorMessage = styled.div`
  color: ${theme.WARNING};
  text-align: right;
  font-size: ${FONT_SIZE}px;
  margin-top: 5px;
`;

const Input = ({
  onChange, className, title, readOnly, value, maxLength,
  type, placeholder, icon : InputIcon, unit, validator, onIconClick
} : InputInterface) => {

  const [validateErrors, setValidateErrors] = useState<Array<string>>([]);

  const InputOnChange = useCallback((e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  }, [onChange]);

  const validate = useCallback(
    debounce((data : string | number) => {
      const errors : Array<string> = [];
      if (validator && validator.length) {
        validator.forEach(({ func, message }) => {
          const res = func(data);
          if (!res) {
            errors.push(message);
          }
        });
      }
      setValidateErrors(errors);
    }, 100),
    [validator]
  );

  useEffect(() => {
    if (!value) {
      setValidateErrors([]);
    } else {
      validate(value);
    }
  }, [value, validate]);

  const hasError = !!(validateErrors && validateErrors.length);

  return (
    <Wrapper
      className={className}
    >
      {title && <Title>{title}</Title>}
      <InputWrapper readOnly={readOnly} hasError={hasError}>
        <StyledInput
          value={value}
          type={type || 'text'}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={InputOnChange}
          hasError={hasError}
          maxLength={maxLength}
        />
        {InputIcon && (
          <Icon
            onClick={(e) => {
              e.preventDefault();
              if (onIconClick) {
                onIconClick();
              }
            }}
          >
            <InputIcon
              color={theme.GRAY}
            />
          </Icon>
        )}
        {unit && (<Uint>{unit}</Uint>)}
      </InputWrapper>
      {(hasError) && (
        validateErrors.map((msg, index) => (
          <ErrorMessage key={index}>{msg}</ErrorMessage>
        ))
      )}
    </Wrapper>
  );
};

export default Input;
