import { Pipe, PipeTransform } from '@angular/core';
import { ListUserTeamInterface } from 'src/app/modules/ts-project/project/handle/interface/project-interface';

@Pipe({
  name: 'searchTeam'
})
export class SearchTeamPipe implements PipeTransform {

  transform(listUserTeam: ListUserTeamInterface[], searchInputTeam: string): ListUserTeamInterface[] {
    let filteredUsers: ListUserTeamInterface[] = listUserTeam;

    if (searchInputTeam) {
      const searchTerm = searchInputTeam.toLowerCase();
      filteredUsers = filteredUsers.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.emailAddress.toLowerCase().includes(searchTerm)
      );
    }

    return filteredUsers;
  }

}
