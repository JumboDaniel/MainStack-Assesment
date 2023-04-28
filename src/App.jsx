import { useState, useEffect } from "react";
import useSWR from "swr";
import { Card, DonutChart, LineChart } from "@tremor/react";
import ReactCountryFlag from "react-country-flag";

//file import
import "./App.css";
import Sidebar from "./components/sidebar";
import { Info } from "./components/svg";
import Error from "./components/error";
import Loading from "./components/loading";

function App() {
  const dataFormatter = (number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };
  const valueFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()} %`;
  const [views, setViews] = useState(null);
  const [location, setLocation] = useState(null);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://fe-task-api.mainstack.io/",
    fetcher
  );
  useEffect(() => {
    if (data) {
      setViews(
        Object.entries(data.graph_data.views).map(([year, view]) => ({
          year,
          view,
        }))
      );
    }
  }, [data]);

  if (error) return <Error/>;
  if (isLoading) return <Loading/>;
  console.log(data);
  return (
    <main className="flex mt-8">
      <Sidebar />
      <section className="w-[80%] px-24">
        {/* header */}
        <h2 className="text-xl font-bold">Dashboard</h2>
        {/* SubHeader */}
        <div>
          <div className="flex flex-col gap-y-4">
            <h3 className="text-2xl font-bold">Good morning, Blessing ⛅️</h3>
            <div className="flex justify-between">
              <p className="text-base">Check out your dashboard summary.</p>
              <p className="text-base text-[#FF5403] cursor-pointer">View Analytics</p>
            </div>
          </div>
          <div className="flex gap-x-6 mt-7">
            {/* Date-Button */}
            {[
              ["1day"],
              ["3 days"],
              ["7 days"],
              ["30 days"],
              ["All Time"],
              ["Custom Date"],
            ].map(([day], index) => (
              <button
                className={`${
                  day.includes("All")
                    ? "border-[#FF5403] text-[#FF5403] bg-[#FFEEE5]"
                    : ""
                } text-md font-bold py-3 px-4 border-[1px] rounded-[100px] cursor-pointer hover:border-[#FF5403] hover:text-[#FF5403] hover:bg-[#FFEEE5] transition-colors ease-linear`}
                key={index}
              >
                {day}
              </button>
            ))}
          </div>
          {/* Time Graph */}
          <Card className="mt-5">
            <div>
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">Page Views</h3>
                <Info />
              </div>
              <p>All time</p>
              <h2 className="text-5xl font-bold mt-3">500</h2>
              <LineChart
                className="mt-6"
                data={views}
                index="year"
                categories={["view"]}
                colors={["red"]}
                valueFormatter={dataFormatter}
                yAxisWidth={40}
              />
            </div>{" "}
          </Card>
          {/* Bottom Charts */}
          <section className="xl:flex gap-5 w-[100%] mt-5">
            {/* Card1 */}
            <Card>
              <div className="flex justify-between">
                <p className="text-base font-bold">Top Locations</p>
                <p className="text-sm text-[#FF5403]">View full reports</p>
              </div>
              <div className="flex">
                <div className="flex flex-col gap-3 mt-4">
                  {data.top_locations.map((location, index) => (
                    <div key={index}>
                      <div className="flex gap-3">
                        <ReactCountryFlag
                          className="emojiFlag"
                          countryCode={getCountryEmoji(location.country)}
                          style={{
                            fontSize: "1.3em",
                            lineHeight: "2em",
                          }}
                          svg
                          aria-label="United States"
                        />
                        <p> {location.country}</p>
                        <p className="font-bold"> {location.percent}%</p>
                      </div>
                    </div>
                  ))}
                </div>
                <DonutChart
                  className="mt-6"
                  data={data.top_locations}
                  category="percent"
                  index="country"
                  valueFormatter={valueFormatter}
                  colors={[
                    "blue",
                    "violet",
                    "indigo",
                    "green",
                    "cyan",
                    "brown",
                  ]}
                />
              </div>
            </Card>
            {/* card2 */}
            <Card>
              <div className="flex justify-between">
                <p className="text-base font-bold">Top Referral source</p>
                <p className="text-sm text-[#FF5403]">View full reports</p>
              </div>
              <div className="flex">
                <div className="flex flex-col gap-3 mt-4">
                  {data.top_sources.map((location, index) => (
                    <div key={index}>
                      <div className="flex gap-3">
                        <img
                          src={`/src/assets/${location.source}-svgrepo.svg`}
                          className="w-[1.3rem]"
                          alt={`${location.source}.svg`}
                          title={`${location.source} logo`}
                        />
                        <p className="capitalize"> {location.source}</p>

                        <p className="font-bold"> {location.percent}%</p>
                      </div>
                    </div>
                  ))}
                </div>
                <DonutChart
                  className="mt-6"
                  data={data.top_sources}
                  category="percent"
                  index="source"
                  valueFormatter={valueFormatter}
                  colors={[
                    "blue",
                    "violet",
                    "indigo",
                    "green",
                    "cyan",
                    "brown",
                  ]}
                />
              </div>
            </Card>
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;

function getCountryEmoji(countryName) {
  const countries = [
    ["Nigeria", "NG"],
    ["Ghana", "GH"],
    ["Finland", "FI"],
    ["United Kingdom", "GB"],
    ["Germany", "DE"],
  ];
  const country = countries.find(([name]) => name === countryName);
  console.log(country);
  if (country) {
    const [name, code] = country;
    return code;
  }
  return null;
}
