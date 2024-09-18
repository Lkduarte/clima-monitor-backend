export class CulturaDto {
    ponto_cultivo : Localização;
    nome_cultivo : string;
    temperatura_max : number;
    pluviometria_max : number;
    temperatura_min : number;
    pluviometria_min : number;
    temperaturas : Temperatura[];
    pluviometrias : Pluviometria[];

    alertasTemp : Alerta[];
    alertasPluvi : Alerta[];
}


export type Temperatura = {
    data : Date,
    temperatura : number
}

export type Pluviometria = {
    data : Date,
    pluviometria : number
}

export type Localização = {
    latitude : string,
    longitude : string
}

export type Alerta = {
    [date: string] : number;
}

