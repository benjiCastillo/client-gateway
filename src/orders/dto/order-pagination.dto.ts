import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message:
      'Invalid order status, valid values are: ' + OrderStatusList.join(', '),
  })
  status?: OrderStatus;
}
