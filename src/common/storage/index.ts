import { Maybe } from '@unpacked/tool-belt';
import { setItemAsync, getItemAsync } from 'expo-secure-store';

export async function saveJWT(token: string) {
  await setItemAsync('jwt', token);
}

export async function maybeGetJWT(): Promise<Maybe<string>> {
  try {
    return Maybe.fromValue(await getItemAsync('jwt'));
  } catch {
    return Maybe.fromValue();
  }
}
