import 'express'; // Импортируем оригинальный модуль express

declare module 'express' {
  interface Request {
    user?: {
      id?: string;
    };
  }
}
