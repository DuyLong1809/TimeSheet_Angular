import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proType'
})
export class ProTypePipe implements PipeTransform {

  transform(type: number): string {
    switch (type) {
      case 0:
        return 'Time & Materials';
      case 1:
        return 'Fixed Fee';
      case 2:
        return 'Non-Billable'; 
      case 3:
        return 'ODC';
      case 4:
        return 'Product';
      case 5:
        return 'Training';
      default:
        return '';
    }
  }

}
