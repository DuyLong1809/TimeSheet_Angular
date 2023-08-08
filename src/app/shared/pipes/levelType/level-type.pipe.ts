import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelType'
})
export class LevelTypePipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1:
        return 'intern 0';
      case 2:
        return 'intern 1';
      case 3:
        return 'intern 2';
      case 4:
        return 'fresher-';
      case 5:
        return 'fresher';
      case 6:
        return 'fresher +';
      case 7:
        return 'junior-';
      case 8:
        return 'junior';
      case 9:
        return 'junior +';
      case 10:
        return 'Middle-';
      case 11:
        return 'Middle';
      case 12:
        return 'Middle+';
      case 13:
        return 'Senior-';
      case 14:
        return 'Senior';
      case 15:
        return 'Senior +';
      default:
        return '';
    }
  }

}
