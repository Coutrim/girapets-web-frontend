import { TestBed } from '@angular/core/testing';

import { IbgeLocalidadesService } from './ibge-localidades.service';

describe('IbgeLocalidadesService', () => {
  let service: IbgeLocalidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IbgeLocalidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
