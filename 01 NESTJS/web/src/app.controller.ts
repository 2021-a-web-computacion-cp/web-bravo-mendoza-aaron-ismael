import {
    BadRequestException,
    Controller,
    Get, Header,
    HttpCode,
    InternalServerErrorException, Query, Param, Headers,
    Req,
    Res, Post, Body, Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('suma')
    @HttpCode(200)
    sumar(@Req() req, @Query() parametrosConsulta, @Res({passthrough: true}) res){

        if(req.signedCookies['total'] == undefined){
            var resultado = Number(parametrosConsulta.numeroUno) + Number(parametrosConsulta.numeroDos);
            var diferencia = 100 - resultado;
            res.cookie('total', diferencia.toString(), {signed: true});
            return "Suma: " + resultado + ", Puntos: " + diferencia;
        } else{
            var resultado = Number(parametrosConsulta.numeroUno) + Number(parametrosConsulta.numeroDos);
            var diferencia = Number(req.signedCookies['total']) - resultado;
            res.cookie('total', diferencia.toString(), {signed: true});
            var cookieEntrada = Number(req.signedCookies['total']);
            if(cookieEntrada <= 0){
                res.cookie('total', '100', {signed: true});
                res.send("has ganado el juego");
            }
            else{
                return "Suma: " + resultado + ", Puntos: " + diferencia;
            }
        }
    }

    @Post('resta')
    @HttpCode(201)
    restar(@Body() parametrosCuerpo, @Req() req, @Res({passthrough: true}) res){

        if(req.signedCookies['total'] == undefined){
            var resultado = Math.abs(Number(parametrosCuerpo.numeroUno) - Number(parametrosCuerpo.numeroDos));
            var diferencia = 100 - resultado;
            res.header('Resultado', resultado);
            res.cookie('total', diferencia.toString(), {signed: true});
            return "Resta: " + resultado + ", Puntos: " + diferencia;
        } else{
            var resultado = Math.abs(Number(parametrosCuerpo.numeroUno) - Number(parametrosCuerpo.numeroDos));
            var diferencia = Number(req.signedCookies['total']) - resultado;
            res.header('Resultado', resultado);
            res.cookie('total', diferencia.toString(), {signed: true});
            var cookieEntrada = Number(req.signedCookies['total']);
            if(cookieEntrada <= 0){
                res.cookie('total', '100', {signed: true});
                res.send("has ganado el juego");
            }
            else{
                return "Resta: " + resultado + ", Puntos: " + diferencia;
            }
        }
    }

    @Put('multiplicacion/:numeroUno/:numeroDos')
    @HttpCode(200)
    multiplicar(@Param() parametrosRuta, @Req() req, @Res({passthrough: true}) res){
        if(req.signedCookies['total'] == undefined){
            var resultado = Math.abs(Number(parametrosRuta.numeroUno) * Number(parametrosRuta.numeroDos));
            var diferencia = 100 - resultado;
            res.cookie('total', diferencia.toString(), {signed: true});
            return "Multiplicación: " + resultado + ", Puntos: " + diferencia;
        } else{
            var resultado = Math.abs(Number(parametrosRuta.numeroUno) * Number(parametrosRuta.numeroDos));
            var diferencia = Number(req.signedCookies['total']) - resultado;
            res.cookie('total', diferencia.toString(), {signed: true});
            var cookieEntrada = Number(req.signedCookies['total']);
            if(cookieEntrada <= 0){
                res.cookie('total', '100', {signed: true});
                res.send("has ganado el juego");
            }
            else{
                return "Multiplicación: " + resultado + ", Puntos: " + diferencia;
            }
        }
    }

    @Get('division')
    @HttpCode(201)
    dividir(@Headers() paramCabecera, @Req() req, @Res({passthrough: true}) res){
        if(req.signedCookies['total'] == undefined){
            var resultado = Number(paramCabecera.numerouno) / Number(paramCabecera.numerodos);
            console.log(paramCabecera.numeroUno);
            var diferencia = 100 - resultado;
            res.cookie('total', diferencia.toString(), {signed: true});
            return "División: " + resultado + ", Puntos: " + diferencia;
        } else{
            var resultado = Math.abs(Number(paramCabecera.numerouno) / Number(paramCabecera.numerodos));
            var diferencia = Number(req.signedCookies['total']) - resultado;
            res.cookie('total', diferencia.toString(), {signed: true});
            var cookieEntrada = Number(req.signedCookies['total']);
            if(cookieEntrada <= 0){
                res.cookie('total', '100', {signed: true});
                res.send("has ganado el juego");
            }
            else{
                return "División: " + resultado + ", Puntos: " + diferencia;
            }
        }
    }


    @Get('/texto')
    @HttpCode(200)
    holaTexto(): string {
        return 'HOLA TEXTO';
    }


    @Get('/html')
    @HttpCode(201)
    holaHTML(): string {
        return '<h1>Hola HTML</h1>';
    }

    @Get('/json')
    @HttpCode(200)
    holaJson(): string {
        return '{mensaje; "Hola json"}';
    }

    @Get('bad-request')
    badRequest() {
        throw new BadRequestException();
    }

    @Get('internal-error')
    internalError() {
        throw new InternalServerErrorException();
    }

    @Get('setear-cookie-insegura')
    setearCookieInsegura(
        @Req() req, //request peticion
        @Res() res, //response respuesta
    ) {
        res.cookie(
            'galletaInsegura', //nombre
            'Tengo hambre', //valor
        );
        res.cookie(
            'galleta-seguraYFirmada', //nombre
            'Web :3', //valor
            {
                secure: true, //solo se transfiera por canales confiables https
                signed: true,
            },
        );
        res.send('ok'); //return de antes
    }

    @Get('mostrar-cookies')
    mostrarCookies(@Req() req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }

    @Get('parametros-consulta/:nombre')
    @HttpCode(200)
    @Header('Cache-Control', 'none') //Cabeceras de respuesta
    @Header('EPN', 'SISTEMAS')
    parametrosConsulta(
        @Query() queryParams,
        @Param() params
    ) {
        return {
            parametrosConsulta: queryParams,
            parametrosRuta: params,
        };
    }

    @Post('parametros-cuerpo') //201
    @HttpCode(200)
    parametrosCuerpo(
        @Body() bodyParams,
        @Headers() cabeceraPeticion
    ) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabeceraPeticion
        };
    }
}
