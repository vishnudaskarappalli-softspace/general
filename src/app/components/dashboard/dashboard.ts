import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Utils } from '../../service/utility/utils';
import { catchError, concatMap, EMPTY, mergeMap, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private utility = inject(Utils);
  private destroyRef = inject(DestroyRef);

  count = signal<number>(0);
  updatedCount = computed(()=> this.count() + 10);

  ngOnInit() {
    this.utility.getErrorApi().pipe(catchError(err => of(10)),takeUntilDestroyed(this.destroyRef)).subscribe({
      // next: (data) => console.log(data),
      // error: (err) => console.error(err),
    });

    this.utility.streamWithDelay().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      // next: (data) => console.log(data),
      // error: (err) => console.error(err),
    });

    // this.utility.streamWithDelay().pipe(switchMap(val=> {return this.utility.singleResponseWithDelay(val)} )).subscribe({
    this.utility.streamWithDelay().subscribe({
      next: (val) =>{ 
        console.log(val);
        this.count.set(val);
        console.log(this.updatedCount());
        
      }
    })
  }
}
