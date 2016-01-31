'use strict';

export default function mongooseErrorsMiddleware (err, req, res, next) {
  if (!err.name) {
    return next(err);
  }

  switch (err.name) {
  case 'ValidationError': {
      err.status = 400;
      break;
    }
  case 'MongoError': {
      if (err.code === 11000) {
        err.status = 409;
      }

      break;
    }
  }

  next(err);
}
