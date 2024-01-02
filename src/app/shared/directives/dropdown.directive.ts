import { Directive, ElementRef, Host, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen: boolean = false;
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}