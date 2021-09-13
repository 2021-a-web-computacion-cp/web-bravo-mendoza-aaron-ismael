import { Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";

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

    @Post(':nombre/:apellido')
    crearUsuario(@Param() parametrosRuta){
        return this.usuarioService.crearUno(parametrosRuta);
    }

    @Put(':nombre/:apellido/:idUsuario')
    actualizarUsuario(@Param() parametrosRuta){
        return this.usuarioService.actualizarUno(parametrosRuta);
    }

}
