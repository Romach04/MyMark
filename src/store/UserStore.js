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



    // reset() {
    //     this.phoneNumber = null;
    //     this.email = '';
    //     this.password = ''
    //     this.selectedService = '';
    //     this.selectedLocation = '';
    //     this.selectedTime = '';
    //     this.selectedOrganization = {};
    //     this.selectedServices = [];
    // }

    






    
}












// import {makeAutoObservable} from 'mobx';

// export default class UserStore {

//     phoneNumber = null;
//     email = '';
//     password = '';
//     selectedService = {type_id: 0, type_code: 1,  type_name: 'Мойка'}; // выбранная услуга: 'шиномонтаж' или 'мойка'
//     selectedLocation = ''; // выбранное место
//     selectedTime = '';  // Выбранное время
//     selectedOrganization = {}; 
//     selectedServices = [] // Выбранные услуги для организации

//     organizations = [
//         { organization_id: 0, subject_name: 'Агригатор_Мойка', city_name: 'Москва', street_name: 'Буянова', house_number: 23, organization_type: 1 },
//         { organization_id: 1, subject_name: 'МоскваСити_Мойка', city_name: 'Москва', street_name: 'Матросова', house_number: 21,organization_type: 1 },
//         { organization_id: 2, subject_name: 'РусАвто_Сервис', city_name: 'Самара', street_name: 'Буянова', house_number: 44, organization_type: 2},
//         { organization_id: 3, subject_name: 'СамараАвто_Сервис', city_name: 'Самара', street_name: 'Маяковская', house_number: 55, organization_type: 2 },
//     ];

//     carServices = [
//         { type_id: 0, type_code: 1,  type_name: 'Мойка кузова', price: 500, duration: 15 },
//         { type_id: 1, type_code: 1,  type_name: 'Мойка днища', price: 700, duration:  60},
//         { type_id: 2, type_code: 1,  type_name: 'Полировка', price: 1000, duration: 10 },
//         { type_id: 3, type_code: 2,  type_name: 'Ремонт двигателя', price: 5000, duration: 15 },
//         { type_id: 4, type_code: 2,  type_name: 'Замена масла', price: 1000, duration: 55 },
//         { type_id: 5, type_code: 2,  type_name: 'Подготовка к зиме', price: 1500, duration: 80 },
//     ];

//     typeService = [
//         {type_id: 0, type_code: 1,  type_name: 'Мойка'},
//         {type_id: 1, type_code: 2,  type_name: 'Шиномонтаж'},
//         {type_id: 2, type_code: 3,  type_name: 'Автосервис'},
//     ]
   
//     constructor() {
//         // this._isAuth = true;
//         // this._user = {}
//         makeAutoObservable(this)
//     }

//     setPhoneNumber(phoneNumber) {
//         this.phoneNumber = phoneNumber;
//     }

//     setEmail(email) {
//         this.email = email;
//     }


//     setPassword(password){
//         this.password = password;
//     }
//     setSelectedService(service) {
//         this.selectedService = service;
//     }

//     setSelectedLocation(location) {
//         this.selectedLocation = location;
//     }

//     setSelectedOrganization(organization) {
//         this.selectedOrganization = organization;
//     }


//     addSelectedServices(service) {
//         this.selectedServices.push(service);
//     }

//     removeSelectedServices(serviceId) {
//         this.selectedServices = this.selectedServices.filter(service => service.type_id !== serviceId);
//     }


//     setSelectedTime(time) {
//         this.selectedTime = time;
//     }

//     ////////////////////////////////////

//     getPhone() {
//         return this.phoneNumber
//     }

//     getEmail() {
//         return this.email
//     }

//     getPassword(){
//         return this.password
//     }
    
//     getSelectedLocation(){
//         return this.selectedLocation
//     }

//     getSelectedOrganization(){
//         return this.selectedOrganization
//     }
//     getSelectedService() {
//         return this.selectedService
//     }
//     getSelectedTime(){
//         return this.selectedTime
//     }
//     getSelectedServices() {
//         return this.selectedServices
//     }


//     reset() {
//         this.phoneNumber = null;
//         this.email = '';
//         this.password = ''
//         this.selectedService = '';
//         this.selectedLocation = '';
//         this.selectedTime = '';
//         this.selectedOrganization = {};
//         this.selectedServices = [];
//     }

//     printUserData() {

//         console.log('Phone Number:', this.phoneNumber);
//         console.log('Email:', this.email);
//         console.log('Password:', this.password);
//         console.log('Selected Service:', this.selectedService);
//         console.log('Selected Location:', this.selectedLocation);
//         console.log('Selected Organization:', this.selectedOrganization = {});
//         console.log('Selected Time:', this.selectedTime);
//         ;
//     }




//     //////////////////////


//     setIsAuth(bool) {
//         this._isAuth = bool
//     }

//     setUser(user) {
//         this._ = user
//     }

//     get isAuth(){
//         return this._isAuth
//     }
//     get user(){
//         return this._user
//     }

    
// }



