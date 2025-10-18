/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";

type Serializer<T> = (v: T) => any;
type Deserializer<T> = (raw: any) => T;

function hasChromeStorage() {
  return Boolean((globalThis as any)?.chrome?.storage?.local);
}

export async function storageGet<T>(key: string): Promise<T | undefined> {
  if (hasChromeStorage()) {
    const chromeLocal = (globalThis as any).chrome.storage.local;
    return new Promise<T | undefined>((resolve) => {
      chromeLocal.get([key], (data: Record<string, any>) => {
        resolve(data?.[key] as T | undefined);
      });
    });
  }
  try {
    const raw = globalThis.localStorage.getItem(key);
    return raw == null ? undefined : (JSON.parse(raw) as T);
  } catch {
    return undefined;
  }
}

async function storageSet<T>(key: string, value: T): Promise<void> {
  if (hasChromeStorage()) {
    const chromeLocal = (globalThis as any).chrome.storage.local;
    return new Promise<void>((resolve) => {
      chromeLocal.set({ [key]: value }, () => resolve());
    });
  }
  globalThis.localStorage.setItem(key, JSON.stringify(value));
}

export function useExtensionStorage<T>(
  key: string,
  initialValue: T,
  opts?: { serialize?: Serializer<T>; deserialize?: Deserializer<T> }
) {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  const get = useCallback(async (): Promise<T | undefined> => {
    const raw = await storageGet<any>(key);
    if (raw === undefined) return undefined;
    return opts?.deserialize ? opts.deserialize(raw) : (raw as T);
  }, [key, opts]);

  const set = useCallback(
    async (v: T) => {
      const toStore = opts?.serialize ? opts.serialize(v) : v;
      await storageSet(key, toStore);
      setValue(v);
    },
    [key, opts]
  );

  const refresh = useCallback(async () => {
    const v = await get();
    if (v !== undefined) setValue(v);
    setLoading(false);
  }, [get]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { value, setValue, loading, get, set, refresh };
}
