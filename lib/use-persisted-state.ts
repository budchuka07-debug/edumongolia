"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();
const snapshots = new Map<string, { raw: string | null; value: unknown }>();
const initialByKey = new Map<string, unknown>();

function stableInitial<T>(key: string, initial: T): T {
  if (!initialByKey.has(key)) initialByKey.set(key, initial);
  return initialByKey.get(key) as T;
}

function readPersisted<T>(key: string, initial: T): T {
  const raw = localStorage.getItem(key);
  const hit = snapshots.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value = initial;
  if (raw != null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = initial;
    }
  }
  snapshots.set(key, { raw, value });
  return value;
}

function emit(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

export function usePersistedState<T>(key: string, initial: T) {
  const base = stableInitial(key, initial);

  const subscribe = useCallback(
    (onChange: () => void) => {
      let bucket = listeners.get(key);
      if (!bucket) {
        bucket = new Set();
        listeners.set(key, bucket);
      }
      bucket.add(onChange);
      const onStorage = (event: StorageEvent) => {
        if (event.key === key || event.key === null) {
          snapshots.delete(key);
          onChange();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        bucket?.delete(onChange);
        window.removeEventListener("storage", onStorage);
      };
    },
    [key],
  );

  const getServerSnapshot = useCallback(() => base, [base]);
  const getSnapshot = useCallback(() => readPersisted(key, base), [base, key]);
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (update: T | ((current: T) => T)) => {
      const current = readPersisted(key, base);
      const next = typeof update === "function" ? (update as (current: T) => T)(current) : update;
      localStorage.setItem(key, JSON.stringify(next));
      snapshots.delete(key);
      emit(key);
    },
    [base, key],
  );

  return [value, setValue] as const;
}
