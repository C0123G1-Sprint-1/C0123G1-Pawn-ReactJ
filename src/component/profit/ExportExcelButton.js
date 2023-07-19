import React from 'react';
import { utils, writeFile } from 'xlsx';


const ExportExcelButton = ({ data, fileName }) => {
    const exportToExcel = () => {
        // Dòng dữ liệu chúng ta muốn xuất thành Excel
        const worksheet = utils.json_to_sheet(data);

        // Tạo một workbook mới (file Excel)
        const workbook = utils.book_new();

        // Thêm dữ liệu (worksheet) vào workbook với tên sheet là 'Sheet1'
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        // Ghi workbook vào file Excel với tên file là "${fileName}.xlsx"
        writeFile(workbook, `${fileName}.xlsx`);
    };
    return (
        <button className="btn btn-sm btn-primary" style={{height: "5vh"}} onClick={exportToExcel}>
            Export to Excel
        </button>
    );
};

export default ExportExcelButton;
