import {
  BadRequestException,
  Controller,
  Get, Header,
  HttpCode,
  InternalServerErrorException, Query, Param, Headers,
  Req,
  Res, Post, Body,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
    }
  }
}
