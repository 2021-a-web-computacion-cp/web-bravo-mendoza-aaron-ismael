import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
//package.json
//npm run start
//nodejs command prompt

//variables primitivas
//tipo de variables
//mutables (reasignar -> =)
var variableUno = 1; //no usamos var!
let variableDos = 2;
variableUno = 3;
variableDos = 4;
// inmutables (No se pueden reasignar X -> !=)
const variableTres = 5;
//variableTres = 2; error

//primitivas (Typescript)
const texto: string = '';
const numEntero: number = 1;
const numFlotante: number = 1.5;
const soyEstudiante: boolean = true;
const noDefinido: undefined;
const noHayNada: null;
const fecha: Date = new Date();
//duck typing
const textoDos = 'Aarón';
let cualquierCosa: any = 'Ismael';
cualquierCosa = 1;
cualquierCosa = true;
cualquierCosa = new Date();

class Usuario{
  constructor(
      public nombre: string,
      public apellido: string
  ) {
  }
}

const usuario: Usuario = new Usuario('Aaron', 'Bravo');
usuario.nombre;
usuario.apellido;

interface UsuarioInterface{
  nombre: string;
  apellido: string;
  edad?: number; // ? => OPcional, valor por defecto undefined.
}
