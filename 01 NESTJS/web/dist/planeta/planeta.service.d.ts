import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
export declare class PlanetaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Planeta[]>;
    buscarUno(id: number): Prisma.Prisma__PlanetaClient<import(".prisma/client").Planeta>;
    crearUno(planeta: Prisma.PlanetaCreateInput): Prisma.Prisma__PlanetaClient<import(".prisma/client").Planeta>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.PlanetaUpdateInput;
    }): Prisma.Prisma__PlanetaClient<import(".prisma/client").Planeta>;
    eliminarUno(id: number): Prisma.Prisma__PlanetaClient<import(".prisma/client").Planeta>;
}
