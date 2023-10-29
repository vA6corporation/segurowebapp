import { formatDate } from "@angular/common";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import { base64Logo } from "./base64Logo";
import { ConstructionModel } from "./constructions/construction.model";
import { PaymentModel } from "./payments/payment.model";
import { BankModel } from "./providers/bank.model";

export async function buildServiceOrder(
  construction: ConstructionModel,
  bank: BankModel,
  payment: PaymentModel
): Promise<jsPDF> {
  const title = 12;
  const header = 11;
  const body = 8.5;
  const { business, company } = construction;

  const pdf = new jsPDF('p','mm', [297, 210]);
  let text: string = '';
  
  pdf.addImage(base64Logo, "JPEG", 5, 5, 55, 55);

  let positionY = 50;

  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(title);
  
  text = 'Orden de Servicio';
  pdf.text(text, 105, positionY, { align: 'center' });
  positionY += 15;

  text = `Fecha: ${formatDate(new Date(payment.paymentAt), 'dd/MM/yyyy', 'en-US')}`;
  pdf.text(text, 180, positionY, { align: 'right' });
  positionY += 5;

  // text = 'No. Orden de Servicio: (No. de control interno)';
  // pdf.text(text, 180, positionY, { align: 'right' });
  // positionY += 5;

  autoTable(pdf, {
    startY: 70,
    margin: { left: 30, right: 30 },
    head: [
      [ 
        { content: 'Cliente', colSpan: 3, styles: { halign: 'center', fillColor: [255, 165, 0] } }, 
      ]
    ],
    body: [
      [ { content: `Razon social: ${business.name}`, styles: {  } }],
      [`RUC: ${business.document}`],
      [`Direccion: ${business.addressOrigin}`],
      [`Telefeno: ${business.mobileNumber}`],
      [`Correo electronico: ${business.email}`]
    ],
  });

  autoTable(pdf, {
    startY: 140,
    margin: { left: 30, right: 30 },
    head: [
      [ 
        { content: 'Proveedor', colSpan: 3, styles: { halign: 'center', fillColor: [255, 165, 0] } }, 
      ]
    ],
    body: [
      [ { content: `Razon social: ${company.name}`, styles: {  } } ],
      [`RUC: ${company.ruc}`],
      [`Direccion: ${company.address}`],
      [`Telefeno: ${company.mobileNumber}`],
      [`Correo electronico: ${company.email}`]
    ],
  });

  autoTable(pdf, {
    startY: 195,
    margin: { left: 30, right: 30 },
    head: [
      [ 
        // { content: 'Cantidad', styles: { halign: 'center', fillColor: [255, 165, 0] } },
        { content: 'Descripcion del Servicio', styles: { halign: 'center', fillColor: [255, 165, 0] } },
        { content: 'Precio Unitario', styles: { halign: 'center', fillColor: [255, 165, 0] } }, 
      ]
    ],
    body: [
      [ { content: `SERVICIO DE ASESORIA Y GESTION DE FIANZAS PARA LA OBRA/SERVICIO/BIEN/CONSULTORIA DE OBRA ${construction.object}`, colSpan: 1 }, { content: `S/ ${payment.charge.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, styles: { halign: 'right', cellWidth: 30 } } ],
      [],
      [],
      [],
    ],
  });

  autoTable(pdf, {
    startY: 230,
    margin: { left: 30, right: 30 },
    head: [
      [ 
        { content: 'Observaciones', colSpan: 3, styles: { halign: 'center', fillColor: [255, 165, 0] } }, 
      ]
    ],
    body: [
      [ { content: `N° de cuenta: ${bank.bankName} ${bank.accountNumber}` } ],
      [],
      [],
      [],
    ],
  });

  positionY += 200;

  text = '\t\t\t_________________';
  pdf.text(text, 30, positionY, { align: 'center' });
  
  text = '\t\t\t_________________';
  pdf.text(text, 125, positionY, { align: 'center' });
  
  positionY += 5;

  text = '\t\t\tCliente';
  pdf.text(text, 30, positionY, { align: 'center' });


  text = '\t\t\tProveedor';
  pdf.text(text, 125, positionY, { align: 'center' });
  positionY += 5;

  return pdf;
}