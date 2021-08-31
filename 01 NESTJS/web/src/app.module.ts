import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ //modulo importados


  ],
  controllers: [//controladores de este modulo
      AppController
  ],
  providers: [//servicios de este modulo
      AppService
  ],
  exports: [//servicios exportados (que se pueden usar fuera de éste módulo)
    AppService
  ],
})
export class AppModule {}
