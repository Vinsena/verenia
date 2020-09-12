import { Inject, Injectable, InjectionToken } from '@angular/core';

export const CONFIGURATION = new InjectionToken<{ [key: string]: any }>(
  'configuration'
);

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly configuration: any;

  constructor(@Inject(CONFIGURATION) configuration: any) {
    this.configuration = configuration !== null ? configuration : {};
  }

  getValue(key: string, defaultValue?: any): any {
    return this.configuration[key] || defaultValue;
  }
}
