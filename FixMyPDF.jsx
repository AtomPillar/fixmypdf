
import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocument, degrees } from 'pdf-lib';
import SignatureCanvas from 'react-signature-canvas';
import Tesseract from 'tesseract.js';
import { Document as DocxDoc, Packer, Paragraph, TextRun } from 'docx';

const FixMyPDF = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [signaturePlacement, setSignaturePlacement] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [isPro, setIsPro] = useState(false);
  const [code, setCode] = useState('');
  const sigRef = useRef();

  useEffect(() => {
    setIsPro(localStorage.getItem('fixmypdf_pro') === 'true');
  }, []);

  const onFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setPages([]);
      setOcrText('');
    } else {
      alert('Избери PDF файл.');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPages(Array(numPages).fill().map(() => ({ rotation: 0, deleted: false })));
  };

  const rotatePage = (index) => {
    const updated = [...pages];
    updated[index].rotation = (updated[index].rotation + 90) % 360;
    setPages(updated);
  };

  const deletePage = (index) => {
    const updated = [...pages];
    updated[index].deleted = true;
    setPages(updated);
  };

  const saveSignature = () => {
    if (!sigRef.current.isEmpty()) {
      setSignatureImage(sigRef.current.getTrimmedCanvas().toDataURL('image/png'));
    }
  };

  const exportPDF = async () => {
    if (!file) return;
    if (!isPro && !canUseFeature()) {
      alert('Лимит изчерпан. Активирай PRO за неограничен достъп.');
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(arrayBuffer);
    const newPdf = await PDFDocument.create();

    for (let i = 0; i < pages.length; i++) {
      if (!pages[i].deleted) {
        const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
        copiedPage.setRotation(degrees(pages[i].rotation));
        newPdf.addPage(copiedPage);
      }
    }

    if (signatureImage && signaturePlacement) {
      const png = await newPdf.embedPng(signatureImage);
      const pg = newPdf.getPage(signaturePlacement.page);
      pg.drawImage(png, {
        x: signaturePlacement.x,
        y: pg.getHeight() - signaturePlacement.y - 50,
        width: 120,
        height: 50,
      });
    }

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fixmypdf.pdf';
    a.click();
  };

  const runOCR = async () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const result = await Tesseract.recognize(url, 'eng+bul');
    setOcrText(result.data.text);
    URL.revokeObjectURL(url);
  };

  const exportDocx = async () => {
    const doc = new DocxDoc({
      sections: [{ children: [new Paragraph({ children: [new TextRun(ocrText)] })] }]
    });
    const blob = await Packer.toBlob(doc);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ocr-export.docx';
    a.click();
  };

  const activatePro = () => {
    const validCodes = ['FIXPRO2024'];
    if (validCodes.includes(code.trim().toUpperCase())) {
      localStorage.setItem('fixmypdf_pro', 'true');
      setIsPro(true);
      alert('✔ PRO активиран');
    } else {
      alert('Невалиден код');
    }
  };

  const canUseFeature = () => {
    const key = 'pdf_actions_today';
    const today = new Date().toDateString();
    let data = JSON.parse(localStorage.getItem(key)) || {};
    if (data.date !== today) data = { date: today, count: 0 };
    if (data.count >= 3) return false;
    data.count++;
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📄 FixMyPDF – Всичко в едно</h1>

      {!isPro && (
        <div className="mb-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Въведи PRO код"
            className="border p-2 mr-2"
          />
          <button onClick={activatePro} className="bg-green-600 text-white px-4 py-2 rounded">
            Активирай PRO
          </button>
        </div>
      )}

      <input type="file" accept="application/pdf" onChange={onFileChange} className="mb-6" />

      {file && (
        <>
          <div className="mb-6">
            <SignatureCanvas
              penColor="black"
              canvasProps={{ width: 300, height: 100, className: 'border mb-2' }}
              ref={sigRef}
            />
            <button onClick={saveSignature} className="bg-blue-600 text-white px-3 py-1 rounded">
              Запази подписа
            </button>
          </div>

          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {pages.map((p, i) =>
              !p.deleted && (
                <div key={i} className="relative mb-4">
                  <Page
                    pageNumber={i + 1}
                    rotate={p.rotation}
                    width={600}
                    onClick={(e) => {
                      if (!signatureImage) return;
                      const box = e.target.getBoundingClientRect();
                      setSignaturePlacement({
                        page: i,
                        x: e.clientX - box.left,
                        y: e.clientY - box.top
                      });
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => rotatePage(i)} className="bg-yellow-400 px-2 py-1 rounded text-xs">↻</button>
                    <button onClick={() => deletePage(i)} className="bg-red-600 text-white px-2 py-1 rounded text-xs">🗑</button>
                  </div>
                </div>
              )
            )}
          </Document>

          <div className="flex gap-4 mt-4">
            <button onClick={exportPDF} className="bg-blue-600 text-white px-4 py-2 rounded">💾 Експортирай PDF</button>
            <button onClick={runOCR} className="bg-gray-700 text-white px-4 py-2 rounded">🔍 OCR</button>
            {ocrText && (
              <button onClick={exportDocx} className="bg-green-700 text-white px-4 py-2 rounded">📄 Word Export</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FixMyPDF;
