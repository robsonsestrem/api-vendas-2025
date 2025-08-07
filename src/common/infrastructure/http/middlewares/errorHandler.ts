import { NextFunction, Request, Response } from 'express';

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
): Response {
	if (err instanceof Error) {
		return res.status(400).json({
			error: err.message,
		});
	}

	console.error(err);

	return res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
}
