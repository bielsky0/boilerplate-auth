import { NextFunction, Request, Response } from "express";
import * as Exceptions from "@application/exceptions";

type ExceptionResponse = {
  detail?: string; // A human-readable explanation specific to this occurrence of the problem.
  errors?: string[]; // Error details (validation result etc)
  status: number; // The HTTP status code
  title: string; // A short, human-readable summary of the problem type
  type: string; // A URI reference that identifies the problem type. (https://datatracker.ietf.org/doc/html/rfc7231)
};

export function makeHandleException() {
  return function handler(
    error: Error,
    request: Request,
    response: Response,
    _: NextFunction
  ) {
    let exception: ExceptionResponse | null = null;

    switch (error.constructor) {
      case Exceptions.NotFoundException:
        exception = notFoundExceptionResponse(error);
        break;
      case Exceptions.ValidationException:
        exception = validationExceptionResponse(
          error as Exceptions.ValidationException
        );
      case Exceptions.UnauthorizedException:
        exception = unauthorizedExceptionResponse(
          error as Exceptions.UnauthorizedException
        );
      case Exceptions.InvalidTokenException:
        exception = invalidTokenExceptionResponse(
          error as Exceptions.InvalidTokenException
        );
        break;
      default:
        exception = internalServerException();
    }

    return response.status(exception.status).json(exception);
  };
}

function notFoundExceptionResponse({
  message,
}: Exceptions.NotFoundException): ExceptionResponse {
  return {
    ...(message && { detail: message }),
    status: 404,
    title: "The specified resource was not found",
    type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  };
}

function internalServerException(): ExceptionResponse {
  return {
    status: 500,
    title: "An error occurred while processing your request",
    type: "https://tools.ietf.org/html/rfc7231#section-6.6.1",
  };
}

function validationExceptionResponse(
  error: Exceptions.ValidationException
): ExceptionResponse {
  return {
    ...(error.message && { detail: error.message }),
    errors: error.errors,
    status: 400,
    title: "The request was invalid",
    type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  };
}

function unauthorizedExceptionResponse({
  message,
}: Exceptions.UnauthorizedException): ExceptionResponse {
  return {
    ...(message && { detail: message }),
    status: 401,
    title: "Unauthorized",
    type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  };
}

function invalidTokenExceptionResponse({
  message,
}: Exceptions.UnauthorizedException): ExceptionResponse {
  return {
    ...(message && { detail: message }),
    status: 403,
    title: "Forbidden",
    type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  };
}
