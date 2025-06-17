// ORIGINAL

// interface User {
//   email: string;
// }

// @Injectable()
// class UserService {
//   public findUsers(query: string) {
//     return of([
//       { email: `user1@${query || "example"}.com` },
//       { email: `user2@${query || "example"}.com` },
//     ]);
//   }
// }

// @Component({
//   selector: "app-users",
//   template: `
//     <input
//       type="text"
//       [(ngModel)]="query"
//       (ngModelChange)="querySubject.next($event)"
//     />
//     <div *ngFor="let user of users">
//       {{ user.email }}
//     </div>
//   `,
// })
// export class AppUsers implements OnInit {
//   query = "";
//   querySubject = new Subject<string>();

//   users: User[] = [];

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     concat(of(this.query), this.querySubject.asObservable())
//       .pipe(
//         concatMap((q) =>
//           timer(0, 60000).pipe(concatMap(() => this.userService.findUsers(q)))
//         )
//       )
//       .subscribe({
//         next: (res) => (this.users = res),
//       });
//   }
// }

/* PROBLEMS DETECTED

 - Data flow:
  
    1. On init life cicle of the component we start the pipe with the query initial value, and after that we emit
       the next values emited throught the querySubject with every chngae in the input text.
    2. Using concatMap in the next step, we create a timer for each value emited from the input, and so a polling of
       users each 60 seconds for each one, what can cause a memory leak.
    3. Finally we subscribe to the pipe getting the results for each pool and asigning it to users array.

 - Angular/rxjs: 
    1. Not unsusbcribe to main observable.
    2. Not trackBy function in NgFor

 - Code style:
    1. Overuse of rxjs operators can have a negative impact in the code readibility.

*/

// POSSIBLE ALTERNATIVE SOLUTION

interface User {
  email: string;
}

@Injectable()
class UserService {
  public findUsers(query: string): Observable<User[]> {
    return of([
      { email: `user1@${query || "example"}.com` },
      { email: `user2@${query || "example"}.com` },
    ]);
  }
}

@Component({
  selector: "app-users",
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <input
      type="text"
      [(ngModel)]="query"
      (ngModelChange)="onInputChange($event)"
    />
    <ng-container *ngIf="users$ | async as users">
      <div *ngFor="let user of users; trackBy: trackByEmail">
        {{ user.email }}
      </div>
    </ng-container>
  `,
})
export class AppUsers implements OnInit {
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);
  public query = "";
  public querySubject = new Subject<string>();
  public users$: Observable<User[]> | undefined;

  ngOnInit(): void {
    this.users$ = this.setUsersFinder()
  }

  public onInputChange(value: string) {
    this.querySubject.next(value);
  }

  public trackByEmail(index: number, user: User): string {
    // We assume that email is unique
    // If not the case we can use index, but not ideal solution
    return user.email;
  }

  private setUsersFinder() {
    return concat(of(this.query), this.querySubject.asObservable()).pipe(
      debounceTime(500),
      switchMap((query) => this.userService.findUsers(query)),
      takeUntilDestroyed(this.destroyRef)
    );
  }
}
