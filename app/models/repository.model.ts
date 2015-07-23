export class RepositoryModel {

    id:number;
    language:string;
    owner:string;
    name:string;
    html_url:string;
    created_at:Date;
    isPrivate:boolean;
    isFork:boolean;
    isAdmin:boolean;

    constructor(repository:any) {
        this.id = repository.id;
        this.language = repository.language;
        this.owner = repository.owner.login;
        this.name = repository.name;
        this.created_at = new Date(repository.created_at);
        this.isPrivate = repository.private;
        this.isFork = repository.fork;
        this.isAdmin = repository.permissions.admin;
        this.html_url = repository.html_url;
    }
}