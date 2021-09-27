import { PrismaService } from "../prisma.service";
export declare class PlanetaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): void;
}
