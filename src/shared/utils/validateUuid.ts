import { BadRequestException } from '../exceptions';

export const validateUuid = (id: string): void => {
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_REGEX.test(id)) {
    throw new BadRequestException('Invalid ID format.');
  }
};
