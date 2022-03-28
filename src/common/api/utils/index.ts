import { AuthRequest } from '../types/AuthRequest';

export const extractUserIdAndBody = (request: AuthRequest) => {
    const {
        user: { id: userId },
        body,
    } = request;

    return { userId, body };
};
