import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userName: string;

  constructor(public snackBar: MdSnackBar, private router: Router) { }

  ngOnInit() {
  }

  openSnackBar() {
    this.snackBar.open('Enter your name and you are ready to rumbleeeee!', 'Dismiss', {
      duration: 5000,
    });
  }

  public send(userName: string): void {
    this.router.navigate(['/user', userName]);
  }
}
