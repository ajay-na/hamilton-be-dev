import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentuserDto } from '../../auth/dto/current-user.dto';
import { Role } from '../../auth/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiPaginatedResponse } from '../../common/decorators/api-response.decorator';
import { IdParamsDto } from '../../common/dto/user-params.dto';
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

  @ApiOperation({ summary: 'Get current user profile by id' })
  @ApiPaginatedResponse(UserProfileResponseDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Get(':id')
  async getUserById(
    @Param() params: IdParamsDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.findById(params.id);
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

  @ApiOperation({ summary: 'Update user profile by user id' })
  @ApiPaginatedResponse(UserProfileResponseDto)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateUserProfile(
    @Param() params: IdParamsDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.update(params.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Soft delete user by id' })
  @ApiPaginatedResponse(UserProfileResponseDto)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async softDeleteUserById(
    @Param() params: IdParamsDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<UserProfileResponseDto> {
    return this.userService.softDeleteUserById(params.id, user.id);
  }

  @ApiOperation({ summary: 'Get users vehicle list by user id' })
  @ApiPaginatedResponse(UserVehicleResponseDto, true)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Get(':id/vehicle')
  async getUserVehicleDetails(
    @Param() params: IdParamsDto,
  ): Promise<UserVehicleResponseDto[]> {
    return this.userService.getUserVehicleDetails(params.id);
  }

  @ApiOperation({ summary: 'Add vehicle to users profile' })
  @ApiBody({ type: CreateUserVehicleDto })
  @Roles(Role.ADMIN, Role.STAFF)
  @Post('vehicle')
  async addUsersVehicleDetails(
    @Body() body: CreateUserVehicleDto,
    @CurrentUser() user: CurrentuserDto,
  ): Promise<any> {
    return this.userService.addVehicleToUserProfile(body, user.id);
  }

  @ApiOperation({ summary: 'Add customer' })
  @ApiPaginatedResponse(UserVehicleResponseDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Post(':id/vehicle')
  async addCustomer(
    @Param() params: IdParamsDto,
  ): Promise<UserVehicleResponseDto[]> {
    return this.userService.getUserVehicleDetails(params.id);
  }
}
