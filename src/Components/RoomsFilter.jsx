import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteration } from "../Redux/actions";
import Title from "./Title";

//to get all unique value
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

const RoomsFilter = ({ rooms }) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const capacity = state[0].capacity;
  const type = state[0].type;
  const price = state[0].price;
  const minPrice = state[0].minPrice;
  const maxPrice = state[0].maxPrice;
  const minSize = state[0].minSize;
  const maxSize = state[0].maxSize;
  const breakfast = state[0].breakfast;
  const pets = state[0].pets;

  const handleChange = (event) => {
    dispatch(filteration(event)); 
  };

  //get unique type
    let types = getUnique(rooms, "type");
  //get all
    types = ["all", ...types];
    

  //map to jsx
  types = types.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });
  let people = getUnique(rooms, "capacity");
  people = people.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <div className="container mt-5">
      <Title title="Search Rooms" />
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="form-group">
            <label htmlFor="type">Room Type</label>
            <select
              name="type"
              id="type"
              value={type}
              className="form-control"
              onChange={handleChange}
            >
              {types}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Guests</label>
            <select
              name="capacity"
              id="capacity"
              value={capacity}
              className="form-control"
              onChange={handleChange}
            >
              {people}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Room Price Rs{price}</label>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              id="price"
              value={price}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-md-4 col-12 ml-auto">
          <div className="custom-control custom-checkbox my-5">
            <input
              type="checkbox"
              className="custom-control-input"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast" className="custom-control-label">
              Breakfast
            </label>
          </div>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets" className="custom-control-label">
              Pets
            </label>
          </div>
          <div className="input-group my-5">
            <label htmlFor="size" className="mr-3">
              Room Size{" "}
            </label>
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={handleChange}
              className="form-control"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsFilter;
