export interface CacheRepository {
  set(key: string, value: string): Promise<void>;
  setEx(key: string, seconds: number, value: string): Promise<void>;

  get(key: string): Promise<string | null>;
}
