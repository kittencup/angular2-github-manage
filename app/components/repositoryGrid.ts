import {Component,View} from 'angular2/annotations';
import {NgFor,NgIf} from 'angular2/directives';
import {EventEmitter} from 'angular2/core';

@Component({
    selector: 'repository-grid',
    properties:['repositories','isLoading:is-loading'],
    events:['delete']
})
@View({
    templateUrl:'./components/repositoryGrid.html?v=<%= VERSION %>',
    directives: [NgFor,NgIf]
})
export class RepositoryGrid {

    delete:EventEmitter;
    isLoading:boolean;

    constructor(){
        this.delete = new EventEmitter();
    }
    onDelete(repository:any):void{
        this.delete.next(repository);
    }
}