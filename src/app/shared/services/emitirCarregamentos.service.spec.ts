/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmitirCarregamentosService } from './emitirCarregamentos.service';

describe('Service: EmitirCarregamentos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmitirCarregamentosService]
    });
  });

  it('should ...', inject([EmitirCarregamentosService], (service: EmitirCarregamentosService) => {
    expect(service).toBeTruthy();
  }));
});
