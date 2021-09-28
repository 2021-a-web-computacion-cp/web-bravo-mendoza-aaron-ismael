import {Module} from "@nestjs/common";
import {PlanetaService} from "./planeta.service";
import {PlanetaController} from "./planeta.controller";
import {PrismaService} from "../prisma.service";

@Module(
    {
        imports: [],
        providers: [PlanetaService, PrismaService],
        exports: [PlanetaService],
        controllers: [PlanetaController]
    }
)

export class PlanetaModule {}