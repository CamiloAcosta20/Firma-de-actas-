function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Acta de Entrega de Equipos');
}

function guardarFirma(firma) {
  const sheet = SpreadsheetApp.openById('ID_DE_TU_HOJA_DE_CALCULO').getActiveSheet();
  sheet.appendRow([new Date(), firma]);
}

function sendEmail(email, signatureDataUrl) {
  const decodedImage = Utilities.base64Decode(signatureDataUrl.split(',')[1]);
  const blob = Utilities.newBlob(decodedImage, 'image/png', 'firma.png');
  
  GmailApp.sendEmail(email, 'Firma del Acta de Entrega de Equipos', 'Adjunto encontrará la firma.', {
    attachments: [blob]
  });
}