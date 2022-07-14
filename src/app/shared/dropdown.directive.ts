import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor( private elementRef: ElementRef, private renderer: Renderer2) { }

  //  When "isOpen" switches to true this will be added; when it's false, it will be removed
  @HostBinding("class.show") isOpen = false;

  // Click listener toggle
  @HostListener("click") toggleOpen() {
    // Change "isOpen" to the opposite of what it currently is
    this.isOpen = !this.isOpen;

    // Grab the dropdown-menu class div
    let dropdownList = this.elementRef.nativeElement.querySelector(".dropdown-menu");

    if (this.isOpen) {
      // if isOpen is true => ADD the class "show" to our dropdownList
      this.renderer.addClass(dropdownList, "show");
    } else {
      // if isOpen is false => REMOVE the "show" class from dropdownList
      this.renderer.removeClass(dropdownList, "show")
    }
  }



}
