// ORIGINAL

// @Component({
//   selector: 'app-users',
//   template: `
//     <div *ngFor="let user of users">
//         {{ getCapitalizeFirstWord(user.name) }}
//     </div>
//   `
// })
// export class AppUsers {

//   @Input()
//   users: { name: string; }[] = [];

//   constructor() {}

//   getCapitalizeFirstWord(name: string): string {
//     return name.split(' ').map(n => n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()).join(' ');
//   }
// }

//SOLUTION:

import { Component, Input } from '@angular/core';

@Component({
  selector: "app-users",
  template: `
    <div *ngFor="let user of users; trackBy: trackByName">
      {{ user.name }}
    </div>
  `,
})
export class AppUsers {
  private _users: { name: string }[] = [];

  @Input()
  set users(value: { name: string }[]) {
    if (value) {
      this._users = this.formatUsersName(value)
    }
  }

  get users(): { name: string }[] {
    return this._users;
  }

  private formatUsersName(users: { name: string }[]) {
    return users.map((user) => {
      user.name = this.getCapitalizeFirstWord(user.name);
      return user;
    });
  }

  private getCapitalizeFirstWord(name: string): string {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  public trackByName(_: number, user: { name: string }): string {
    return user.name;
  }
}

/* SOLUTION 1:

- Proper setter/getter implementation with input validation
- Clean separation of concerns with private formatUsersName method
- TrackBy function for better ngFor performance

*/

/* SOLUTION 2:

- With a DDD approach we can handle this transformations in domain layer
  with a value object and get the name formated ready when gets to the component, so 
  the logic about transformation its in the domain layer.

*/
