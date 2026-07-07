import z from 'zod';

export const TransferSchema = z.object({
  playerOutId: z.uuid('Invalid player ID format.'),
  playerInId: z.uuid('Invalid player ID format.'),
});
