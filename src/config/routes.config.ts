import express from 'express';
import { aiRouter, authRouter, clubRouter, exampleRouter, fantasyTeamRouter, gameweekRouter, playerRouter, userRouter } from '../routes';

export const setupRoutes = (app: express.Application) => {
  // #example
  app.use('/api/v1/example', exampleRouter);

  // #authentication
  app.use('/api/v1/auth', authRouter);

  // #user
  app.use('/api/v1/user', userRouter);

  // #club
  app.use('/api/v1/club', clubRouter);

  // #player
  app.use('/api/v1/player', playerRouter);

  // #fantasyTeam
  app.use('/api/v1/fantasy-team', fantasyTeamRouter);

  // #gameweek
  app.use('/api/v1/gameweek', gameweekRouter);

  // #ai
  app.use('/api/v1/ai', aiRouter);

  // #health
  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
    });
  });
};
