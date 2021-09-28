import {
    BadRequestException, Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Query,
    Res
} from "@nestjs/common";
import {PlanetaService} from "./planeta.service";
import {PlanetaCrearDto} from "./dto/planeta.crear.dto";
import {validate} from "class-validator";
import { Prisma } from "@prisma/client";


@Controller('planeta')
export class PlanetaController{

    constructor(
        private planetaService: PlanetaService
    ){}


    @Post('actualizar-planeta-formulario/:idPlaneta')
    async actualizarUno(@Res() res, @Param() parametrosRuta, @Body() parametrosCuerpo){
        const planetaCrearDto = new PlanetaCrearDto();
        planetaCrearDto.nombre = parametrosCuerpo.nombre;
        planetaCrearDto.descubrimiento = +parametrosCuerpo.descubrimiento;
        planetaCrearDto.diametro = +parametrosCuerpo.diametro;
        planetaCrearDto.habitado = parametrosCuerpo.habitado == "true" ? true : false;
        planetaCrearDto.gravedad = +parametrosCuerpo.gravedad;
        const planeta:Prisma.PlanetaUpdateInput ={
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
        const errores = await validate(planetaCrearDto);
        if(errores.length > 0){
            res.redirect('/planeta/lista-planetas' +
                '?alerta=Ingrese bien los datos');
            console.log(JSON.stringify(errores));
            throw new BadRequestException('No envía bien los parámetros');
        }
        else{
            try{
                await this.planetaService.actualizarUno(parametrosActualizar);
                res.redirect('/planeta/lista-planetas');
            }
            catch(error){
                console.log({error: error, mensaje: 'Error en actualizar planeta'});
                throw new InternalServerErrorException('Error en el servidor');
            }
        }
    }

    @Post('actualizar-planeta/:idPlaneta')
    async obtenenerUno(@Res() res, @Param() parametrosRuta){
        try{
            const respuesta = await this.planetaService.buscarUno(+parametrosRuta.idPlaneta);
            console.log(respuesta);
            res.render('planeta/actualizar', {datos: {planeta: respuesta}});
        }
        catch(error){
            console.log(error);
            throw new InternalServerErrorException('error');
        }
    }

    @Post('eliminar-planeta/:idPlaneta')
    async eliminarPlaneta(@Res() res, @Param() parametrosRuta){
        try{
            await this.planetaService.eliminarUno(+parametrosRuta.idPlaneta);
            res.redirect(
                '/planeta/lista-planetas' +
                '?mensaje=Se eliminó el planeta'
            );
        }
        catch (error){
            console.error(error);
            throw new InternalServerErrorException('Error');
        }
    }

    @Post('crear-planeta-formulario')
    async crearPlanetaFormulario(@Res() res, @Body() parametrosCuerpo){
        const planetaCrearDto = new PlanetaCrearDto();
        planetaCrearDto.nombre = parametrosCuerpo.nombre;
        planetaCrearDto.descubrimiento = +parametrosCuerpo.descubrimiento;
        planetaCrearDto.diametro = +parametrosCuerpo.diametro;
        planetaCrearDto.habitado = parametrosCuerpo.habitado == "true" ? true : false;
        planetaCrearDto.gravedad = +parametrosCuerpo.gravedad;
        console.log(planetaCrearDto);
        try{
            const errores = await  validate(planetaCrearDto);
            if(errores.length > 0){
                res.redirect('/planeta/vista-crear'+
                    '?alerta=Ingrese bien los datos ');
                console.log(JSON.stringify(errores));
                throw new BadRequestException('No envía bien los parámetros');
            }
            else{
                const respuestaPlaneta = await this.planetaService.crearUno({
                    nombre: planetaCrearDto.nombre,
                    descubrimiento: planetaCrearDto.descubrimiento,
                    diametro: planetaCrearDto.diametro,
                    habitado: planetaCrearDto.habitado,
                    gravedad: planetaCrearDto.gravedad
                });
                res.redirect('/planeta/vista-crear'+
                    '?mensaje=Se creó el planeta '+
                    parametrosCuerpo.nombre);
            }
        }
        catch (error){
            console.log(error);
            throw new InternalServerErrorException('Error creando planeta');
        }
    }

    @Get('vista-crear')
    vistaCrear(@Res() res, @Query() parametrosConsulta){
        res.render('planeta/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
                alerta: parametrosConsulta.alerta,
            }
        })
    }

    @Get('lista-planetas')
    async listaPlanetas(@Res() res, @Query() parametrosConsulta, @Param() parametrosRuta){
        try{
            const respuesta = await this.planetaService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip: undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take: undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda: undefined,
            });
            res.render('planeta/lista', {datos: {planetas: respuesta, alerta: parametrosConsulta.alerta}});
        } catch (error){
            throw new InternalServerErrorException('Error en el servidor');
        }
    }


}