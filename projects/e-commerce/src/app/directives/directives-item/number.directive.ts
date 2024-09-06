import { Directive,ElementRef,HostListener} from '@angular/core';

@Directive({
    selector:'[number]'
})
export class numberDirective {
    constructor(public elmRef:ElementRef){        
    }

    @HostListener('input', ['$event'])  onInputChange(event:any) {        
        const initalValue = this.elmRef.nativeElement.value;
    
        this.elmRef.nativeElement.value = initalValue.replace(/\D/g, '');
        if ( initalValue !== this.elmRef.nativeElement.value) {
          event.stopPropagation();
        }
      }
}