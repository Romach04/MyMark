import {makeAutoObservable} from "mobx";

export default class ParticantStore {
    
    _sports = [];
    _selectedSport = null;

    _participants = [];
    _selectedParticipant = null;


    participant = null;

    // _particantItem = null;
    
    constructor() {

        makeAutoObservable(this)
    }


    setSports(sports) {
        this._sports = sports;
    }

    setSelectedSport(sport) {
        this._selectedSport = sport;
    }

    setParticipants(participants) {
        this._participants = participants;
    }

    setSelectedParticipant(participant) {
        this._selectedParticipant = participant;
    }


    setParticipant(participant) {
        this.participant = participant;
    }



    // setParticipantItem(participant) {
    //     this._particantItem = participant
    // }


    get sports() {
        return this._sports;
    }

    get selectedSport() {
        return this._selectedSport;
    }

    get participants() {
        return this._participants;
    }

    get selectedParticipant() {
        return this._selectedParticipant;
    }


    get participantItem () {
        return this._particantItem;
    }

    printUserData() {

        console.log('SportSelected:', this._selectedSport);

    }

    
}


























// setBaskets(basket){
    //     this._baskets = [...basket]
    // }
    // setTypes(types) {
    //     this._types = types
    // }
    // setBrands(brands) {
    //     this._brands = brands
    // }
    // setDevices(devices) {
    //     this._devices = devices
    // }

    // setSelectedType(type) {
    //     this.setPage(1)
    //     this._selectedType = type
    // }

    // setSelectedBrand(brand) {
    //     this.setPage(1)
    //     this._selectedBrand = brand
    // }
    // setPage(page) {
    //     this._page = page
    // }
    // setTotalCount(count) {
    //     this._totalCount = count
    // }
    // get basket() {
    //     return this._baskets
    // }
    // get types() {
    //     return this._types
    // }
    // get brands() {
    //     return this._brands
    // }
    // get devices() {
    //     return this._devices
    // }
    // get selectedType() {
    //     return this._selectedType
    // }
    // get selectedBrand() {
    //     return this._selectedBrand
    // }
    // get totalCount() {
    //     return this._totalCount
    // }
    // get page() {
    //     return this._page
    // }
    // get limit() {
    //     return this._limit
    // }

// this._types = [
//     {id: 1, name : 'Холодильник'},
//     {id: 2, name : 'Смартфон'}
// ]

// this._brands = [
//     {id: 1, name : 'Samsung'},
//     {id: 2, name : 'Apple'}
// ]

// this._devices = [
//     {id:1, name: 'Iphone', price: 25000, rating: 5 , img: 'C:/Users/Роман/Desktop/img/foto_large.jpg' },
//     {id:2, name: 'Iphone 2', price: 25000, rating: 5 , img: 'C:/Users/Роман/Desktop/img/foto_large.jpg' },
//     {id:3, name: 'Iphone 3 ', price: 25000, rating: 5 , img: 'C:/Users/Роман/Desktop/img/foto_large.jpg' },
//     {id:4, name: 'Iphone 4', price: 25000, rating: 5 , img: 'C:/Users/Роман/Desktop/img/foto_large.jpg' }
// ]