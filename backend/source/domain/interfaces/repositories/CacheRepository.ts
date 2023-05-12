export interface CacheRepository {
  set<T>(key: string, value: T): Promise<void>;
  get<T>(key: string): Promise<T>;
  connect(): Promise<void>;
  quit(): Promise<void>;
}
