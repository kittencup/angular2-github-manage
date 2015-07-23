import {Component,View} from 'angular2/annotations';

@Component({
    selector: 'github-error',
    properties: ['message']
})
@View({
    template: `
        <div class="row github-error">
            <div class="alert alert-danger" role="alert">
                {{message}}
            </div>
        </div>
    `
})
export class GithubError {


}