import {Component,View} from 'angular2/annotations';
import {EventEmitter} from 'angular2/core';
import {GithubService} from '../services/github.service';

@Component({
    selector: 'github-form',
    events: ['load'],
    properties: ['isLoading:is-loading'],
})
@View({
    templateUrl: './components/githubForm.html?v=<%= VERSION %>'
})
export class GithubForm {

    githubService:GithubService;
    load:EventEmitter;
    isLoading:boolean;

    constructor(githubService:GithubService) {
        this.load = new EventEmitter();
        this.githubService = githubService;
    }

    onInputUsername(value:string):GithubForm {
        this.githubService.setUsername(value);
        return this;
    }

    onInputPassword(value:string):GithubForm {
        this.githubService.setPassword(value);
        return this;
    }

    onLoad():GithubForm {
        this.load.next('...load repository');
        return this;
    }
}