import {Component,View} from 'angular2/annotations';
import {EventEmitter} from 'angular2/core';
import {Validators, formDirectives, ControlGroup} from 'angular2/forms';
// @todo maybe angular 2 bug
import {FormBuilder} from 'angular2/angular2';

@Component({
    selector: 'github-form',
    events: ['load'],
    properties: ['isLoading:is-loading'],
    viewInjector: [FormBuilder]
})
@View({
    templateUrl: './components/githubForm.html?v=<%= VERSION %>',
    directives:[formDirectives]
})
export class GithubForm {

    load:EventEmitter;
    isLoading:boolean;
    form: ControlGroup;

    constructor(formBuilder: FormBuilder) {
        this.load = new EventEmitter();
        this.form = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLoad(value:any):GithubForm {
        this.load.next(value);
        return this;
    }
}