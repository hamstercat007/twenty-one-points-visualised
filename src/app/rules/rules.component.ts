import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(public snackBar: MdSnackBar) { }

  ngOnInit() {
  }

    openSnackBar() {
    this.snackBar.open('Enter your name and you are ready to rumbleeeee!', 'Dismiss', {
      duration: 5000,
    });
  }

}
