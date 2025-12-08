import { RequestContext, EntityManager } from '@mikro-orm/core';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * MikroORM RequestContext Middleware
 *
 * Creates a new RequestContext for each HTTP request, ensuring proper
 * isolation of EntityManager instances and preventing context leakage
 * between requests.
 *
 * This middleware eliminates the need for allowGlobalContext in production.
 *
 * @see https://mikro-orm.io/docs/identity-map#request-context
 */
@Injectable()
export class MikroOrmRequestContextMiddleware implements NestMiddleware {
  constructor(private readonly em: EntityManager) {}

  use(req: Request, res: Response, next: NextFunction): void {
    RequestContext.create(this.em, next);
  }
}
