import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    sumar(req: any, parametrosConsulta: any, res: any): string;
    restar(parametrosCuerpo: any, req: any, res: any): string;
    multiplicar(parametrosRuta: any, req: any, res: any): string;
    dividir(paramCabecera: any, req: any, res: any): string;
    holaTexto(): string;
    holaHTML(): string;
    holaJson(): string;
    badRequest(): void;
    internalError(): void;
    setearCookieInsegura(req: any, res: any): void;
    mostrarCookies(req: any): {
        sinFirmar: any;
        firmadas: any;
    };
    parametrosConsulta(queryParams: any, params: any): {
        parametrosConsulta: any;
        parametrosRuta: any;
    };
    parametrosCuerpo(bodyParams: any, cabeceraPeticion: any): {
        parametrosCuerpo: any;
        cabeceras: any;
    };
}
