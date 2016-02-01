'use strict';

export default function () {
  return (err, req, res, next) => {
    switch (err.name) {
    case 'ValidationError':
      {
        err.status = 400;
        break;
      }
    case 'MongoError':
      {
        if (err.code === 11000) {
          err.status = 409;
        }

        break;
      }
    }

    next(err);
  };
}
