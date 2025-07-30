import { renderStars } from '../../src/utils/renderStars';

describe('renderStars yardımcı fonksiyonu', () => {
  it('5 puan için 5 dolu yıldız döndürmeli', () => {
    const result = renderStars(5);
    expect(result).toBe('★★★★★');
  });

  it('3 puan için 3 dolu ve 2 boş yıldız döndürmeli', () => {
    const result = renderStars(3);
    expect(result).toBe('★★★☆☆');
  });

  it('0 puan için 0 yıldız döndürmeli', () => {
    const result = renderStars(0);
    expect(result).toBe('☆☆☆☆☆');
  });

  it('Negatif değerler için boş yıldızlar döndürmeli', () => {
    const result = renderStars(-1);
    expect(result).toBe('☆☆☆☆☆');
  });

  it('2.5 puan için 2 dolu ve 1 boş yıldız döndürmeli', () => {
    const result = renderStars(2.5);
    expect(result).toBe('★★☆☆☆');
  });
}); 