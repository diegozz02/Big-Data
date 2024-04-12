// SendEmailButton.js
import React from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SendEmailButton = async () => {
    const canvas = await html2canvas(document.body);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    const pdfBlob = pdf.output('blob');
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'miarchivo.pdf');
    try {
      const response = await axios.post('http://localhost:3300/logic/enviar-pdf', {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  return
};

export default SendEmailButton;