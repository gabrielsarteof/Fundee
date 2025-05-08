import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class RegisterNftDto {
  @IsString() @IsOptional()
  name?: string;

  @IsString() @IsOptional()
  description?: string;

  @IsUrl()
  metadataUrl: string;

  @IsNumber()
  price: number;

  @IsString()
  tokenId: string;

  @IsString()
  transactionHash: string;

  @IsString()
  blockHash: string;
}
