import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
// import * as chartData from './data.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // If ctx does not work, get canvas via ViewChild()

  dataArray: any = [];

  list = [];

  time_events = [];

  temperaturareattoreR4001Values = [];

  myObserver = {
    next: (value: any) => {
      this.list = value;
      console.log(this.list[0]);
    },
    error: (err: any) => {
      console.log('error');
      console.log(err);
    },
  };

  constructor(public http: HttpClient) {}

  async ngOnInit() {
    await this.http.get<any>('assets/csvjson.json').subscribe(this.myObserver);
    await this.delay(1000);
    await this.delay(1000);
    this.addX();
    this.addTemperaturareattoreR4001();
  }

  addX() {
    this.list.forEach((value) => {
      this.time_events.push(value.timestamp);
    });
    console.log(this.time_events[1]);
  }

  addTemperaturareattoreR4001() {
    this.list.forEach((value) => {
      this.temperaturareattoreR4001Values.push(value.TemperaturareattoreR4001);
    });
    console.log(this.temperaturareattoreR4001Values[1]);
  }
  ngAfterViewInit() {
    let data: any,
      options: any,
      chart: any,
      ctx: any = document.getElementById('areaChart') as HTMLElement;

    // Stackblitz no longer supports local json files.
    // Uncomment below and use import at top.
    // Replace datasets with this.dataArray

    // for (let key in chartData.items) {
    //   if (chartData.items.hasOwnProperty(key)) {
    //     this.dataArray.push(chartData.items[key]);
    //   }
    // }

    data = {
      labels: this.time_events,
      datasets: [
        {
          label: 'Apples',
          data: this.temperaturareattoreR4001Values,
          backgroundColor: 'rgba(40,125,200,.5)',
          borderColor: 'rgb(40,100,200)',
          fill: true,
          lineTension: 0,
          radius: 5,
        },
      ],
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        position: 'top',
        text: 'Apples to Oranges',
        fontSize: 12,
        fontColor: '#666',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#999',
          fontSize: 14,
        },
      },
    };

    chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
