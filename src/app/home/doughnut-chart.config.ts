export const doughnutChartConfig = {
    chartType: 'doughnut',
    chartLabels: ['Expense', 'Income'],
    chartColors: [
        {
            backgroundColor: ['#ff4444', '#4285F4']
        }
    ],
    chartOptions: {
        legend: {
            display: false
        },
        plugins: {
            labels: {
                render: 'percentage',
                fontColor: ['white', 'white'],
                precision: 0
            }
        }
    }
};
