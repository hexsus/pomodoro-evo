import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  time: number = 1500000;
  break: number = 300000;
  longBreak: number = 1500000;
  timerStatus: string = 'Pomodoro';
  timeStatus = this.time;
  circles = 4;
  interval;

  constructor() { }

  ngOnInit() {
  }

  switchTimer() {
    switch (this.timerStatus) {
      case 'Pomodoro': {
        this.start(this.time);
        break;
      }
      case 'Break': {
        this.start(this.break);
        break;
      }
      case 'Long break': {
        this.start(this.longBreak);
        break;
      }
    }
  }

  start(time) {
    this.timeStatus = time;
    this.interval = setInterval(() => {
      this.timeStatus = this.timeStatus - 1000;
      if (this.timeStatus <= 0) {
        clearInterval(this.interval);
        this.timeStatus = this.break;
        new Audio('assets/ring.mp3').play()

        if (this.circles === 0 && this.timerStatus != 'Long break') {
          this.timerStatus = 'Long break';
        } else if (this.timerStatus === 'Pomodoro') {
          this.timerStatus = 'Break';
          this.circles = this.circles - 1;
        } else if (this.timerStatus === 'Break') {
          this.timerStatus = 'Pomodoro';
        } else if (this.timerStatus === 'Long break') {
          this.timerStatus = 'Pomodoro'
        }
        this.interval = null;
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    switch (this.timerStatus) {
      case 'Pomodoro': {
        this.timeStatus = this.time;
        break;
      }
      case 'Break': {
        this.timeStatus = this.break;
        break;
      }
      case 'Long break': {
        this.timeStatus = this.longBreak;
        break;
      }
    }
  }
}