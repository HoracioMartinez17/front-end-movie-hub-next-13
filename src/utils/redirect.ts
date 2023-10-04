import { permanentRedirect } from 'next/navigation'

export default async function redirect (path: string) {
 return permanentRedirect(path);
  };
