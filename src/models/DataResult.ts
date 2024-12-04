import { Result } from './Result';

export interface DataResult<T> extends Result {
  data: T;
}
