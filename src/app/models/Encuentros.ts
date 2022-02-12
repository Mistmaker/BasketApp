export class Encuentros {

    public _id: string;
    public equipo1: string;
    public equipo2: string;
    public estado: boolean;
    public idfecha: string;
    public idcampeonato: string;
    public fecha: string;
    public hora: string;
    public cancha: string;
    estadorelleno!: boolean;
    resultado1!: number;
    resultado2!: number;
    idgrupo!: string;
    cuartos_basquet: {
        pc: { equipo1: number, equipo2: number },
        sc: { equipo1: number, equipo2: number },
        tc: { equipo1: number, equipo2: number },
        cc: { equipo1: number, equipo2: number },
    }

    constructor(
        _id: string,
        equipo1: string,
        equipo2: string,
        estado: boolean,
        idfecha: string,
        idcampeonato: string,
        fecha: string,
        hora: string,
        cancha: string
    ) {
        this._id = _id;
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.estado = estado;
        this.idfecha = idfecha;
        this.idcampeonato = idcampeonato;
        this.fecha = fecha;
        this.hora = hora;
        this.cancha = cancha;
        this.cuartos_basquet = {
            pc: { equipo1: 0, equipo2: 0 },
            sc: { equipo1: 0, equipo2: 0 },
            tc: { equipo1: 0, equipo2: 0 },
            cc: { equipo1: 0, equipo2: 0 },
        }
    }
}