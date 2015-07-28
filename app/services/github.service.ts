import {HttpService} from './http.service';
import {Http,Headers} from 'angular2/http';
import {Inject} from 'angular2/di';

export class GithubService extends HttpService {

    constructor(@Inject(Http) http:Http) {
        super(http);
        this.configGithubHeaders();
    }

    configGithubHeaders():GithubService {
        let headers = new Headers();
        headers.set('Accept', 'application/vnd.github.v3+json');
        headers.set('Content-Type', 'application/json;charset=UTF-8');
        this.requestOptions = {
            headers: headers
        };
        return this;
    }

    setAuthorization(value) {
        if (!this.requestOptions) {
            this.configGithubHeaders();
        }
        this.requestOptions.headers.set('Authorization', 'Basic ' + btoa(value.username + ':' + value.password));
    }

    getRepositories():Rx.Observable<any> {
        let api = 'https://api.github.com/user/repos?type=all&sort=created&nocache=' + (+new Date());
        return this.get(api);
    }

    deleteRepository(repository:any):Rx.Observable<any> {
        let api = 'https://api.github.com/repos/' + repository.owner + '/' + repository.name + '?&nocache=' + (+new Date());
        return this.delete(api);
    }

}