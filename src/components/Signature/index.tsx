import React, { useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

import Icons from 'components/Icons';
import Button from 'components/Button';

interface SignatureProps {
  onFinish? : (dataURL : string) => void;
  autoUpdate? : (dataUrl : string) => void;
  className? : string;
  height? : string;
  width? : string;
}

const Padding = styled.div`
  width: 20px;
`;

const Wrapper = styled.div`

`;

const SignatureCanvas = styled.canvas`
  border-bottom: 1px solid ${p => p.theme.LIGHT_GRAY};
`;

const ControlArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const Signature = (
  { onFinish, autoUpdate, className, height, width } : SignatureProps
) => {

  const CanvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;

  const onAutoUpdate = useCallback(
    debounce(() => {
      const ref = CanvasRef.current;
      if (ref && autoUpdate) {
        const dataURL = ref.toDataURL('image/png');
        autoUpdate(dataURL);
      }
    }, 200)
  , [CanvasRef, autoUpdate]);

  useEffect(() => {
    const ref = CanvasRef.current;
    if (ref) {
      const ctx = ref.getContext("2d") as CanvasRenderingContext2D;
      let startDrawing = false;

      const getEvent = (e : any) => {
        if (e.touches && e.touches[0]) {
          return e.touches[0];
        }
        return e;
      }

      const getPosition = (
        ref : HTMLCanvasElement, evt : TouchEvent | MouseEvent
      ) : { x : number, y : number } => {
        const rect = ref.getBoundingClientRect(); // abs. size of element
        const scaleX = ref.width / rect.width;    // relationship bitmap vs. element for X
        const scaleY = ref.height / rect.height;
        const event = getEvent(evt);
        return {
          x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
          y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        };
      };

      const onMouseMove = (e : TouchEvent | MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (startDrawing) {
          const { x, y } = getPosition(ref, e);
          ctx.lineTo(x, y);
          ctx.moveTo(x, y);
          ctx.stroke();
        }
      };
      const onMouseDown = (e : TouchEvent | MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        startDrawing = true;
        const { x, y } = getPosition(ref, e);
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.moveTo(x, y);
      };
      const onMouseUpOrOut = () => {
        startDrawing = false;
        ctx.closePath();
        onAutoUpdate();
      }

      ref.addEventListener('mousemove', onMouseMove, false);
      ref.addEventListener('mousedown', onMouseDown, false);
      ref.addEventListener('mouseup', onMouseUpOrOut, false);
      ref.addEventListener('mouseout', onMouseUpOrOut, false);

      ref.addEventListener('touchmove', onMouseMove, false);
      ref.addEventListener('touchstart', onMouseDown, false);
      ref.addEventListener('touchend', onMouseUpOrOut, false);
      // ref.addEventListener('mouseout', onMouseUpOrOut, false);

      return () => {
        ref.removeEventListener('mousemove', onMouseMove);
        ref.removeEventListener('mousedown', onMouseDown);
        ref.removeEventListener('mouseup', onMouseUpOrOut);
        ref.removeEventListener('mouseout', onMouseUpOrOut);

        ref.removeEventListener('touchmove', onMouseMove);
        ref.removeEventListener('touchstart', onMouseDown);
        ref.removeEventListener('touchend', onMouseUpOrOut);
      }
    }

  }, [CanvasRef, onAutoUpdate]);

  const clearCanvas = useCallback(() => {
    const ref = CanvasRef.current;
    if (ref) {
      const ctx = ref.getContext("2d") as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, ref.width, ref.height);
    }
  }, [CanvasRef]);

  const confirm = useCallback(() => {
    const ref = CanvasRef.current;
    if (ref && onFinish) {
      const dataURL = ref.toDataURL('image/png');
      onFinish(dataURL);
    }
  }, [CanvasRef, onFinish]);

  return (
    <Wrapper className={className}>
      <SignatureCanvas
        height={height || '400'}
        width={width || '800'}
        ref={CanvasRef}
      />
      <ControlArea>
        <Button
          ghost
          icon={Icons.Trash}
          onClick={clearCanvas}
        >
          清除簽名
        </Button>
        <Padding />
        {!autoUpdate && (
          <Button
            icon={Icons.Check}
            onClick={confirm}
          >
            確認簽名
          </Button>
        )}
      </ControlArea>
    </Wrapper>
  );
}

export default Signature;