import React, { useEffect, useState } from "react";
import { CategoryScale,Line } from "react-chartjs-2";
import moment from "moment";

Chart.register(CategoryScale);
const ChartComponent = () => {
    const [chartData, setChartData] = useState({
        datasets: [
            {
                label: "Dataset 1 (linear interpolation)",
                backgroundColor: "rgb(255, 99, 132, 0.5)",
                borderColor: "rgb(255, 99, 132)",
                fill: false,
                lineTension: 0,
                borderDash: [8, 4],
                data: []
            }
        ]
    });

    const options = {
        elements: {
            line: {
                tension: 0.5
            }
        },
        scales: {
            xAxes: [
                {
                    type: "realtime", // 변경된 부분: x축 타입을 "time"으로 수정
                    distribution: "linear",
                    time: {
                        displayFormats: {
                            second: "h:mm:ss",
                            minute: "h:mm",
                            hour: "hA"
                        }
                    },
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        maxTicksLimit: 30,
                        source: "auto",
                        autoSkip: true,
                        callback: function(value) {
                            return moment(value).format("HH:mm:ss");
                        }
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            ]
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const newData = {
                ...chartData,
                datasets: [{
                    ...chartData.datasets[0],
                    data: [
                        ...chartData.datasets[0].data,
                        {
                            x: moment(),
                            y: Math.random()
                        }
                    ]
                }]
            };
            setChartData(newData);
        }, 1000);

        return () => clearInterval(interval);
    }, [chartData]);

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartComponent;
