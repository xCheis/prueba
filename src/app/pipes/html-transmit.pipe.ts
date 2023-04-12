import { Pipe,PipeTransform } from "@angular/core";

@Pipe({
    name: 'htmlTransmit'
})

export class HtmlTransmit implements PipeTransform{
     transform(value: any): string {
         const transformedValue = value.replace(/\n/g, '<br>').replace(/<red>/g, '<span class="red">').replace(/<\/red>/g, '</span>')
         return transformedValue;
        }
}