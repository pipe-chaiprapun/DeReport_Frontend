import { Chart } from 'chart.js';

export class ChartJS {

    lineChart(data) {
        this.lineChart = new Chart('lineChart', { // สร้าง object และใช้ชื่อ id lineChart ในการอ้างอิงเพื่อนำมาเเสดงผล
            type: 'line', // ใช้ชนิดแผนภูมิแบบเส้นสามารถเปลี่ยนชิดได้
            data: { // ข้อมูลภายในแผนภูมิแบบเส้น
                // labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"], // ชื่อของข้อมูลในแนวแกน x
                labels: this.labels,
                datasets: [{ // กำหนดค่าข้อมูลภายในแผนภูมิแบบเส้น
                    label: 'Number of items sold in months',
                    //data: [9, 7, 3, 5, 2, 10, 15, 61, 19, 3, 1, 9],
                    data: this.datas,
                    fill: false,
                    lineTension: 0.2,
                    borderColor: "red", // สีของเส้น
                    borderWidth: 1
                }]
            },
            options: {
                title: { // ข้อความที่อยู่ด้านบนของแผนภูมิ
                    text: "Line Chart",
                    display: true
                }
            },
            scales: { // แสดง scales ของแผนภูมิเริมที่ 0
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        })
    }
}