/// <reference path="../typings/tsd.d.ts" />
import {bootstrap} from 'angular2/core';
import {Component, View} from 'angular2/annotations';
import {httpInjectables} from 'angular2/http';
import {RepositoryList} from './components/RepositoryList';

@Component({
    selector: 'app'
})
@View({
    template: `
        <repository-list></repository-list>
    `,
    directives: [RepositoryList]
})
class App {

}
bootstrap(App, [httpInjectables]);
