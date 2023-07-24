import React from "react";
import {Bar} from "react-chartjs-2";

export const ChartComponent = ({data, title,yearCurrent}) => {
    switch (title) {
        case "interest":
            title = "tiền lãi hợp đồng"
            break;
        case "liquidation":
            title = "thanh lý"
            break;
        case "foresee":
            title = "dự kiến"
            break;
        default:
            title = ""
    }
    const chartData = {
        labels: data.map((row) => row.month),
        datasets: [
            {
                label: "Lợi nhuận",
                data: data.map((row) => row.profit),
                backgroundColor: ['#0a9a4e'],
                hoverBackgroundColor: '#27533e',
                borderColor: ['black'],
                borderWidth: 1,
                maxBarThickness: 30,
                indexAxis: "x"
            },
        ],
    };
    const options = {
        responsive: true, // Tự động điều chỉnh kích thước biểu đồ theo kích thước của container cha
        maintainAspectRatio: false, // Tắt việc duy trì tỷ lệ khung nhìn mặc định (được sử dụng kết hợp với responsive)
        scales: {
            x: {
                beginAtZero: true, // Hiển thị giá trị trục x bắt đầu từ 0
            },
            y: {
                beginAtZero: true, // Hiển thị giá trị trục y bắt đầu từ 0
            },
        },
        plugins: {
            legend: {
                display: true, // Hiển thị chú thích (legend) của biểu đồ
                position: 'top', // Vị trí của chú thích (top, bottom, left, right)
            },
            title: {
                display: true, // Hiển thị tiêu đề của biểu đồ
                text: 'Biểu đồ lợi nhuận ' + title + ' theo tháng' + yearCurrent, // Tiêu đề biểu đồ
                font: {
                    size: 18, // Kích thước font tiêu đề
                },
            },
        },
    };

    return <Bar data={chartData} options={options}/>;
};
