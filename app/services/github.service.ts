import {HttpService} from './http.service';
import {Http,Headers} from 'angular2/http';
import {Inject} from 'angular2/di';

export class GithubService extends HttpService {

    private username:string;
    private password:string;

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

    setAuthorization() {
        if (!this.requestOptions) {
            this.configGithubHeaders();
        }
        this.requestOptions.headers.set('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
    }

    setUsername(username:string):GithubService {
        this.username = username;
        this.setAuthorization();
        return this;
    }

    setPassword(password:string):GithubService {
        this.password = password;
        this.setAuthorization();
        return this;
    }

    getRepositories():Rx.Observable<any> {
        let api = 'https://api.github.com/user/repos?type=all&sort=created&nocache=' + (+new Date());
        return this.get(api);
    }

    deleteRepository(repository:any):Rx.Observable<any> {
        let api = 'https://api.github.com/repos/' + repository.owner.login + '/' + repository.name + '?&nocache=' + (+new Date());
        return this.delete(api);
    }

}