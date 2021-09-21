import { UsuarioService } from "./usuario.service";
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    inicio(response: any): void;
    vistaCrear(response: any): void;
    listaUsuarios(response: any, parametrosConsulta: any): Promise<void>;
    obtenerUno(parametrosRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUsuario(parametrosCuerpo: any): Promise<import(".prisma/client").EPN_USUARIO>;
}
