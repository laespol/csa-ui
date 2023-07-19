export interface Sendmail {
    idsendmail?: number;
    destinatario: string;
    html: string;
    subject: string
    status: string;
    idsolicitante?: number;
    idusuarioaprovacao?: number;
    idusuariocotacao?: number;
    idusuarioaprovacaodir?: number;
    idusuariocompra?: number;
    idusuarioentrega?: number;
    idcompra?: number;
}