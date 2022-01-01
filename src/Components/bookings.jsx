import { onValue, ref, remove } from "firebase/database";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";
import styled from "styled-components";

const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === "Pending" ? "blue" : "")};
  color: ${(props) => (props.type === "Accepted" ? "green" : "")};
  color: ${(props) => (props.type === "Rejected" ? "red" : "")};
`;

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useUserAuth();

  React.useEffect(() => {
    onValue(ref(db, "/bookings/"), (snapshot) => {
      setBookings([]);
      const data = snapshot.val();
      if (data !== null) {
        // eslint-disable-next-line array-callback-return
        Object.values(data).map((todo) => {
          if (todo.refID === user.email) {
            setBookings((oldArray) => [...oldArray, todo]);
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBooking = (dlt) => {
    remove(ref(db, `/bookings/${dlt.id}`));
  };
  return (
    <>
      {bookings.length > 0 ? (
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "80px", width: "80%", margin: "80px auto" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Room type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Capactiy</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <>
                  <td>{booking.id}</td>
                  <td>{booking.type.toUpperCase()}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>{booking.capacity}</td>
                  <td>{booking.totalPrice}</td>
                  <StatusTD type={booking.status}>{booking.status}</StatusTD>
                  <td style={{textAlign : "center"}} >
                    <AiOutlineDelete
                      color="red"
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      onClick={() => deleteBooking(booking)}
                    />
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="container roomerror">
          <div className="row my-5">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card shadow-lg border-0 p-4 error">
                <h1 className="text-center display-4">No bookings.</h1>
                <h3>Click below to start Booking!.</h3>
                <Link to="/rooms" className="btn btn-warning mt-4 ">
                  Start Booking.
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
