/// <reference path="../typings/custom.system.d.ts" />
System.config({
    baseURL: '<%= APP_BASE %>',
    paths: {'*': '*.js?v=<%= VERSION %>'}
});

System.import('app');