import {Component,View} from 'angular2/annotations';
import {EventEmitter} from 'angular2/core';

@Component({
    selector: 'repository-filter',
    events: ['filter']
})
@View({
    templateUrl: './components/repositoryFilter.html?v=<%= VERSION %>'
})
export class RepositoryFilter {

    filter:EventEmitter;

    constructor() {
        this.filter = new EventEmitter();
    }

    onFilter(value:string):RepositoryFilter {
        this.filter.next(value);
        return this;
    }
}