import {Component,View} from 'angular2/annotations';
import {NgFor,NgIf} from 'angular2/directives';
import {httpInjectables, Http} from 'angular2/http';
import {Inject} from 'angular2/di';
import {UserService} from '../services/user.service';
import {RepositoryFilter} from './repositoryFilter';
import {RepositoryGrid} from './repositoryGrid';
import {GithubForm} from './githubForm';
import {GithubError} from './githubError';
import {NgIf} from 'angular2/directives';

@Component({
    selector: 'repository-list',
    viewInjector: [UserService]
})
@View({
    templateUrl: './components/repositoryList.html?v=<%= VERSION %>',
    directives: [RepositoryFilter, RepositoryGrid, GithubForm,GithubError,NgIf]
})
export class RepositoryList {

    private origRepositories:Array;
    private filterValue:String;
    private userService:UserService;
    private message:string;

    constructor(userService:UserService) {
        this.userService = userService;
    }

    onFilter(value:string):void {
        this.filterValue = value;
    }

    onDelete(repository:any):void {
        if (confirm('Delete `' + repository.name + '` Repository?')) {
          this.userService
              .deleteRepository(repository)
              .subscribe(res => {
                  if(res === true){
                      let index = this.origRepositories.findIndex(function(o){
                          return o.id == repository.id
                      });

                      if(index !== -1){
                          this.origRepositories.splice(index, 1);
                      }
                  }else{
                      this.message = res.message;
                  }
            });
        }
    }

    onLoad(useService:UserService) {
        this.origRepositories = [];
        this.message = null;
        this.getOrigRepositories();
    }

    getOrigRepositories():void {
        var observable = this.userService.getRepositories();

        observable.subscribe(repositories => {
            if(Array.isArray(repositories)) {
                if(!repositories.length){
                    this.message = 'repositories not found!'
                }
                this.origRepositories = repositories;
            }else{
               this.message = repositories.message;
            }
        });
    }

    get repositories():Array {
        if (this.origRepositories) {
            if (this.filterValue) {
                return this.origRepositories.filter((repository:any):boolean=> {
                    return repository.name.match(this.filterValue)
                });
            } else {
                return this.origRepositories;
            }

        }
        return [];
    }

}