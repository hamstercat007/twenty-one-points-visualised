import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  database: AngularFireDatabase;
  observableData: FirebaseObjectObservable<any[]>;

  topFiveScores = [];

  constructor(public db: AngularFireDatabase) {
    this.database = db;
  }

  ngOnInit() {
    this.observableData = this.database.object('/', {});
    this.observableData.subscribe(dataFromDb => {
      const sortedData = [];
      Object.keys(dataFromDb).forEach(function (key) {
        const data = dataFromDb[key];
        let weeklyCount = 0;

        data.forEach(function (element) {
          const dayCount = +element.firstRule + +element.secondRule + +element.thirdRule;
          weeklyCount = weeklyCount + dayCount;
        });

        sortedData.push([key, weeklyCount]);
      });

      sortedData.sort(function (a, b) {
        return b[1] - a[1];
      });

      this.topFiveScores = sortedData.slice(0, 5);
    });
  }
}
