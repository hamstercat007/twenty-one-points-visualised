import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})

export class UserViewComponent implements OnInit {
  data = [
    { id: 0, day: 'Mon', firstRule: false, secondRule: false, thirdRule: false },
    { id: 1, day: 'Tues', firstRule: false, secondRule: false, thirdRule: false },
    { id: 2, day: 'Wed', firstRule: false, secondRule: false, thirdRule: false },
    { id: 3, day: 'Thur', firstRule: false, secondRule: false, thirdRule: false },
    { id: 4, day: 'Fri', firstRule: false, secondRule: false, thirdRule: false },
    { id: 5, day: 'Sat', firstRule: false, secondRule: false, thirdRule: false },
    { id: 6, day: 'Sun', firstRule: false, secondRule: false, thirdRule: false }
  ];

  userName: string;
  observableData: FirebaseObjectObservable<any[]>;
  score: number;

  chart: any;
  options = {
    title: { text: '' },
    series: [{
      type: 'area',
      name: 'Weekly Performance',
      data: [],
    }],
    xAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  };

  constructor(private route: ActivatedRoute, public database: AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userName = params['userName'];
      this.observableData = this.database.object('/' + this.userName, {});
      this.observableData.subscribe(dataFromDb => {
        if (dataFromDb instanceof Array) {
          this.data = dataFromDb;
        } else {
          console.log('DB is empty');
        }

        this.updateChart();
      });
    });
  }

  update() {
    this.observableData.set(this.data);
  }

  updateChart() {
    const monday = +this.data[0].firstRule + +this.data[0].secondRule + +this.data[0].thirdRule;
    const tuesday = +this.data[1].firstRule + +this.data[1].secondRule + +this.data[1].thirdRule;
    const wednesday = +this.data[2].firstRule + +this.data[2].secondRule + +this.data[2].thirdRule;
    const thursday = +this.data[3].firstRule + +this.data[3].secondRule + +this.data[3].thirdRule;
    const friday = +this.data[4].firstRule + +this.data[4].secondRule + +this.data[4].thirdRule;
    const saturday = +this.data[5].firstRule + +this.data[5].secondRule + +this.data[5].thirdRule;
    const sunday = +this.data[6].firstRule + +this.data[6].secondRule + +this.data[6].thirdRule;
    this.score = monday + tuesday + wednesday + thursday + friday + saturday + sunday;

    setTimeout(() => {
      this.chart.series[0].setData([monday, tuesday, wednesday, thursday, friday, saturday, sunday]);
    }, 500);
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

}
