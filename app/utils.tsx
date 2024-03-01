import { Ionicons } from "@expo/vector-icons";

export const colors = {
  primary: '#a855f7',
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const localStorageKeys = {
  cartWord: "@cartWord",
};

export const createRateStars = (rate: number) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rate) {
      stars.push(
        <Ionicons key={i} name="star" size={20} color="#f59e0b" />
      );
    } else {
      stars.push(
        <Ionicons key={i} name="star" size={20} color="#e7e5e4" />
      );
    }
  }
  return stars;
};