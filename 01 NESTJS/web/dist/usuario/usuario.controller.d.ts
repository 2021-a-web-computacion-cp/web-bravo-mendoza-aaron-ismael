import { UsuarioService } from "./usuario.service";
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    inicio(response: any): void;
    actualizarUno(res: any, parametrosRuta: any, parametrosCuerpo: any): Promise<void>;
    obtenerUno(res: any, parametrosRuta: any): Promise<void>;
    eliminarUsuario(response: any, parametrosRuta: any): Promise<void>;
    crearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    listaUsuarios(response: any, parametrosConsulta: any, parametrosRuta: any): Promise<void>;
    crearUsuario(parametrosCuerpo: any): Promise<import(".prisma/client").EPN_USUARIO>;
}
