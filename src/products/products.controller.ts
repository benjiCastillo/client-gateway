import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { PRODUCTS_SERVICE } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto/pagination.dto';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  async findAll(@Query() query: PaginationDto) {
    try {
      return await firstValueFrom<unknown>(
        this.productsClient.send({ cmd: 'find_all_products' }, query),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      const product = await firstValueFrom<unknown>(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Post()
  async create(@Body() body: CreateProductDto) {
    try {
      return await firstValueFrom<unknown>(
        this.productsClient.send({ cmd: 'create_product' }, body),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    try {
      return await firstValueFrom<unknown>(
        this.productsClient.send({ cmd: 'update_product' }, { id, ...body }),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    console.log('delete', id);
    try {
      return await firstValueFrom<unknown>(
        this.productsClient.send({ cmd: 'remove_product' }, { id }),
      );
    } catch (error) {
      console.log('delete', error);
      throw new RpcException(error as object);
    }
  }
}
