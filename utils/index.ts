import { CarProps, FilterProps } from "@/types";
import json from "@/mocks/cars.json";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": "dec56e30f7mshb9b072ce3a361f7p113391jsn705a98988bd6",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?
      make=${manufacturer}&year=${year}&model=${model}
      &limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );
  return await response.json();
}

export async function fetchCars2(filters: FilterProps) {
  function isValid(car) {
    return newFilters.filter(([key, value]) => car[key] === value);
  }

  //eliminando filtros vacios
  const newFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) => value !== "" && value !== null
    )
  );
  const cars = json.cars.filter(isValid);
  return cars;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImagesUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams}`;
  return newPathname;
};
