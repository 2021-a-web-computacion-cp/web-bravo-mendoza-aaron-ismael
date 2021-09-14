import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put
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
