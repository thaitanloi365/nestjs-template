import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationParamDto {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ default: 20 })
  limit: number;

  @ApiPropertyOptional({})
  keyword?: string;
}
