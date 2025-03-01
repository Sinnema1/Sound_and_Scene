import { Router } from 'express';
import { getPlacesByCoordinates } from '../../controllers/places-controller.js';

const router = Router();

// GET /api/places?lat=LATITUDE&lng=LONGITUDE
router.get('/', (req, res) => {
  console.log(`GET /api/places hit with query: ${JSON.stringify(req.query)}`);
  getPlacesByCoordinates(req, res);
});

export { router as placesRouter };