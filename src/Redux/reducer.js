import { FILTER, READ } from "./actionTypes";

const initialState = [];

function formatData(items) {
  let tempItems = Object.values(items).map((item) => {
    let id = item.sys.id;
    let images = item.fields.images.map((image) => image.fields.file.url);

    let room = { ...item.fields, images, id };
    return room;
  });
  return tempItems;
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case READ: {
      let rooms = formatData(payload.data);
      let temp = [];
      for (let i of rooms) i && temp.push(i);
      rooms = temp;
      let featuredRooms = rooms.filter((room) => room.featured === true);
      let slug = rooms[0].slug;
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));
      return [
        {
          slug,
          rooms,
          featuredRooms,
          sortedRooms: rooms,
          loading: false,
          price: maxPrice,
          maxPrice,
          maxSize,
          breakfast: false,
          pets: false,
          type: "all",
          capacity: 1,
          minPrice: 0,
          minSize: 0,
        },
      ];
    }
    case FILTER:
      const target = payload.event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = payload.event.target.name;
      let newData = [...state];
      newData[0][name] = value;
      let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
        newData[0];

      let tempRooms = [...rooms];

      if (type !== "all") {
        tempRooms = tempRooms.filter((room) => room.type === type);
      }
      //filter by capacity
      if (capacity !== 1) {
        tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
      }

      //filter by price
      tempRooms = tempRooms.filter((room) => room.price <= price);

      //filter by size
      tempRooms = tempRooms.filter(
        (room) => room.size >= minSize && room.size <= maxSize
      );

      //filter by breakfast
      if (breakfast) {
        tempRooms = tempRooms.filter((room) => room.breakfast === true);
      }

      //filter by pets
      if (pets) {
        tempRooms = tempRooms.filter((room) => room.pets === true);
      }

      newData[0].sortedRooms = tempRooms;
      return newData;
    default:
      return state;
  }
};

export default reducer;
