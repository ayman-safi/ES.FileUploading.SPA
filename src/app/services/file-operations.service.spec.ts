/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileOperationsService } from './file-operations.service';

describe('Service: FileOperations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileOperationsService]
    });
  });

  it('should ...', inject([FileOperationsService], (service: FileOperationsService) => {
    expect(service).toBeTruthy();
  }));
});
