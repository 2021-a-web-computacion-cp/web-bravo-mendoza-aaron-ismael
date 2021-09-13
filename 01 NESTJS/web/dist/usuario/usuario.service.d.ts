import { Prisma } from '@prisma/client';
import { PrismaService } from "../prisma.service";
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    crearUno(usuario: Prisma.EPN_USUARIOCreateInput): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    actualizarUno(paramActualizar: {
        where: Prisma.EPN_USUARIOWhereUniqueInput;
        data: Prisma.EPN_USUARIOUpdateInput;
    }): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    eliminarUno(where: Prisma.EPN_USUARIOWhereUniqueInput): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}
