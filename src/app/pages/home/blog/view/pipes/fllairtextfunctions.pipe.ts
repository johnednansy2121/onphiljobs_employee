import {ElementRef, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'fllairtextfunctions'
})
export class FllairTextFunctionsPipe implements PipeTransform {

  constructor(
      protected sanitizer:DomSanitizer) {
  }

  transform(value: string, ...args: unknown[]): unknown {

    //in here we are going to build a small scripting language
    //replacing text commands like
    //[task|Speak to 3 Clients|1week]
    //with a parser that will execute it i.e.
    //<a href="CreateTask('taskname', '1 week')">Speak to 3 Clients</a>
    //the if the user clicks it, fllair will generate and create a task for them.
    return this.sanitizer.bypassSecurityTrustHtml(value.replace(/resume/g, '🤪🤪🤪<cfg class="btn btn-link" id="customCommand" command="ASDADSASDASDASD"">CLICK ME</cfg>🤪🤪🤪'));
  }

}
