"use client";

import { CardCard, CustomFilter, Hero, SearchBar } from "@/components/";
import { fetchCars } from "@/utils";
import Image from "next/image";

export default async function Home() {
  const allCars = await fetchCars();
  const isDataEmpty = allCars.length === 0 || !allCars;
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
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>
        {isDataEmpty ? (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Opps</h2>{" "}
            <p>{allCars?.messages}</p>
          </div>
        ) : (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car: any) => (
                <CardCard car={car} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
