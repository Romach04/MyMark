import {makeAutoObservable} from "mobx";

export default class OrganizationStore {
    constructor() {
        this._types = []
            
        this._brands = []
        this._baskets = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 10
        this._limit = 3
        makeAutoObservable(this)
    }

    setBaskets(basket){
        this._baskets = [...basket]
    }
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    get basket() {
        return this._baskets
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    
}







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