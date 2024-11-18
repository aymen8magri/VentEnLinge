export class Admin {
    id!:string;
    username:string;
    pwd:string;
    constructor(username:string,pwd:string,){
        this.username=username;
        this.pwd=pwd;
    }
}
