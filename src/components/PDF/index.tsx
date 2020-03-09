import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { usePdf } from '@mikecousins/react-pdf';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Canvas = styled.canvas`
  user-select: none;
  pointer-events: none;
`;

const MoveArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const MainArea = styled.div`
  pointer-events: none;
`;

const MyPdfViewer = ({ file } : { file : string }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const canvasEl = useRef(null);

  const [ loading, pdfPage ] = usePdf({
    file,
    page,
    canvasEl,
    workerSrc: (process.env.NODE_ENV === 'development')
      ? '/pdf.worker.js'
      : '/insm/pdf.worker.js',
    onPageLoaded: () => console.log('')
  });
  useEffect(() => {
    setPages(pdfPage);
  }, [pdfPage]);

  return (
    <Wrapper>
      {loading && <span>Loading...</span>}

      <MoveArea>
        {(page > 1) && (
          <span
            onClick={() => setPage(page - 1)}
          >
            Previous
          </span>
        )}

      </MoveArea>
      <MainArea>
        <Canvas
          id={`${page}`}
          ref={canvasEl}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      </MainArea>
      <MoveArea>
        {(page < pages) && (
          <span
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </span>
        )}

      </MoveArea>
    </Wrapper>
  );
}

export default MyPdfViewer;