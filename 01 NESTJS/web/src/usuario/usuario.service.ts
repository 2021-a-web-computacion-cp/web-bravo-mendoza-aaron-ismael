import { Injectable} from '@nestjs/common'
import { Prisma } from '@prisma/client';
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsuarioService {

    constructor(
        private prisma: PrismaService
    ) {}

    buscarUno(id: number){
        return this.prisma.ePN_USUARIO.findUnique({
            where:{
                id: id,
            },
        });
    }

    crearUno(usuario: Prisma.EPN_USUARIOCreateInput){
        return this.prisma.ePN_USUARIO.create({
            data: usuario,
        });
    }

    actualizarUno(paramActualizar:{
        where: Prisma.EPN_USUARIOWhereUniqueInput,
        data: Prisma.EPN_USUARIOUpdateInput;
    }){
        return this.prisma.ePN_USUARIO.update({
            data: paramActualizar.data,
            where: paramActualizar.where,
        })
    }

    eliminarUno(where: Prisma.EPN_USUARIOWhereUniqueInput){
        return this.prisma.ePN_USUARIO.delete({
            where: where
        });
    }



}