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
    return <Bar data={chartData}/>;
};
