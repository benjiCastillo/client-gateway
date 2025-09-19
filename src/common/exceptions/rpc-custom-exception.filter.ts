import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

interface RpcExceptionInterface {
  status: number;
  message: string;
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    const rpcError = exception.getError() as RpcExceptionInterface;

    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: rpcError
          .toString()
          .substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status: number = isNaN(+rpcError.status)
        ? 400
        : Number(rpcError.status);
      return response.status(status).json(rpcError);
    }
    response.status(400).json(rpcError);
  }
}
