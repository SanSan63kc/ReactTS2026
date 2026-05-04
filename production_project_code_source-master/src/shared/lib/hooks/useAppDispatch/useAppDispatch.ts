/* import { AppDispatch } from "app/providers/StoreProvider/config/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>(); */

import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'app/providers/StoreProvider';

// Именно такая запись «пробивает» сложные зависимости типов
export const useAppDispatch: () => AppDispatch = useDispatch;