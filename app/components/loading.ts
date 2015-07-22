import {Component,View} from 'angular2/annotations';

@Component({
    selector: 'loading'
})
@View({
    template: `
         <div class="col-md-12 text-center">
            <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
        </div>
    `,
})
export class loading{

}