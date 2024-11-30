
import { Strosek } from '../models/strosek.model';

afterAll(() => {
  process.exit();
});


describe('Strosek Model Validation', () => {
  it('should validate a valid strosek object', () => {
    const validStrosek = new Strosek({
      naziv: 'Pisarna',
      znesek: 100.50,
      datum: new Date(),
      kategorija: 'Pisarniški material',
      oseba: 'Janez Novak',
      nacinPlacila: 'Gotovina',
      komentar: 'Nakup papirja'
    });

    expect(validStrosek.validateSync()).toBeUndefined();
  });

  it('should invalidate strosek with missing naziv', () => {
    const invalidStrosek = new Strosek({
      znesek: 100.50,
      datum: new Date(),
      kategorija: 'Pisarniški material',
      oseba: 'Janez Novak',
      nacinPlacila: 'Gotovina',
      komentar: 'Nakup papirja'
    });

    const error = invalidStrosek.validateSync();
    expect(error).not.toBeNull();
    if (error) {
        expect(error.errors.naziv).toBeDefined();
    }
  });

  it('should invalidate strosek with missing znesek', () => {
    const invalidStrosek = new Strosek({
      naziv: 'Pisarna',
      datum: new Date(),
      kategorija: 'Pisarniški material',
      oseba: 'Janez Novak',
      nacinPlacila: 'Gotovina',
      komentar: 'Nakup papirja'
    });

    const error = invalidStrosek.validateSync();
    expect(error).not.toBeNull();
    if (error) {
      expect(error.errors).toHaveProperty('znesek'); // Preveri napako na polju 'znesek'
    }
  });

  it('should invalidate strosek with negative znesek', () => {
    const invalidStrosek = new Strosek({
      naziv: 'Pisarna',
      znesek: -50,
      datum: new Date(),
      kategorija: 'Pisarniški material',
      oseba: 'Janez Novak',
      nacinPlacila: 'Gotovina',
      komentar: 'Nakup papirja'
    });

    const error = invalidStrosek.validateSync();
    expect(error).not.toBeNull();
    if (error) {
        expect(error.errors.naziv).toBeDefined();
    }
  });

  it('should invalidate strosek with invalid datum', () => {
    const invalidStrosek = new Strosek({
      naziv: 'Pisarna',
      znesek: 50,
      datum: 'not-a-date',
      kategorija: 'Pisarniški material',
      oseba: 'Janez Novak',
      nacinPlacila: 'Gotovina',
      komentar: 'Nakup papirja'
    });

    const error = invalidStrosek.validateSync();

    expect(error).not.toBeNull();
    if (error) {
      expect(error.errors).toHaveProperty('datum');
      expect(error.errors.datum.message).toContain('Datum mora biti veljaven');
    }
  });
});
