import { Language } from './i-language';

export interface IRepo {
  id: string;
  name: string;
  url: string;
  description: string;
  language: Language;
  owner: IOwner;
}

export interface IOwner {
  avatarUrl: string;
  login: string;
}
