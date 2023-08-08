import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proTypeView'
})
export class ProTypeViewPipe implements PipeTransform {

  transform(type: number): string {
    switch (type) {
      case 0:
        return 'T&M';
      case 1:
        return 'FF';
      case 2:
        return 'NB'; 
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
