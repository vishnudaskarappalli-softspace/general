import { Service } from '@angular/core';
import { delay, interval, map, of, take } from 'rxjs';

@Service()
export class Utils {
  getErrorApi() {
    return of(1, 2, 3, 4, 5).pipe(
      map((data: any) => {
        if (data === 3) throw new Error('Error occurred');
        return data;
      }),
    );
  }

  streamWithDelay() {
   return interval(3000).pipe(
      take(6),
      map((val)=> val+1)
    )
  }

  singleResponseWithDelay(digit:number) {
    return of(digit).pipe(delay(4000));
  }
}
