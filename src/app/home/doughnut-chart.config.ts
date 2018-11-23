export const doughnutChartConfig = {
    chartType: 'doughnut',
    chartLabels: ['Expense', 'Income'],
    chartColors: [
        {
            backgroundColor: ['#ff4444', '#4285F4']
        }
    ],
    chartOptions: {
        aspectRatio: 1.3,
        title: {
            display: true,
            text: ''
        },
        legend: {
            position: 'bottom',
            reverse: true
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
