import { Pipe, PipeTransform } from '@angular/core';
import { ListUserTeamInterface } from 'src/app/modules/ts-project/project/handle/interface/project-interface';
import { ListType } from '../enum/list-type';

@Pipe({
  name: 'combinedTypeAndBranch'
})
export class CombinedTypeAndBranchPipe implements PipeTransform {

  transform(listUserTeam: ListUserTeamInterface[], searchInput: string, allBranch: number, selectedType: number): ListUserTeamInterface[] {
    let filteredUsers: ListUserTeamInterface[] = listUserTeam;

    if (allBranch !== 0) {
      filteredUsers = filteredUsers.filter(user => user.branchId === Number(allBranch));
    }

    if (selectedType !== ListType.All) {
      filteredUsers = filteredUsers.filter(user => user.type === selectedType);
    }
    if (searchInput) {
      const searchTerm = searchInput.toLowerCase();
      filteredUsers = filteredUsers.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.emailAddress.toLowerCase().includes(searchTerm)
      );
    }

    return filteredUsers;
  }

}
