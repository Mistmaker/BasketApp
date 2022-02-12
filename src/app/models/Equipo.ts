export class Equipo {

    public _id: string;
    public nombre: string;
    public nro_jugadores: number;
    public cedula_rep: string;
    public nombre_rep: string;
    public logo_equipo: string;
    public estado: boolean;
    public file: any;
    public idcampeonato: string;
    logoMostrar!: string;

    constructor(
        _id: string,
        nombre: string,
        nro_jugadores: number,
        cedula_rep: string,
        logo_equipo: string,
        estado: boolean,
        file: any,
        idcampeonato: string
    ) {
        this._id = _id;
        this.nombre = nombre;
        this.nro_jugadores = nro_jugadores;
        this.cedula_rep = cedula_rep;
        this.logo_equipo = logo_equipo;
        this.estado = estado;
        this.file = file;
        this.idcampeonato = idcampeonato;
        this.nombre_rep = '';
    }
}