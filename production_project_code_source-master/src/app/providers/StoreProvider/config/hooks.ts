import { useDispatch } from 'react-redux';
import { AppDispatch } from './store'; // путь к твоему файлу выше

export const useAppDispatch = () => useDispatch<AppDispatch>();