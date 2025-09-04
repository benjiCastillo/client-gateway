import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom<unknown>(
        this.client.send('createOrder', createOrderDto),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Get()
  async findAll(@Query() paginationDto: OrderPaginationDto) {
    try {
      return await firstValueFrom<unknown>(
        this.client.send('findAllOrders', paginationDto),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Get('/id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom<unknown>(
        this.client.send('findOneOrder', id),
      );
    } catch (error) {
      console.log(error);
      throw new RpcException(error as object);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return await firstValueFrom<unknown>(
        this.client.send('findAllOrders', {
          ...paginationDto,
          status: statusDto.status,
        }),
      );
    } catch (error) {
      console.log(error);
      throw new RpcException(error as object);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return await firstValueFrom<unknown>(
        this.client.send('changeOrderStatus', { id, ...statusDto }),
      );
    } catch (error) {
      console.log(error);
      throw new RpcException(error as object);
    }
  }
}
