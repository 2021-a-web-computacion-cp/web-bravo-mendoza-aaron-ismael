import { UsuarioService } from "./usuario.service";
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    obtenerUno(parametrosRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUsuario(parametrosRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    actualizarUsuario(parametrosRuta: any): import(".prisma/client").Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}
