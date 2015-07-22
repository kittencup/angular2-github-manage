import {Component,View} from 'angular2/annotations';
import {NgFor,NgIf} from 'angular2/directives';
import {httpInjectables, Http} from 'angular2/http';
import {Inject} from 'angular2/di';
import {NgIf} from 'angular2/directives';
import {GithubService} from '../services/github.service';
import {RepositoryFilter} from './repositoryFilter';
import {RepositoryGrid} from './repositoryGrid';
import {GithubForm} from './githubForm';
import {GithubError} from './githubError';
import {loading} from './loading';

@Component({
    selector: 'repository-list',
    viewInjector: [GithubService]
})
@View({
    templateUrl: './components/repositoryList.html?v=<%= VERSION %>',
    directives: [loading, RepositoryFilter, RepositoryGrid, GithubForm, GithubError, NgIf]
})
export class RepositoryList {

    private origRepositories:Array;
    private filterValue:String;
    private githubService:GithubService;
    private message:string;
    private isLoading:boolean;

    constructor(githubService:GithubService) {
        this.githubService = githubService;
    }

    showLoading() {
        this.isLoading = true;
    }

    hideLoading() {
        this.isLoading = false;
    }

    onFilter(value:string):void {
        this.filterValue = value;
    }

    onDelete(repository:any):void {
        if (confirm('Delete `' + repository.name + '` Repository?')) {

            this.showLoading();

            this.githubService
                .deleteRepository(repository)
                .subscribe(res => {
                    if (res === true) {
                        let index = this.origRepositories.findIndex(function (o) {
                            return o.id == repository.id
                        });

                        if (index !== -1) {
                            this.origRepositories.splice(index, 1);
                        }
                    } else {
                        this.message = res.message;
                    }

                    this.hideLoading();
                });

        }
    }

    onLoad() {
        this.origRepositories = [];
        this.message = null;
        this.showLoading();
        this.getOrigRepositories();
    }

    getOrigRepositories():void {
        var observable = this.githubService.getRepositories();

        observable.subscribe(repositories => {
            if (Array.isArray(repositories)) {
                if (!repositories.length) {
                    this.message = 'repositories not found!'
                }

                // @todo:add model
                repositories.forEach((repository:any)=> {
                    repository.created_at = new Date(repository.created_at);
                    this.origRepositories.push(repository);
                });

            } else {
                this.message = repositories.message;
            }

            this.hideLoading();
        });
    }

    get repositories():Array {
        if (this.origRepositories) {
            if (this.filterValue) {
                return this.origRepositories.filter((repository:any):boolean=> {
                    return repository.name.match(this.filterValue) || repository.owner.login.match(this.filterValue)
                });
            } else {
                return this.origRepositories;
            }

        }
        return [];
    }

}