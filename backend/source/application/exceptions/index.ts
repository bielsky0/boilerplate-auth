import { ValidationError } from "yup";

export class NotFoundException extends Error {}
export class ValidationException extends ValidationError {}
export class UnauthorizedException extends Error {}
export class InvalidTokenException extends Error {}
