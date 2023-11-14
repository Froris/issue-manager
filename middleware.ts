export { default } from 'next-auth/middleware';
// NextAuth уже имеет свой middleware, так что мы просто делаем ре экспорт НО
// указываем для каких путей он будет срабатывать.
export const config = {
  matcher: ['/issues/new', '/issues/edit/:id+'],
};
