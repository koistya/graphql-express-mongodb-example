import { Router } from 'express';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    await db.collection('log').insertOne({
      time: new Date(),
      ip: req.ip,
      message: 'Homepage visit'
    });
    res.send('<h1>Hello, world!</h1>');
  } catch (err) {
    next(err);
  }
});

export default router;
