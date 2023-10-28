import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookinWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState("");
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 pt-8 bg-gray-100 -mx-8 px-8">
      <h1 className="text-2xl">{place.title}</h1>
      <AddressLink >{place.address}</AddressLink>
      <PlaceGallery place={place}/>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8 mb-8">
        <div>
          <div className="my-4">
            <h2 className="font-seminold text-2xl">Description</h2>
            {place.description}
          </div>
          Check In Time: {place.checkIn} <br /> Check Out Time: {place.checkOut}{" "}
          <br /> Maximum number of Guests: {place.maxGuests}
        </div>
        <div>
          <BookinWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-seminold text-2xl">Extra Information</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
