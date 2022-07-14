
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Output } from '@angular/core';



@Directive({
  selector: '[appClickOut]'
})
export class ClickOutDirective  {

  constructor(private elementRef: ElementRef) { }

  @Output() clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(event)
      console.log('clicked outside!')
    }

  }



}

