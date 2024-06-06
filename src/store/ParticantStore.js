import {makeAutoObservable} from "mobx";

export default class ParticantStore {
    
    _sports = [];
    _selectedSport = null;

    _participants = [];
    _selectedParticipant = null;

    _particantItem = null;
    _scores = [];
    
    constructor() {

        makeAutoObservable(this)
    }

    //
    setSports(sports) {
        this._sports = sports;
    }

    setSelectedSport(sport) {
        this._selectedSport = sport;
    }

    //
    setParticipants(participants) {
        this._participants = participants;
    }

    setSelectedParticipant(participant) {
        this._selectedParticipant = participant;
    }

    //

    setParticipantItem(participant) {
        this._particantItem = participant
    }

    setScores(scores) {
        this._scores = scores;
    }


    get sports() {
        return this._sports;
    }

    get selectedSport() {
        return this._selectedSport;
    }

    //
    get participants() {
        return this._participants;
    }

    get selectedParticipant() {
        return this._selectedParticipant;
    }


    //
    get participantItem () {
        return this._particantItem;
    }


    get scores() {
        return this._scores;
    }
    
    printUserData() {

        console.log('SportSelected:', this._selectedSport);

    }

    
}


