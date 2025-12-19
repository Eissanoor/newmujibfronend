import React from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import jsPDF from "jspdf";

const handlePrintTable2 = (tableSelectedRows) =>
{
  const pdfWidth = 8.26; // in inches
  const pdfHeight = 6.04; // in inches

  // Create a new jsPDF instance with custom dimensions
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [pdfWidth, pdfHeight]
  });
  
  const headerStyle = 'font-weight: bold; background:#3d41cf, color:white ;padding: 5px';
  const logsss = 'https://i.ibb.co/bPNS38G/Printer.png';
  const imageshowss = 0;

  const loadImage1 = new Promise((resolve) =>
  {
    const img1 = new Image();
    img1.crossOrigin = 'Anonymous';
    img1.src = logsss;
    img1.onload = () =>
    {
      resolve(img1);
    };
  });

  const loadImage2 = new Promise((resolve) =>
  {
    if (imageshowss) {
      const img2 = new Image();
      img2.crossOrigin = 'Anonymous';
      img2.src = imageshowss;
      img2.onload = () =>
      {
        resolve(img2);
      };
    } else {
      resolve(null);
    }
  });

  Promise.all([loadImage1, loadImage2]).then(([img1, img2]) =>
  {
    doc.addImage(img1, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    const tableHtml = `
      <div style='position: relative'>
        <p style="font-size: 0.2px;  margin-top:0.2px ; margin-left:0.5px; position: absolute">EIssa</p>
          <p style="font-size: 0.2px;  margin-top:0.2px ; margin-left:6.4px; position: absolute">EIssa2</p>
          

            <img style="height: 0.8px; width: 0.8px; margin-top: 5px; margin-left: 0.65px; position: absolute;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJEAAACRCAAAAADmswX/AAABHElEQVR42u3aSRKDMAwEQP7/6eQD2IzwEki1rynkvqi0OMfnaecgIiIiIiIiIiIi+k/RcX2an41HISJaKmonw/XF9ShERFtF/Zv6t6dRiIieK2p+S0T0VlGaiUREDxKl3mbjtLljIyKaMdOWMmzLlE1ENGMP2c+mX2xGiYhu9UdnWdKvImmGERFtEDWjjmziJ1URIqJBUT9qqT8qzQVERGtFAeHs11J2EhFtFQUBg716sIQnItoqqs+0qWi88yciui+qbxDTXmjo7YiIaIaolGGlButuXSMimiYqvfeXco2I6A2iYKZNH5qIiB4kCrxrXkWJiBb0R2lRKZUSIqK1ovQ/WqX1zOptDRHRjD3kkkNERERERERERET0ftEXXunWZ07H080AAAAASUVORK5CYII=" alt="">


            
      </div>
    `;

    const printContent = `
      <html>
        <head>
          <title>DataGrid Table</title>
          <style>
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              th {
                ${headerStyle}
              }
            }
          </style>
        </head>
        <body>${tableHtml}</body>
      </html>
    `;

    doc.html(printContent, {
      callback: () =>
      {
        doc.save('table.pdf');
      },
    });
  });
};


const Downloads = () =>
{
  return (
    <div>
      <button onClick={handlePrintTable2}>Download PDF</button>

    </div>
  );
};

export default Downloads;