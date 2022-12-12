import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchfilterPipe implements PipeTransform {
  transform(list: any[], value: any, key: []): any {
    value.forEach((name, index) => {
      if (name) {
        if (name == 'null') {
          return list;
        }

        list = list.filter((item) => {
          return (
            item[key[index]]
              .toString()
              .toLowerCase()
              .indexOf(name.toString().toLowerCase()) !== -1
          );
        });
      }
    });
    return list;
  }
}
