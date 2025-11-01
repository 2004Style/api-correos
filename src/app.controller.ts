import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './guard/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Obtener información del servicio
   * GET /
   * Ruta PÚBLICA - No requiere autenticación
   */
  @Get()
  @Public()
  getInfo(): {
    service: string;
    status: string;
    configured: boolean;
    from: string;
  } {
    return this.appService.getSaludo();
  }
}
