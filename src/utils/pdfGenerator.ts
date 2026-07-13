import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

export const generatePdfFromPages = async (
  pageSelector: string,
  fileName: string
): Promise<void> => {
  const pages = document.querySelectorAll(pageSelector);
  if (pages.length === 0) throw new Error('No pages found');

  // Brief delay to ensure hover states and UI artifacts are cleared
  await new Promise(r => setTimeout(r, 100));

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();

  for (let i = 0; i < pages.length; i++) {
    const pageElement = pages[i] as HTMLElement;
    
    const dataUrl = await toPng(pageElement, { 
      pixelRatio: 2, 
      backgroundColor: '#ffffff',
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        width: pageElement.offsetWidth + 'px',
        height: pageElement.offsetHeight + 'px'
      }
    });

    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => { img.onload = resolve; });

    if (i > 0) {
      pdf.addPage();
    }

    const ratio = pdfWidth / img.width;
    const scaledHeight = img.height * ratio;

    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, scaledHeight);
  }

  pdf.save(fileName);
};
