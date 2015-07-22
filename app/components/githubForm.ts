import {Component,View} from 'angular2/annotations';
import {EventEmitter} from 'angular2/core';
import {UserService} from '../services/user.service';

@Component({
    selector: 'github-form',
    events: ['load']
})
@View({
    templateUrl: './components/githubForm.html?v=<%= VERSION %>'
})
export class GithubForm {

    userService:UserService;
    load:EventEmitter;

    constructor(userService:UserService) {
        this.load = new EventEmitter();
        this.userService = userService;
    }

    onInputUsername(value:string) {
        this.userService.setUsername(value);
    }

    onInputPassword(value:string) {
        this.userService.setPassword(value);
    }

    onLoad() {
        this.load.next(this.userService);
    }
}