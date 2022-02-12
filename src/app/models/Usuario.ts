export class Usuario {

    public _id: any;
    public nombre: string;
    public correo: string;
    public password: string;
    public rol: string;
    public image: string;
    public estado: boolean;
    public google: boolean;

    constructor(
        _id: any,
        nombre: string,
        correo: string,
        password: string,
        rol: string,
        image: string,
        estado: boolean,
        google: boolean
    ){
        this._id = _id;
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
        this.rol = rol;
        this.image = image;
        this.estado = estado;
        this.google = google;
    }
}