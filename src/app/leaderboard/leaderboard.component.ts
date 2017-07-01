import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  observableData: FirebaseObjectObservable<any[]>;
  topFiveScores = [];

  constructor(public database: AngularFireDatabase, private router: Router) {}

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

  public navigateToUserPage(userName): void {
    this.router.navigate(['/user', userName]);
  }
}
