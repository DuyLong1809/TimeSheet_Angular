import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branch'
})
export class BranchPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'All';
      case 1:
        return 'Hà Nội 1';
      case 3:
        return 'Hà Nội 2 ';
      case 8:
        return 'Sài gòn 1';
      case 31:
        return 'Kom Tum';
      case 32:
        return 'Đà nẵng';
      default:
        return '';
    }
  }

}
