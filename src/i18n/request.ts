import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';
import {routing} from '../navigation';

export default getRequestConfig(async ({locale}) => {
  // 1. Intentamos usar el locale que nos pasa Next.js
  // 2. Si es undefined, lo buscamos en la cabecera que pone el Middleware
  // 3. Si todo falla, usamos el default
  const headerLocale = headers().get('x-next-intl-locale');
  
  const targetLocale = locale || headerLocale || routing.defaultLocale;
  
  console.log('>>> [REQUEST.TS] Detectado:', targetLocale, '(Param:', locale, '| Header:', headerLocale, ')');

  if (!routing.locales.includes(targetLocale as any)) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../../messages/${routing.defaultLocale}.json`)).default
    };
  }

  return {
    locale: targetLocale,
    messages: (await import(`../../messages/${targetLocale}.json`)).default
  };
});
