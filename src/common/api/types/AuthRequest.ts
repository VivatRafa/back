import { User } from '../../../user/entities/user.entity';

export type AuthRequest<T = any> = Request & { user: User } & { body: T };
