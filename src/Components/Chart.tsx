import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

interface SplineChartProps {
    data: number[];
    index: string; // Add index prop
    // color:string;
    change:number;
}

const SpChart: React.FC<SplineChartProps> = ({ data, index, change }) => {
    // Ensure data is not empty
    if (!data  || data.length === 0) return null;
    
    // console.log(color)
    // Prepare labels for x-axis (assuming data is equally spaced)
    const labels = Array.from({ length: data.length }, (_, i) => i + 1);

    // Create chart data
    const chartData = {
        labels: labels,
        datasets: [{
            // label: 'Pricing',
            data: data,
            // borderColor: 'blue',
            borderColor: (change>=0? 'green':'red'),
            tension: 0.5, 
            pointRadius: 0, 
            pointHoverRadius: 0,
        }]
    };


    useEffect(() => {
        const ctx = document.getElementById(`spline-chart-${index}`) as HTMLCanvasElement; 
        const chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false, 
                    },
                },
                scales: {
                    x: {
                        display: false, 
                    },
                    y: {
                        display: false, 
                    },
                },
            },
        });

        // Cleanup function to destroy the chart when component unmounts
        return () => chart.destroy();
    }, [data, index]); // Update the chart when data or index changes
    // console.log(index);
    return <canvas id={`spline-chart-${index}`} />;
    
};

export default SpChart;