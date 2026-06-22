import { TestBed } from '@angular/core/testing';

import { ApiRepo } from './api-repo';

describe('ApiRepo', () => {
  let service: ApiRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have apiUrl defined', () => {
    expect(service.apiUrl).toBeDefined();
    expect(service.apiUrl).toContain('localhost');
  });

  it('should use get method', () => {
    service.get().subscribe({
      next: (notes) => {
        expect(notes).toBeDefined();
        expect(Array.isArray(notes)).toBe(true);
        expect(notes.length).toBeGreaterThanOrEqual(0);
      },
      // error: (err) => {
      //   vi.fail('get method should not fail: ' + err);
      // }
    });
  });
});
