import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/*
abstract class Nombre {
  public nombrePropiedad?: string;
  private apellidoPropiedad: string = 'Bravo';
  protected edad: number = 29; //number duck typing
  propiedadPublica: string;
  constructor(
      propiedadPublicaParametro: string, //parametro
      public propiedadRapido: string, //transforma una propiedad
  ) {
    this.propiedadPublica = propiedadPublicaParametro;
    this.propiedadRapido;
  }

  public funcionPublica(parametroString: string): void{
    //no tiene retorno
  }

  private funcionPrivada(parametroString: string, parametroNumber?: number){
    // no tiene retorno
  }

  private funcionPublica(): number{
    return 1;
  }

  static funcionEstatica(): string{
    return 'string';
  }
}
*/

/*
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

//punteros referencias
let edadAntigua = 22;
let otraEdad = edadAntigua; //valor
edadAntigua += 1; //23
otraEdad -= 1; //21

//objeto
let objetoEdad = {
  edad: 22,
};

let otraEdadObjeto = objetoEdad; // referencia
otraEdadObjeto.edad = otraEdadObjeto.edad + 1; //23
objetoEdad.edad; //23
objetoEdad.edad = objetoEdad.edad + 1; //24
otraEdadObjeto.edad; //24
let otraEdadObjetoClonado = {...objetoEdad}; //clonacion objetos
const arregloEjemplo = [1,2,3];
let arregloClonado = [...arregloEjemplo]; //clonación arreglos

function funcionConNombre(){

}

const indice = arregloNumeros.findIndex(
        (numero: number) => {  //funcion anonima porque no tiene nombre
          const elValorEsIgualATres: boolean = numero == 3;
          return elValorEsIgualATres // condicion -> boolean
        }
    );

arregloNumeros[indice] = 6
//agregar al final
arregloNumeros.push(6)
//agregar al principio
arregloNumeros.unshift(0)

//condiciones -> trutys y falsys
const numeroOrden = 0;
if(numeroOrden){
  console.log('Truty');
} else {
  console.log('Falsy');
}
if (1) {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if (-1) {
  console.log('Truty');
} else {
  console.log('Falsy');
}

if (""){
  console.log('Truty');
} else {
  console.log('Falsy');
}

if ("a"){
  console.log('Truty');
} else {
  console.log('Falsy');
}

if ({}){
  console.log('Truty');
} else {
  console.log('Falsy');
}

if ({a:1}){
  console.log('Truty');
} else {
  console.log('Falsy');
}*/
