export interface CacheRepository {
  set(key: string, value: string): Promise<void>;
  setEx(key: string, seconds: number, value: string): Promise<void>;
  lpush(key: string, values: string[]): Promise<void>;
  get(key: string): Promise<string | null>;
  lrange(key: string, start: number, stop: number): Promise<string[]>;
  del(keys: string[]): Promise<number>;
}
