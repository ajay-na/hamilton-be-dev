import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { CurrentuserDto } from '../../auth/dto/current-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiPaginatedResponse } from '../../common/decorators/api-response.decorator';
import { CreateUserVehicleDto } from './dto/add-vehicle-user.dto';
import { UserVehicleResponseDto } from './dto/get-users-vehicle-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfileResponseDto } from './dto/user-profile.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get current user profile (Self)' })
  @ApiPaginatedResponse(UserProfileResponseDto)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMe(
    @CurrentUser() user: CurrentuserDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.findById(user.id);
  }

  @ApiOperation({ summary: 'Update current user profile(self)' })
  @ApiPaginatedResponse(UserProfileResponseDto)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateSelfProfile(
    @CurrentUser() user: CurrentuserDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.update(user.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Get users vehicle list by user id' })
  @ApiPaginatedResponse(UserVehicleResponseDto, true)
  @UseGuards(JwtAuthGuard)
  @Get('vehicle')
  async getUserVehicleDetails(
    @CurrentUser() params: CurrentuserDto,
  ): Promise<UserVehicleResponseDto[]> {
    return this.userService.getUserVehicleDetails(params.id);
  }

  @ApiOperation({ summary: 'Add vehicle to users profile' })
  @ApiBody({ type: CreateUserVehicleDto })
  @UseGuards(JwtAuthGuard)
  @Post('vehicle')
  async addUsersVehicleDetails(
    @Body() body: CreateUserVehicleDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<any> {
    return this.userService.addVehicleToUserProfile(body, user.id);
  }
}
