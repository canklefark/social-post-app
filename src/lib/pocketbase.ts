// src/lib/pocketbase.ts
import PocketBase from 'pocketbase';
import { writable, type Writable } from 'svelte/store';
import type { TypedPocketBase, UsersResponse } from '../pocketbase-types';

export const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketBase;

export const currentUser: Writable<UsersResponse | null> = writable(
  pb.authStore.model as UsersResponse | null
);

pb.authStore.onChange((auth) => {
  console.log('AuthStore changed', auth);
  currentUser.set(pb.authStore.model as UsersResponse | null);
});

export async function login(email: string, password: string) {
  const authData = await pb.collection('users').authWithPassword<UsersResponse>(email, password);
  console.log('Auth data:', authData);
  return authData;
}

export function logout() {
  pb.authStore.clear();
}
