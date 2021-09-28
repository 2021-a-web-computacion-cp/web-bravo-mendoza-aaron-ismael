import { PlanetaService } from "./planeta.service";
export declare class PlanetaController {
    private planetaService;
    constructor(planetaService: PlanetaService);
    actualizarUno(res: any, parametrosRuta: any, parametrosCuerpo: any): Promise<void>;
    obtenenerUno(res: any, parametrosRuta: any): Promise<void>;
    eliminarPlaneta(res: any, parametrosRuta: any): Promise<void>;
    crearPlanetaFormulario(res: any, parametrosCuerpo: any): Promise<void>;
    vistaCrear(res: any, parametrosConsulta: any): void;
    listaPlanetas(res: any, parametrosConsulta: any, parametrosRuta: any): Promise<void>;
}
