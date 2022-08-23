import { ApiRequest, ApiResponse, Route, methods } from '@sapphire/plugin-api';
import { ApplyOptions } from '@sapphire/decorators';
import { StatusCodes } from 'http-status-codes';

@ApplyOptions<Route.Options>({
  route: 'steam-verification',
})
export class SteamVerificationRoute extends Route {
  public async [methods.POST](_req: ApiRequest, res: ApiResponse) {
    try {
      /* TODO: Apply a rate limiter */
      res.status(StatusCodes.OK).json({});
    } catch (error: unknown) {
      this.container.logger.error('[SteamVerificationRoute: POST]', (error as Error).message);
      res.status(StatusCodes.BAD_GATEWAY).json({});
    }
  }
}