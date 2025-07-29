export const getStockStatus = (stock: number) => {
    if (stock > 20)
      return {
        text: 'Stokta',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
      };
    if (stock > 5)
      return {
        text: 'Az Stokta',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
      };
    if (stock > 0)
      return {
        text: 'Son Ürünler',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
      };
    return { text: 'Stok Yok', color: 'text-red-600', bgColor: 'bg-red-100' };
  };
