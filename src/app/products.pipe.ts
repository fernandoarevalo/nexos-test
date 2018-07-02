import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /**
   * This function allow list filter by parameter
   * @param value 
   * @param args 
   */
  transform(value: any, args?: any): any {
    if (!value) return [];
    if (!args) {
      return value;
    }

    return value.filter(item => item.name.toLowerCase().includes(args.toLowerCase()) >= 0 && item.description.toLowerCase().includes(args.toLowerCase()));
  }

}

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  /**
   * Sort list by column name
   * @param value 
   * @param args 
   */
  transform(value: any, args?: any): any {
    if (!value) return [];
    if (!args.isDesc && !args.column) {
      return value;
    }
    args.isDesc = !args.isDesc;
    let direction = args.isDesc ? 1 : -1;

    return value.sort(function (a, b) {
      if (a[args.column] < b[args.column]) {
        return -1 * direction;
      }
      else if (a[args.column] > b[args.column]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  }

}
