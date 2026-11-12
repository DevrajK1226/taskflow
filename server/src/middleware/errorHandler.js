import { AppError } from '../utils/AppError.js';

export function notFound(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

export function errorHandler(err, _req, res, _next) {
  // MongoDB duplicate key (e.g. email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'value';
    return res.status(409).json({ error: { message: `This ${field} is already in use` } });
  }

  const status = err.statusCode || err.status || 500;
  if (status >= 500) console.error(err);

  res.status(status).json({
    error: {
      message: status >= 500 ? 'Something went wrong' : err.message,
      ...(err.details && { details: err.details }),
    },
  });
}
