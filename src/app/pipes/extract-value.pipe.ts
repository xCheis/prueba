import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'extractValue'
})

export class ExtractValuePipe implements PipeTransform{
    transform(value: string, replaceValue: string) : string {
     return value.replace(/{([^}]*)}/g, replaceValue);
    }
}