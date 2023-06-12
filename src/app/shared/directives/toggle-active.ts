import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[toggleActive]'
})
export class toggleActiveDirective {
  @HostBinding('class._active')isOpen = false;

  @HostListener('click')onClick() {
    this.isOpen = !this.isOpen;
  }
}
