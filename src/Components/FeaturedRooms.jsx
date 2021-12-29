import React from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

const FeaturedRooms = () => {
  const state = useSelector((state) => state);

  return (
    <section className="featured-rooms container">
      <Title title="Featured Rooms" />
      <div className="row">
        {state.length > 0 ? (
          state[0].featuredRooms.map((room) => (
            <Room key={room.id} room={room} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
