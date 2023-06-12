import { Pipe, PipeTransform } from '@angular/core';
import {MenuItem, MenuSection} from "./appointment.component";

@Pipe({
  name: 'filterByRange'
})
export class FilterByRangePipe implements PipeTransform {
  public Empty: boolean = false;
  transform(items: MenuItem[], minValue:number, maxValue:number, sortAscending: boolean = true) {
    if (items.length>0 && items != undefined && items != null ) {

      let array: MenuItem[] = items.filter(item => {
        if (item.price >= minValue && item.price <= maxValue) {
          return item;
        } else {return;}
      });

      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
          if (array[j].price > array[j+1].price) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
          }
        }
      }
      if(array.length<=0){
        let temp: MenuSection = {title: 'Nothing', SectionInfo: []};
        let one: Array<MenuItem> = [{
          title: 'We could not find something for You',
          price: 0,
          duration: 0,
          imagePath: '/assets/img/notFound.webp'
        }];
        return one;
      }
      if (sortAscending) {
        return array;
      } else {
        return array.reverse();
      }

    } else {return;}
  }

}
