import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="grid gap-x-6 gap-y-8 mt-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={'/place/'+place._id} key={place}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl aspect-square object-cover"
                  src={"https://hotel-haven-gilt.vercel.app/uploads/" + place.photos?.[0]}
                />
              )}
            </div>
            <h2 className="text-sm truncate leading-4">{place.title}</h2>
            <h3 className="font-bold text-gray-500">{place.address}</h3>
            <div className="mt-1">
            <span className="font-bold">${place.price}</span> per Night
            </div>
          </Link>
        ))}
    </div>
  );
}
