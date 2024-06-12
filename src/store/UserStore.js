import {makeAutoObservable, toJS} from 'mobx';

export default class UserStore {

    constructor() {
        // this._isAuth = true;
        // this._user = {}
        makeAutoObservable(this)
    }

    username = '';
    password = '';
    phoneNumber = null;


    setUsername(username){
        this.username = username;
    }




    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._ = user
    }

    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }



    
}






