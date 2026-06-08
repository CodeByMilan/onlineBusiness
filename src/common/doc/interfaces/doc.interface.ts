import { ApiHeaderOptions, ApiParamOptions, ApiQueryOptions } from "@nestjs/swagger";

export interface IApiDocOption {
  operation: string;
  jwtAccessToken?: boolean;
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  headers?: ApiHeaderOptions[];
}
