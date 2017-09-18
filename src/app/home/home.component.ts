import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersSubscription: Subscription;
  customSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    const myNumbers = Observable.interval(1000);
    this.numbersSubscription = myNumbers
      .subscribe((number: number) => {
        console.log(number);
      });

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('First package');
      }, 2000);

      setTimeout(() => {
        observer.next('Second package');
      }, 4000);

      setTimeout(() => {
        // observer.error('This does not work');
        observer.complete();
      }, 5000);

      setTimeout(() => {
        observer.next('Second package');
      }, 7000);
    });


    this.customSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('Completed');
      }
    );
  }

  ngOnDestroy(): void {
    this.numbersSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }

}
