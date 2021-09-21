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

    @Get('vista-crear')
    vistaCrear(@Res() response){
        response.render('usuario-crear');
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

    @Get(':idUsuario')
    obtenerUno(@Param() parametrosRuta){
        return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
    }

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
