import React from "react";
// import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import Loading from "./Loading";
import { useSelector } from "react-redux";

export default function RoomsContainer() {
  const state = useSelector((state) => state);

  return (
    <>
      {state.length > 0 ? (
        <RoomsList rooms={state[0].sortedRooms} />
      ) : (
        <>
          {/* <RoomsFilter rooms={state.rooms} /> */}
          <Loading />
        </>
      )}
    </>
  );
}
