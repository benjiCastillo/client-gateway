import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message:
      'Invalid order status, valid values are: ' + OrderStatusList.join(', '),
  })
  status: OrderStatus;
}
