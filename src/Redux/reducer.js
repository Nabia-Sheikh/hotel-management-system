import { READ } from "./actionTypes";

const initialState = [];

function formatData(items) {
  let tempItems = items.map((item) => {
    let id = item.sys.id;
    let images = item.fields.images.map((image) => image.fields.file.url);
    
    let room = { ...item.fields, images, id };
    return room;
  });
  return tempItems;
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case READ:
      let rooms = formatData(payload.data);
          let featuredRooms = rooms.filter((room) => room.featured === true);
          let slug = rooms[0].slug;
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));

      return [
        ...state,
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
    default:
      return state;
  }
};

export default reducer;
