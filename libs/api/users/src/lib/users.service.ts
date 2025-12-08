import { UserEntity } from '@klastack-nx/shared/users';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

/**
 * Users Service
 * Handles user-related business logic and data access
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  /**
   * Find a user by email (case-insensitive)
   * @param email - User email
   * @returns UserEntity or null if not found
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      email: email.toLowerCase(),
    });
  }

  /**
   * Find a user by ID
   * @param id - User ID (UUID)
   * @returns UserEntity or null if not found
   */
  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ id });
  }

  /**
   * Create a new user
   * @param email - User email (will be lowercased)
   * @param passwordHash - Bcrypt hash of password
   * @param role - User role (optional, defaults to USER)
   * @returns Created UserEntity
   */
  async create(
    email: string,
    passwordHash: string,
    role?: UserEntity['role'],
  ): Promise<UserEntity> {
    const user = new UserEntity(email.toLowerCase(), passwordHash, role);

    await this.em.persistAndFlush(user);
    return user;
  }

  /**
   * Check if a user with the given email exists
   * @param email - User email
   * @returns true if user exists, false otherwise
   */
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userRepository.count({
      email: email.toLowerCase(),
    });
    return count > 0;
  }
}
