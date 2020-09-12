export interface Language {
  name: string;
  color: string;
}

export interface LanguageDto {
  [key: string]: { color: string };
}
