import { TestBed, inject } from '@angular/core/testing';

import { FileUploadClientService } from './file-client.service';

describe('FileUploadClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadClientService]
    });
  });

  it('should be created', inject([FileUploadClientService], (service: FileUploadClientService) => {
    expect(service).toBeTruthy();
  }));
});
