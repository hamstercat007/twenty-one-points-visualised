import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  userName: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public send(userName: string): void {
        this.router.navigate(['/user', userName]);
    }

}
