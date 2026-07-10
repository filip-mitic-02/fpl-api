import z from 'zod';

export const CreateGameweekPlayerSchema = z.object({
  playerId: z.uuid('Invalid playerId format.').trim(),
  goals: z.number('Number of goals must be a number.').min(0, 'Number of goals can not be a negative number.'),
  assists: z.number('Number of assists must be a number.').min(0, 'Number of assists can not be a negative number.'),
  cleanSheet: z.boolean('CleanSheet must be a boolean.'),
  yellowCard: z.boolean('YellowCard must be a boolean.'),
  redCard: z.boolean('RedCard must be a boolean.'),
  numOfMissedPenalties: z
    .number('Number of missedPenalties must be a number.')
    .min(0, 'Number of missedPenalties can not be a negative number.'),
});
