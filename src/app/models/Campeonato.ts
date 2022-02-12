export class Campeonato {
    public _id: string;
    public nombre: string;
    public nro_jugadores: number;
    public fecha_inicio: string;
    public fecha_fin: string;
    public id_organizador: string;
    public nombre_organizador: string;
    public categoria: string;
    public descripcion: string;
    public fotoPerfil: string;
    public filePerfil: any;
    public modalidad: string;
    public enfrentamientos_grupo: string;
    public nro_grupos: number;
    public cant_clasificados: number;
    public tipo_fechas: string;
    public estado_campeonato: string;
    configuraciones: {
        jugadores_ingreso_rapido: boolean,
        suspension_cant_ta: { cantidad: number, partidos_suspendidos: number },
        suspension_cant_tr: { cantidad: number, partidos_suspendidos: number },
    }

    constructor(
        _id: string,
        nombre: string,
        fecha_inicio: string,
        fecha_fin: string,
        id_organizador: string,
        nombre_organizador: string,
        categoria: string,
        descripcion: string,
        fotoPerfil: string,
        filePerfil: any,
        modalidad: string
    ) {
        this._id = _id;
        this.nombre = nombre;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.id_organizador = id_organizador;
        this.nombre_organizador = nombre_organizador;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.fotoPerfil = fotoPerfil;
        this.filePerfil = filePerfil;
        this.modalidad = modalidad;
        this.enfrentamientos_grupo = '';
        this.nro_grupos = 0;
        this.cant_clasificados = 0;
        this.nro_jugadores = 0;
        this.tipo_fechas = '';
        this.estado_campeonato = 'abierto';
        this.configuraciones = {
            jugadores_ingreso_rapido: false,
            suspension_cant_ta: { cantidad: 0, partidos_suspendidos: 0 },
            suspension_cant_tr: { cantidad: 0, partidos_suspendidos: 0 },
        }
    }
}

export class CampeonatoPerfil {
    public _id: string;
    public anterior: string;
    public fotoPerfil: string;
    public filePerfil: any;

    constructor(
        _id: string,
        anterior: string,
        fotoPerfil: string,
        filePerfil: any,
    ) {
        this._id = _id;
        this.anterior = anterior;
        this.fotoPerfil = fotoPerfil;
        this.filePerfil = filePerfil;
    }
}
