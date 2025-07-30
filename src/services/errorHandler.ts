import { AxiosError } from 'axios';
import { store } from '../store/store';
import { finishRequest, setError } from '../store/slices/appSlice';

export const handleHttpError = (error: AxiosError): Promise<never> => {
  store.dispatch(finishRequest());
  
  let errorMessage = 'Bir hata oluştu';
  
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data as any;
    
    switch (status) {
      case 400:
        errorMessage = data?.message || 'Geçersiz istek';
        break;
      case 401:
        errorMessage = 'Yetkilendirme hatası';
        break;
      case 403:
        errorMessage = 'Erişim reddedildi';
        break;
      case 404:
        errorMessage = 'Kaynak bulunamadı';
        break;
      case 500:
        errorMessage = 'Sunucu hatası';
        break;
      default:
        errorMessage = data?.message || `Hata: ${status}`;
    }
  } else if (error.request) {
    errorMessage = 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.';
  } else {
    errorMessage = error.message || 'Beklenmeyen bir hata oluştu';
  }
  
  store.dispatch(setError(errorMessage));
  return Promise.reject(error);
}; 