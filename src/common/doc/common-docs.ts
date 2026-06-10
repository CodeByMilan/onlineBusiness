import { ApiBearerAuth, ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';
import { IApiDocOption } from './interfaces/doc.interface';
import { applyDecorators } from '@nestjs/common';

export function ApiDocs(options: IApiDocOption): MethodDecorator {
  const docs: any[] = [];

  // default jwt access token added
  if (
    options?.jwtAccessToken === undefined ||
    options.jwtAccessToken === null
  ) {
    options.jwtAccessToken = true;
  }

  if (options?.jwtAccessToken) {
    docs.push(ApiBearerAuth('accessToken'));
  }

  if (options?.params) {
    const params: MethodDecorator[] = options?.params?.map((param) =>
      ApiParam(param),
    );
    docs.push(...params);
  }

  if (options?.queries) {
    const queries: MethodDecorator[] = options?.queries?.map((query) =>
      ApiQuery(query),
    );
    docs.push(...queries);
  }

  if (options?.headers) {
    const headers: MethodDecorator[] = options?.headers?.map((header) =>
      ApiHeader(header),
    );
    docs.push(...headers);
  }
  return applyDecorators(...docs);
}
