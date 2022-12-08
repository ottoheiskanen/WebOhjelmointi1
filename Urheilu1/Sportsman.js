import {Person} from './Person.js'

export class Sportsman extends Person {
    constructor(fNames, lName, nickname, birthYear, imgUrl, weight, sport, records) {
        super(fNames, lName, nickname, birthYear)
        this.imgUrl = imgUrl
        this.weight = weight
        this.sport = sport
        this.records = records
    }

    set fNames(value) {
        this._fNames = value
    }

    get fNames() {
        return this._fNames
    }

    set lName(value) {
        this._lName = value
    }

    get lName() {
        return this._lName
    }

    set nickname(value) {
        this._nickname = value
    }

    get nickname() {
        return this._nickname
    }

    set birthYear(value) {
        this._birthYear = value
    } 

    get birthYear() {
        return this._birthYear
    }

}