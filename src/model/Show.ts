
export class Show {
    constructor(
        private idBand: string,
        private weekDay: string,
        private startTime: string,
        private endTime: string,
    ){}
    getIdBand(){
        return this.idBand
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