import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverText]'
})
export class HoverTextDirective {


  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Hover listener toggle
  @HostListener("mouseenter") toggleHover() {
    // Grab the dropdown-menu class div
    let hiddenTextElement = this.el.nativeElement.querySelector(".hover-text");
    this.renderer.addClass(hiddenTextElement, "show")

  }

  @HostListener("mouseleave") toggleOffHover() {
    let hiddenTextElement = this.el.nativeElement.querySelector(".hover-text");
    this.renderer.removeClass(hiddenTextElement, "show")

  }

}
