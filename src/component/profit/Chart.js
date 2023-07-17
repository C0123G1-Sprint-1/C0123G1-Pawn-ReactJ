import React from "react";
import {Bar} from "react-chartjs-2";

export const ChartComponent = ({data}) => {
    const chartData = {
        labels: data.map((row) => row.month),
        datasets: [
            {
                label: "Lợi nhuận theo tháng",
                data: data.map((row) => row.profit),
                backgroundColor: ['rgb(177,239,173)'],
                hoverBackgroundColor: 'rgb(57,120,49)',
                borderColor: ['black'],
                borderWidth: 1,
                maxBarThickness: 40,
                indexAxis: "x",
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
                text: 'Biểu đồ lợi nhuận theo tháng', // Tiêu đề biểu đồ
                font: {
                    size: 18, // Kích thước font tiêu đề
                },
            },
        },
    };

    return <Bar data={chartData} options={options}/>;
};
