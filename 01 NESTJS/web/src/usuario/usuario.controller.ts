import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { validate } from "class-validator";
import { UsuarioCrearDto } from "./dto/usuario.crear.dto";
import { Prisma } from "@prisma/client";
import {response} from "express";

//http://localhost:3000/usuario/
@Controller('usuario')
export class UsuarioController {

    constructor(//Inyeccion de dependencias
        private usuarioService: UsuarioService,
    ){}

    @Get('inicio')
    inicio(@Res() response){
        response.render('inicio');
    }

    @Post('actualizar-usuario-formulario/:idUsuario')
    async actualizarUno(@Res() res, @Param() parametrosRuta, @Body() parametrosCuerpo){
        const usuario:Prisma.EPN_USUARIOUpdateInput ={
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        };
        const parametrosActualizar = {
            id: Number(parametrosRuta.idUsuario),
            data: usuario
        };
        try{
            await this.usuarioService.actualizarUno(parametrosActualizar);
            res.redirect('/usuario/lista-usuarios');
        }
        catch(error){
            console.log({error: error, mensaje: 'Error en actualizar usuario'});
            throw new InternalServerErrorException("Error en el servidor");
        }
    }

    @Post('actualizar-usuario/:idUsuario')
    async obtenerUno(@Res() res, @Param() parametrosRuta){
        try{
            const respuesta = await this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
            console.log(respuesta);
            res.render('usuario/actualizar', {datos: {usuario: respuesta}});
        }
        catch(error){
            console.log(error);
            throw new InternalServerErrorException('Error');
        }
    }

    @Post('eliminar-usuario/:idUsuario')
    async eliminarUsuario(@Res() response, @Param() parametrosRuta) {
        try {
            await this.usuarioService.eliminarUno(+parametrosRuta.idUsuario);
            response.redirect(
                '/usuario/lista-usuarios' + '?mensaje=Se elimino al usuario',
            );
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error');
        }
    }

    @Post('crear-usuario-formulario')
    async crearUsuarioFormulario(@Res() response, @Body() parametrosCuerpo) {
        try {
            const respuestaUsuario = await this.usuarioService.crearUno({
                nombre: parametrosCuerpo.nombre,
                apellido: parametrosCuerpo.apellido,
            });
            response.redirect(
                '/usuario/vista-crear' +
                '?mensaje=Se creo el usuario ' +
                parametrosCuerpo.nombre,
            );
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error creando usuario');
        }
    }

    @Get('vista-crear')
    vistaCrear(@Res() response, @Query() parametrosConsulta) {
        response.render('usuario/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }

    @Get('lista-usuarios')
    async listaUsuarios(@Res() response, @Query() parametrosConsulta) {
        try {
            // validar parametros de consulta con un dto
            const respuesta = await this.usuarioService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
            });
            response.render('usuario/lista', {
                datos: {
                    usuarios: respuesta,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException('Error del servidor');
        }
    }

    /*@Get(':idUsuario')
    obtenerUno(@Param() parametrosRuta){
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }*/

    @Post()
    async crearUsuario(@Body() parametrosCuerpo){
        const usuarioCrearDto = new UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
        try{
            const errores = await validate(usuarioCrearDto);
            if(errores.length > 0){
                console.log(JSON.stringify(errores));
                throw new BadRequestException('No envia bien los parametros')
            } else{
                return this.usuarioService.crearUno(usuarioCrearDto);
            }
        } catch (error){
            console.error({error: error, mensaje: 'Errores en crear usuario'});
            throw  new InternalServerErrorException('Error servidor');
        }
    }

    /*    @Put(':idUsuario')
        async actualizarUsuario(@Body() parametrosCuerpo, @Param() parametrosRuta){
            const usuarioCrearDto = new UsuarioCrearDto();
            usuarioCrearDto.nombre = parametrosCuerpo.nombre;
            usuarioCrearDto.apellido = parametrosCuerpo.apellido;
            usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
            try{
                const errores = await validate(usuarioCrearDto);
                if(errores.length > 0){
                    console.log(JSON.stringify(errores));
                    throw new BadRequestException('No envia bien los parametros')
                } else{
                    return this.usuarioService.actualizarUno(usuarioCrearDto);
                }
            } catch (error){
                console.error({error: error, mensaje: 'Errores en crear usuario'});
                throw  new InternalServerErrorException('Error servidor');
            }

        }
    */

}
