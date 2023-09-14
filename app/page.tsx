"use client";

import {
  CardCard,
  CustomFilter,
  Hero,
  SearchBar,
  ShowMore,
} from "@/components/";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars, fetchCars2 } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ searchParams }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchUrl = async () => {
      const allCars = await fetchCars2({
        manufacturer: searchParams.manifacturer || "",
        year: searchParams.year || 2022,
        fuel: searchParams.fuel || "",
        limit: searchParams.limit || 10,
        model: searchParams.model || "",
      });
      setCars(allCars.cars);
    };
    fetchUrl();
  }, []);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {cars?.message ? (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Opps</h2>{" "}
            <p>{cars.message}</p>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {cars?.map((car: any) => (
                <CardCard car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={searchParams.limit || 10 > cars.length}
            />
          </section>
        )}
      </div>
    </main>
  );
}
