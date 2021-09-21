import { Prisma } from '@prisma/client';
import { PrismaService } from "../prisma.service";
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").EPN_USUARIO[]>;
    buscarUno(id: number): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUno(usuario: Prisma.EPN_USUARIOCreateInput): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    actualizarUno(paramActualizar: {
        where: Prisma.EPN_USUARIOWhereUniqueInput;
        data: Prisma.EPN_USUARIOUpdateInput;
    }): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    eliminarUno(where: Prisma.EPN_USUARIOWhereUniqueInput): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}
