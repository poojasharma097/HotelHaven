import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns"; 
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookinWidget ({place}) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name,setName] = useState('')
  const [phone, setPhone] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  },[user]);
  
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace () {
    const response = await axios.post('/bookings', {checkIn,checkOut,numberOfGuests,name,phone,
      place: place._id,
      price: numberOfNights*place.price
    });
    const bookingId = response.data._id;
    setRedirect('/account/bookings/'+bookingId);
  }

  if (redirect) {
    return <Navigate to={redirect}/>
  }
    return (
        <div className="bg-white rounded-2xl shadow p-4">
            <div className="text-2xl text-center">
              Price: Rs.{place.price} per night
            </div>
            <div className="border rounded-2xl mt-4">
              <div className="flex">
                <div className="py-3 px-4">
                  <label>Check In:</label>
                  <input type="date" value={checkIn} onChange={event => setCheckIn(event.target.value)}></input>
                </div>
                <div className="py-3 px-4 border-l">
                  <label>Check Out:</label>
                  <input type="date" value={checkOut} onChange={event => setCheckOut(event.target.value)}></input>
                </div>
              </div>
              <div className="py-3 px-4 border-t">
                <label>Number of Guests: </label>
                <input type="number" value={numberOfGuests} onChange={event => setNumberOfGuests(event.target.value)}></input>
              </div>
              {numberOfNights > 0 && (
                <div className="py-3 px-4 border-t">
                <label>Your full name: </label>
                <input type="text" value={name} onChange={event => setName(event.target.value)}></input>
                <label>Phone Number: </label>
                <input type="tel" value={phone} onChange={event => setPhone(event.target.value)}></input>
              </div>
              )}
            </div>
            <button onClick={bookThisPlace} className="primary">Book this Place
            {numberOfNights > 0 && (
              <span> Rs.{numberOfNights * place.price}</span>
            )}
            </button>
          </div>
    );
}