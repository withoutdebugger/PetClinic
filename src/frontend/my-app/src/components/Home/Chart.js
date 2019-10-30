const rFactor = () => Math.round(Math.random() * 100)

// Bar chart
// -----------------------------------
export const Bar = {
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            backgroundColor: '#23b7e5',
            borderColor: '#23b7e5',
            data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
        }, {
            backgroundColor: '#5d9cec',
            borderColor: '#5d9cec',
            data: [rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor(), rFactor()]
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
}

// Bar Horizontal
// -----------------------------------
export const BarHorizontal = {
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [
            [5, 4, 3, 7, 5, 10, 3],
            [3, 2, 9, 5, 4, 6, 4]
        ]
    },
    options: {
        seriesBarDistance: 10,
        reverseData: true,
        horizontalBars: true,
        height: 280,
        axisY: {
            offset: 70
        }
    }
}

