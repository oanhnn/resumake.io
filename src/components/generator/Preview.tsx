import { useAtom } from 'jotai'
import { useState, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import styled, { ThemeProvider } from 'styled-components'
import { resumeAtom } from '../../atoms/resume'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Output = styled.output`
  grid-area: preview;
  background: black;
  overflow-y: auto;
  `

const PdfContainer = styled.article`
  width: 100%;
  height: 100%;
`

const ResumeDocument = styled(Document)`
  width: 100%;
`

const ResumePage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em 0 10rem 0;

  canvas {
    max-width: 95% !important;
    height: auto !important;
  }
`

export function Preview() {
  const [resume] = useAtom(resumeAtom)
  const [, setPageCount] = useState(1)
  const [pageNumber] = useState(1)
  const [scale] = useState(document.body.clientWidth > 1440 ? 1.75 : 1)

  const handleDocumentLoadSuccess = useCallback((pdf: pdfjs.PDFDocumentProxy) => {
    setPageCount(pdf.numPages)
  }, [])

  return (
    <Output>
      <button onClick={() => window.open(resume.url)}>export as pdf</button>
      <PdfContainer>
        <ResumeDocument
          file={resume.url || '/blank.pdf'}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading=""
        >
          <ResumePage
            pageNumber={pageNumber}
            scale={scale}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading=""
          />
        </ResumeDocument>
      </PdfContainer>
    </Output>
  )
}
