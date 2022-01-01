import React from "react";
// import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import RoomsFilter from "./RoomsFilter";

export default function RoomsContainer() {
  const state = useSelector((state) => state);
  return (
    <>
      {state.length > 0 ? (
        <>
          <RoomsFilter rooms={state[0].rooms} />
          <RoomsList rooms={state[0].sortedRooms} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
