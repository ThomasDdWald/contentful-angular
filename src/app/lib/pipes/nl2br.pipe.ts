import { Pipe, PipeTransform } from '@angular/core';

const BREAK_TAG = '<br>';

@Pipe({name: 'nl2br'})
export class Nl2BrPipe implements PipeTransform {
  transform(value: string): any {
    if (!value) {
      return value;
    }
    return (value + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + BREAK_TAG + '$2');
  }
}
