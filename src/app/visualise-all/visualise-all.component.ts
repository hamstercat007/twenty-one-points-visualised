import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-visualise-all',
  templateUrl: './visualise-all.component.html',
  styleUrls: ['./visualise-all.component.css']
})
export class VisualiseAllComponent implements OnInit {
  data = [];
  observableData: FirebaseObjectObservable<any[]>;
  chart: any;

  options = {
    title: {text: ''},
    xAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  };

  constructor(public database: AngularFireDatabase) { }

  ngOnInit() {
    this.observableData = this.database.object('/', {});
    this.observableData.subscribe(dataFromDb => {
      Object.keys(dataFromDb).forEach(key => {
        const data = dataFromDb[key];
        const weeklyScore = [];

        data.forEach(function (element) {
          const dayScore = +element.firstRule + +element.secondRule + +element.thirdRule;
          weeklyScore.push(dayScore);
        });

        this.updateChart(key, weeklyScore);
      });
    });
  }

  updateChart(key, weeklyScore) {
    setTimeout(() => {
      this.chart.addSeries({
            type: 'line',
            name: key,
            data: weeklyScore
        });
    }, 500);
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

}
