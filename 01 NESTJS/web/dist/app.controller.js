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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    sumar(req, parametrosConsulta, res) {
        if (req.signedCookies['total'] == undefined) {
            var resultado = Number(parametrosConsulta.numeroUno) + Number(parametrosConsulta.numeroDos);
            var diferencia = 100 - resultado;
            res.cookie('total', diferencia.toString(), { signed: true });
            return "Suma: " + resultado + ", Puntos: " + diferencia;
        }
        else {
            var resultado = Number(parametrosConsulta.numeroUno) + Number(parametrosConsulta.numeroDos);
            var diferencia = Number(req.signedCookies['total']) - resultado;
            res.cookie('total', diferencia.toString(), { signed: true });
            var cookieEntrada = Number(req.signedCookies['total']);
            if (cookieEntrada <= 0) {
                res.cookie('total', '100', { signed: true });
                res.send("has ganado el juego");
            }
            else {
                return "Suma: " + resultado + ", Puntos: " + diferencia;
            }
        }
    }
    restar(parametrosCuerpo, req, res) {
        if (req.signedCookies['total'] == undefined) {
            var resultado = Math.abs(Number(parametrosCuerpo.numeroUno) - Number(parametrosCuerpo.numeroDos));
            var diferencia = 100 - resultado;
            res.header('Resultado', resultado);
            res.cookie('total', diferencia.toString(), { signed: true });
            return "Resta: " + resultado + ", Puntos: " + diferencia;
        }
        else {
            var resultado = Math.abs(Number(parametrosCuerpo.numeroUno) - Number(parametrosCuerpo.numeroDos));
            var diferencia = Number(req.signedCookies['total']) - resultado;
            res.header('Resultado', resultado);
            res.cookie('total', diferencia.toString(), { signed: true });
            var cookieEntrada = Number(req.signedCookies['total']);
            if (cookieEntrada <= 0) {
                res.cookie('total', '100', { signed: true });
                res.send("has ganado el juego");
            }
            else {
                return "Resta: " + resultado + ", Puntos: " + diferencia;
            }
        }
    }
    multiplicar(parametrosRuta, req, res) {
        if (req.signedCookies['total'] == undefined) {
            var resultado = Math.abs(Number(parametrosRuta.numeroUno) * Number(parametrosRuta.numeroDos));
            var diferencia = 100 - resultado;
            res.cookie('total', diferencia.toString(), { signed: true });
            return "Multiplicación: " + resultado + ", Puntos: " + diferencia;
        }
        else {
            var resultado = Math.abs(Number(parametrosRuta.numeroUno) * Number(parametrosRuta.numeroDos));
            var diferencia = Number(req.signedCookies['total']) - resultado;
            res.cookie('total', diferencia.toString(), { signed: true });
            var cookieEntrada = Number(req.signedCookies['total']);
            if (cookieEntrada <= 0) {
                res.cookie('total', '100', { signed: true });
                res.send("has ganado el juego");
            }
            else {
                return "Multiplicación: " + resultado + ", Puntos: " + diferencia;
            }
        }
    }
    dividir(paramCabecera, req, res) {
        if (req.signedCookies['total'] == undefined) {
            var resultado = Number(paramCabecera.numerouno) / Number(paramCabecera.numerodos);
            console.log(paramCabecera.numeroUno);
            var diferencia = 100 - resultado;
            res.cookie('total', diferencia.toString(), { signed: true });
            return "División: " + resultado + ", Puntos: " + diferencia;
        }
        else {
            var resultado = Math.abs(Number(paramCabecera.numerouno) / Number(paramCabecera.numerodos));
            var diferencia = Number(req.signedCookies['total']) - resultado;
            res.cookie('total', diferencia.toString(), { signed: true });
            var cookieEntrada = Number(req.signedCookies['total']);
            if (cookieEntrada <= 0) {
                res.cookie('total', '100', { signed: true });
                res.send("has ganado el juego");
            }
            else {
                return "División: " + resultado + ", Puntos: " + diferencia;
            }
        }
    }
    holaTexto() {
        return 'HOLA TEXTO';
    }
    holaHTML() {
        return '<h1>Hola HTML</h1>';
    }
    holaJson() {
        return '{mensaje; "Hola json"}';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('galletaInsegura', 'Tengo hambre');
        res.cookie('galleta-seguraYFirmada', 'Web :3', {
            secure: true,
            signed: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }
    parametrosConsulta(queryParams, params) {
        return {
            parametrosConsulta: queryParams,
            parametrosRuta: params,
        };
    }
    parametrosCuerpo(bodyParams, cabeceraPeticion) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabeceraPeticion
        };
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('suma'),
    common_1.HttpCode(200),
    __param(0, common_1.Req()),
    __param(1, common_1.Query()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "sumar", null);
__decorate([
    common_1.Post('resta'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "restar", null);
__decorate([
    common_1.Put('multiplicacion/:numeroUno/:numeroDos'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicar", null);
__decorate([
    common_1.Get('division'),
    common_1.HttpCode(201),
    __param(0, common_1.Headers()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "dividir", null);
__decorate([
    common_1.Get('/texto'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaTexto", null);
__decorate([
    common_1.Get('/html'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaHTML", null);
__decorate([
    common_1.Get('/json'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaJson", null);
__decorate([
    common_1.Get('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badRequest", null);
__decorate([
    common_1.Get('internal-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    common_1.Get('setear-cookie-insegura'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    common_1.Get('mostrar-cookies'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
__decorate([
    common_1.Get('parametros-consulta/:nombre'),
    common_1.HttpCode(200),
    common_1.Header('Cache-Control', 'none'),
    common_1.Header('EPN', 'SISTEMAS'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosConsulta", null);
__decorate([
    common_1.Post('parametros-cuerpo'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosCuerpo", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map