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

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState(2020);

  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");

  const [limit, setLimit] = useState("");

  const fetchUrl = async () => {
    setLoading(true);
    try {
      const result = await fetchCars2({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });
      setCars(result);
    } catch (e) {
      console.error(e.messagge);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, [fuel, year, manufacturer, model, limit]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
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
            {loading && (
              <div className="mt-16 w-full flex-flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  height={50}
                  width={50}
                  className="object-contain"
                />
              </div>
            )}
            <ShowMore pageNumber={limit / 10} isNext={limit > cars.length} />
          </section>
        )}
      </div>
    </main>
  );
}
