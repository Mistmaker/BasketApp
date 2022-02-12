export class Jugador {

    public _id: string;
    public cedula: string;
    public nombres: string;
    public alias: string;
    public correo: string;
    public whatsapp: string;
    public telefono: string;
    public provincia: string;
    public ciudad: string;
    public fecha_nacimiento: string;
    public password: string;
    public tipo_usuario: string;
    public estado: string;
    public img: string;
    public file: string;
    public idequipo: string;
    public equipo: string;
    public idcampeonato: string;
    imgMostrar!: string;


    constructor(
        _id: string,
        cedula: string,
        nombres: string,
        correo: string,
        whatsapp: string,
        telefono: string,
        provincia: string,
        ciudad: string,
        fecha_nacimiento: string,
        password: string,
        tipo_usuario: string,
        estado: string,
        img: string,
        file: string,
        idequipo: string,
        equipo: string,
        idcampeonato: string
    ) {
        this._id = _id;
        this.cedula = cedula;
        this.nombres = nombres;
        this.correo = correo;
        this.whatsapp = whatsapp;
        this.telefono = telefono;
        this.provincia = provincia;
        this.ciudad = ciudad;
        this.fecha_nacimiento = fecha_nacimiento;
        this.password = password;
        this.tipo_usuario = tipo_usuario;
        this.estado = estado;
        this.img = img;
        this.file = file;
        this.idequipo = idequipo;
        this.equipo = equipo;
        this.idcampeonato = idcampeonato;
        this.alias = '';
    }
}