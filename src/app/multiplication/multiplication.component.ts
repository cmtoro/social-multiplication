import { Component, OnInit } from '@angular/core';
import { Multiplication, MultiplicationResultAttempt, User } from '../model/model';
import { MultiplicationService } from '../multiplication.service';

@Component({
  selector: 'app-multiplication',
  templateUrl: './multiplication.component.html',
  styleUrls: ['./multiplication.component.css']
})
export class MultiplicationComponent implements OnInit {

  public result: number;
  public user: User;
  public multiplication: Multiplication;
  public correct: boolean;

  constructor(private multiplicationService : MultiplicationService) { }

  ngOnInit(): void {
    this.user = new User();
    this.multiplicationService.getRandomMultiplication().subscribe(m => {
      this.multiplication = m;
    });
  }

  checkOperation(): void {
    let result = new MultiplicationResultAttempt();
    result.user = this.user;
    result.multiplication = this.multiplication;
    result.resultAttempt = Number(this.result);
    this.multiplicationService.checkAttempt(result).subscribe(r => this.correct = r.correct);
  }

}
