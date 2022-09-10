export class Ticket {
    constructor(
        private idUser: string,
        private weekDay: string,
        private startTime: string,
        private endTime: string,

    ){}
    getIdBand(){
        return this.idUser
    }
    getDay(){
        return this.weekDay
    }
    getHourStart(){
        return this.startTime
    }
    getHourFinal(){
        return this.endTime
    }
}