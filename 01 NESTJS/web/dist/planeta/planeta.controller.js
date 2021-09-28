"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanetaController = void 0;
const common_1 = require("@nestjs/common");
const planeta_service_1 = require("./planeta.service");
const planeta_crear_dto_1 = require("./dto/planeta.crear.dto");
const class_validator_1 = require("class-validator");
let PlanetaController = class PlanetaController {
    constructor(planetaService) {
        this.planetaService = planetaService;
    }
    async actualizarUno(res, parametrosRuta, parametrosCuerpo) {
        const planetaCrearDto = new planeta_crear_dto_1.PlanetaCrearDto();
        planetaCrearDto.nombre = parametrosCuerpo.nombre;
        planetaCrearDto.descubrimiento = +parametrosCuerpo.descubrimiento;
        planetaCrearDto.diametro = +parametrosCuerpo.diametro;
        planetaCrearDto.habitado = parametrosCuerpo.habitado == "true" ? true : false;
        planetaCrearDto.gravedad = +parametrosCuerpo.gravedad;
        const planeta = {
            nombre: planetaCrearDto.nombre,
            descubrimiento: planetaCrearDto.descubrimiento,
            diametro: planetaCrearDto.diametro,
            habitado: planetaCrearDto.habitado,
            gravedad: planetaCrearDto.gravedad
        };
        const parametrosActualizar = {
            id: Number(parametrosRuta.idPlaneta),
            data: planeta
        };
        const errores = await class_validator_1.validate(planetaCrearDto);
        if (errores.length > 0) {
            res.redirect('/planeta/lista-planetas' +
                '?alerta=Ingrese bien los datos');
            console.log(JSON.stringify(errores));
            throw new common_1.BadRequestException('No envía bien los parámetros');
        }
        else {
            try {
                await this.planetaService.actualizarUno(parametrosActualizar);
                res.redirect('/planeta/lista-planetas');
            }
            catch (error) {
                console.log({ error: error, mensaje: 'Error en actualizar planeta' });
                throw new common_1.InternalServerErrorException('Error en el servidor');
            }
        }
    }
    async obtenenerUno(res, parametrosRuta) {
        try {
            const respuesta = await this.planetaService.buscarUno(+parametrosRuta.idPlaneta);
            console.log(respuesta);
            res.render('planeta/actualizar', { datos: { planeta: respuesta } });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('error');
        }
    }
    async eliminarPlaneta(res, parametrosRuta) {
        try {
            await this.planetaService.eliminarUno(+parametrosRuta.idPlaneta);
            res.redirect('/planeta/lista-planetas' +
                '?mensaje=Se eliminó el planeta');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async crearPlanetaFormulario(res, parametrosCuerpo) {
        const planetaCrearDto = new planeta_crear_dto_1.PlanetaCrearDto();
        planetaCrearDto.nombre = parametrosCuerpo.nombre;
        planetaCrearDto.descubrimiento = +parametrosCuerpo.descubrimiento;
        planetaCrearDto.diametro = +parametrosCuerpo.diametro;
        planetaCrearDto.habitado = parametrosCuerpo.habitado == "true" ? true : false;
        planetaCrearDto.gravedad = +parametrosCuerpo.gravedad;
        console.log(planetaCrearDto);
        try {
            const errores = await class_validator_1.validate(planetaCrearDto);
            if (errores.length > 0) {
                res.redirect('/planeta/vista-crear' +
                    '?alerta=Ingrese bien los datos ');
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envía bien los parámetros');
            }
            else {
                const respuestaPlaneta = await this.planetaService.crearUno({
                    nombre: planetaCrearDto.nombre,
                    descubrimiento: planetaCrearDto.descubrimiento,
                    diametro: planetaCrearDto.diametro,
                    habitado: planetaCrearDto.habitado,
                    gravedad: planetaCrearDto.gravedad
                });
                res.redirect('/planeta/vista-crear' +
                    '?mensaje=Se creó el planeta ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error creando planeta');
        }
    }
    vistaCrear(res, parametrosConsulta) {
        res.render('planeta/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
                alerta: parametrosConsulta.alerta,
            }
        });
    }
    async listaPlanetas(res, parametrosConsulta, parametrosRuta) {
        try {
            const respuesta = await this.planetaService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            res.render('planeta/lista', { datos: { planetas: respuesta, alerta: parametrosConsulta.alerta } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error en el servidor');
        }
    }
};
__decorate([
    common_1.Post('actualizar-planeta-formulario/:idPlaneta'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PlanetaController.prototype, "actualizarUno", null);
__decorate([
    common_1.Post('actualizar-planeta/:idPlaneta'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlanetaController.prototype, "obtenenerUno", null);
__decorate([
    common_1.Post('eliminar-planeta/:idPlaneta'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlanetaController.prototype, "eliminarPlaneta", null);
__decorate([
    common_1.Post('crear-planeta-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlanetaController.prototype, "crearPlanetaFormulario", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PlanetaController.prototype, "vistaCrear", null);
__decorate([
    common_1.Get('lista-planetas'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PlanetaController.prototype, "listaPlanetas", null);
PlanetaController = __decorate([
    common_1.Controller('planeta'),
    __metadata("design:paramtypes", [planeta_service_1.PlanetaService])
], PlanetaController);
exports.PlanetaController = PlanetaController;
//# sourceMappingURL=planeta.controller.js.map