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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const class_validator_1 = require("class-validator");
const usuario_crear_dto_1 = require("./dto/usuario.crear.dto");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    inicio(response) {
        response.render('inicio');
    }
    async actualizarUno(res, parametrosRuta, parametrosCuerpo) {
        const usuarioCrearDto = new usuario_crear_dto_1.UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
        const usuario = {
            nombre: usuarioCrearDto.nombre,
            apellido: usuarioCrearDto.apellido
        };
        const parametrosActualizar = {
            id: Number(parametrosRuta.idUsuario),
            data: usuario
        };
        const errores = await class_validator_1.validate(usuarioCrearDto);
        if (errores.length > 0) {
            res.redirect('/usuario/lista-usuarios' + '?alerta=Ingrese bien los datos');
            console.log(JSON.stringify(errores));
            throw new common_1.BadRequestException('No envia bien los parametros');
        }
        else {
            try {
                await this.usuarioService.actualizarUno(parametrosActualizar);
                res.redirect('/usuario/lista-usuarios');
            }
            catch (error) {
                console.log({ error: error, mensaje: 'Error en actualizar usuario' });
                throw new common_1.InternalServerErrorException("Error en el servidor");
            }
        }
    }
    async obtenerUno(res, parametrosRuta) {
        try {
            const respuesta = await this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
            console.log(respuesta);
            res.render('usuario/actualizar', { datos: { usuario: respuesta } });
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async eliminarUsuario(response, parametrosRuta) {
        try {
            await this.usuarioService.eliminarUno(+parametrosRuta.idUsuario);
            response.redirect('/usuario/lista-usuarios' + '?mensaje=Se elimino al usuario');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async crearUsuarioFormulario(response, parametrosCuerpo) {
        const usuarioCrearDto = new usuario_crear_dto_1.UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const errores = await class_validator_1.validate(usuarioCrearDto);
            if (errores.length > 0) {
                response.redirect('/usuario/vista-crear' +
                    '?alerta=Ingrese bien los datos ');
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien los parametros');
            }
            else {
                const respuestaUsuario = await this.usuarioService.crearUno({
                    nombre: usuarioCrearDto.nombre,
                    apellido: usuarioCrearDto.apellido
                });
                response.redirect('/usuario/vista-crear' +
                    '?mensaje=Se creo el usuario ' +
                    parametrosCuerpo.nombre);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error creando usuario');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('usuario/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
                alerta: parametrosConsulta.alerta
            },
        });
    }
    async listaUsuarios(response, parametrosConsulta, parametrosRuta) {
        try {
            const respuesta = await this.usuarioService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            response.render('usuario/lista', {
                datos: {
                    usuarios: respuesta, alerta: parametrosConsulta.alerta
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    async crearUsuario(parametrosCuerpo) {
        const usuarioCrearDto = new usuario_crear_dto_1.UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try {
            const errores = await class_validator_1.validate(usuarioCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien los parametros');
            }
            else {
                return this.usuarioService.crearUno(usuarioCrearDto);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear usuario' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "inicio", null);
__decorate([
    common_1.Post('actualizar-usuario-formulario/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "actualizarUno", null);
__decorate([
    common_1.Post('actualizar-usuario/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "obtenerUno", null);
__decorate([
    common_1.Post('eliminar-usuario/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarUsuario", null);
__decorate([
    common_1.Post('crear-usuario-formulario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUsuarioFormulario", null);
__decorate([
    common_1.Get('vista-crear'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "vistaCrear", null);
__decorate([
    common_1.Get('lista-usuarios'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listaUsuarios", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUsuario", null);
UsuarioController = __decorate([
    common_1.Controller('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map