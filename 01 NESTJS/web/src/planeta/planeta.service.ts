import {Injectable} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class PlanetaService{

    constructor(private prisma: PrismaService) {
    }

    buscarMuchos(parametrosBusqueda:{
        skip?: number;
        take?: number;
        busqueda?: string;
    }){
        const or = parametrosBusqueda.busqueda
        ? {
            OR: [
                {nombre: {contains: parametrosBusqueda.busqueda}}
            ]
            }
            : {};
        console.log(or);
        return this.prisma.planeta.findMany({
            where: or,
            take: Number(parametrosBusqueda.take) || undefined,
            skip: Number(parametrosBusqueda.skip) || undefined
        });
    }

    buscarUno(id: number){
        return this.prisma.planeta.findUnique({
            where: {id: id}
        });
    }

    crearUno(planeta: Prisma.PlanetaCreateInput){
        return this.prisma.planeta.create({
            data: planeta
        });
    }

    actualizarUno(parametrosActualizar: {
        id: number,
        data: Prisma.PlanetaUpdateInput;
    }){
        return this.prisma.planeta.update({
            data: parametrosActualizar.data,
            where: {
                id: parametrosActualizar.id
            }
        });
    }

    eliminarUno(id: number){
        return this.prisma.planeta.delete({
            where: {id: id}
        });
    }

}
