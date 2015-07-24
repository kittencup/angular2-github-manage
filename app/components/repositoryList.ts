import {Component,View} from 'angular2/annotations';
import {NgFor,NgIf} from 'angular2/directives';
import {NgIf} from 'angular2/directives';
import {GithubService} from '../services/github.service';
import {RepositoryFilter} from './repositoryFilter';
import {RepositoryGrid} from './repositoryGrid';
import {GithubForm} from './githubForm';
import {GithubError} from './githubError';
import {loading} from './loading';
import {RepositoryModel} from '../models/repository.model'


@Component({
    selector: 'repository-list',
    viewInjector: [GithubService]
})
@View({
    templateUrl: './components/repositoryList.html?v=<%= VERSION %>',
    directives: [
        loading,
        RepositoryFilter,
        RepositoryGrid,
        GithubForm,
        GithubError,
        NgIf
    ]
})
export class RepositoryList {

    private origRepositories:Array<RepositoryModel>;
    private filterValue:string;
    private githubService:GithubService;
    private message:string;
    private isLoading:boolean;

    constructor(githubService:GithubService) {
        this.githubService = githubService;
    }

    showLoading():RepositoryList {
        this.isLoading = true;
        return this;
    }

    hideLoading():RepositoryList {
        this.isLoading = false;
        return this;
    }

    onFilter(value:string):RepositoryList {
        this.filterValue = value;
        return this;
    }

    onDelete(repository:any):RepositoryList {
        if (confirm('Delete `' + repository.name + '` Repository?')) {

            this.showLoading();

            this.githubService
                .deleteRepository(repository)
                .subscribe((res:any):void => {
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
        return this;
    }

    onLoad(value:any):RepositoryList {
        this.githubService.setAuthorization(value);
        this.origRepositories = [];
        this.message = null;
        this.showLoading();
        this.getOrigRepositories();
        return this;
    }

    getOrigRepositories():RepositoryList {

        let observable = this.githubService.getRepositories();

        observable.subscribe((repositories:any):void=> {
            if (Array.isArray(repositories)) {
                if (!repositories.length) {
                    this.message = 'repositories not found!'
                }
                repositories.forEach((repository:any):void=> {
                    let repository = new RepositoryModel(repository);
                    this.origRepositories.push(repository);
                });

            } else {
                this.message = repositories.message;
            }

            this.hideLoading();
        });

        return this;
    }

    get repositories():Array<RepositoryModel> {
        if (this.origRepositories) {
            if (this.filterValue) {
                return this.origRepositories.filter((repository:RepositoryModel):boolean=> {
                    return repository.name.match(this.filterValue) || repository.owner.match(this.filterValue)
                });
            } else {
                return this.origRepositories;
            }

        }
        return [];
    }

}