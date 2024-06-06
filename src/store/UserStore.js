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
    selectedSport = {id: 0, sport_name: 'Гимнастика'};

    typeSport = [
        {id: 0, sport_name: 'Гимнастика'},
        {id: 1, sport_name: 'Лыжи'},
        {id: 2, sport_name: 'Тяжелая ателтика'},
        {id: 3, sport_name: 'Бальные танцы'},
    ]


    selectedParticipants = [
        {id: 0, surname: "Смирнов", name: "Владимир", middleName: "Сергеевич", sportEntity: {sport_id : 0, sportName : "Гимнастика"} },
        {id: 1, surname: "Сергеев", name: "Александр", middleName: "Владимирович", sportEntity: {sport_id : 0, sportName : "Гимнастика"} },
        {id: 2, surname: "Соколов", name: "Владимир", middleName: "Сергеевич", sportEntity: {sport_id : 1, sportName : "Лыжи"} },
        {id: 3, surname: "Минеев", name: "Никита", middllName: "Викторович", sportEntity: {sport_id : 3, sportName : "Бальные танцы"} }

    ]

    criteria = [
        {name: "Ловкость"},
        {name: "Сила"},
        {name: "Выносливость"}
    ]

    setUsername(username){
        this.username = username;
    }

    setParticipantScores(participant){
        this.articipant = participant;
    }

    setSelectedSport(sport) {
        this.selectedSport = sport;
    }


    setSelectedParticipants(participants){
        this.participants = participants;
    }


    printUserData() {
        console.log('Sport:', toJS(this.selectedSport));

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






