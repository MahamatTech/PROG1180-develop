window.addEventListener("load",function(){
  Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Monthly Earnings for Christmas Party 2021'
    },
    subtitle: {
        text: 'Source: Earnings from Sales'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Accumulated Earnings (CAD)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Earnings',
        data: [150, 360, 280, 390, 580, 780, 960, 750, 600, 700, 860, 0]
    }]
  });
});