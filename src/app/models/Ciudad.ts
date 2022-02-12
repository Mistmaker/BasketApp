export class Ciudad {

    public codigo_ciu: string;
    public codigo_prov: string;
    public nombre_ciu: string;

    constructor(
        codigo_ciu: string,
        codigo_prov: string,
        nombre_ciu: string
    ){
        this.codigo_ciu = codigo_ciu;
        this.codigo_prov = codigo_prov;
        this.nombre_ciu = nombre_ciu;
    }
}