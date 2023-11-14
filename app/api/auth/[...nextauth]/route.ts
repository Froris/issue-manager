import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

/*
 * Когда мы добавляем свойство adapter, NextAuth меняет стратегию с
 * jwt на database, НО не все провайдеры могут работать по такой стратегии.
 * Так что если мы используем адаптер БД ТОЛЬКО для хранения данных о юзере,
 * но АВТОРИЗАЦИЯ ВСЁ ЕЩЁ через какой-то провайдер, нам НЕОБХОДИМО
 * вручную изменить стратегию на "jwt"
 * */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
