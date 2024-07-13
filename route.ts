/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 * */
export const publicRoutes: string[] = ["/auth"];

/**
 * An array of routes that are accessible to only admin
 * These routes require authentication
 * @type {string[]}
 * */
export const adminRoutes: string = "/admin";

/**
 * An array of routes that are authentication
 * These routes will redirect logged-in users to
 * @type {string[]}
 * */
export const authRoutes: string[] = ["/auth"];

/**
 * The prefix for API authentication Routes
 * that start with this prefix are used for API authentication purpose
 * @type {string}
 * */
export const apiAuthPrefix: string =
  process.env.NODE_ENV !== "production" ? "/api" : "/api/auth";

/**
 * Authenticated User's first page
 * DEFAULT_LOGIN_REDIRECT
 * @type {string}
 * */
export const DEFAULT_LOGIN_REDIRECT: string = "/";

export const verifyPrefix: string = "/auth/verify";