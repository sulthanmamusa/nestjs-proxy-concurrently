import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { createProxyMiddleware  } = require('http-proxy-middleware');


  const { routes } = require('./route.config.json');


  for (let route of routes) {
    app.use(route.route,
      createProxyMiddleware ({
            target: route.address,
            pathRewrite: (path, req) => {
                return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
            }
        })
    );
  }

  await app.listen(3000);
}
bootstrap();
