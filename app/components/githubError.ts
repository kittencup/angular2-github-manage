import {Component,View} from 'angular2/annotations';
import {EventEmitter} from 'angular2/core';

@Component({
    selector: 'github-error',
    properties:['message']
})
@View({
    template: `
        <div class="row github-error">
            <div class="alert alert-danger" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                {{message}}
            </div>
        </div>
    `
})
export class GithubError {


}