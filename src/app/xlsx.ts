import * as XLSX from 'xlsx';

export function buildExcel(body: any[], name: string, wscols: any[] = [], wsrows: any[] = [], merges: any[] = []) {
  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: "SheetJS Tutorial",
    Subject: "Test",
    Author: "Red Stapler",
    CreatedDate: new Date()
  };
  wb.SheetNames.push("Reporte");
  const ws_data = body;
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets["Reporte"] = ws;
  // if (merges.length) {
  //   if(!ws['!merges']) ws['!merges'] = [];
  //   merges.forEach(merge => {
  //     ws['!merges'].push(merge);
  //   });
  // }

  wscols.forEach((item, index) => {
    wscols[index] = { wch: item };
  });
  ws['!cols'] = wscols;

  wsrows = wsrows.map(e => ({ hpx: e }));
  ws['!rows'] = wsrows;

  console.log(wb);
  
  // XLSX.write(wb, { type: 'buffer'});
  XLSX.writeFile(wb, `${name}.xlsb`);
}

export function parseExcel(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      var data = e.target?.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((sheetName) => {
        var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {  });
        resolve(XL_row_object);
      });
    };
    reader.onerror = function(ex) {
      console.log(ex);
      reject();
    };
    reader.readAsBinaryString(file);
  });
}