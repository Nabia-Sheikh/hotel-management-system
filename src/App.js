import { child, get, ref } from "firebase/database";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Navbar from "./Components/Navbar";
import { db } from "./firebase";
import Home from "./pages/Home";
import { ReadFromFirebase } from "./Redux/actions";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Bookings from "./Components/bookings";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserAuthContextProvider } from "./contexts/UserAuthContext";
import Rooms from "./pages/Rooms";
import SingleRooms from "./pages/SingleRooms";
import Booknow from "./pages/Booknow";
import Footer from "./Components/Footer";

function App() {
  const dispatch = useDispatch();

  function readFromDatabase() {
    const dbRef = ref(db);
    get(child(dbRef, "/hotels"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          dispatch(ReadFromFirebase(data));
        } else {
          console.log("no data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    async function start() {
      await readFromDatabase();
    }
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (hotel) {
  //     dispatch(ReadFromFirebase(hotel));
  //     console.log(hotel);
  //   }
  // }, [hotel]);

  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<SingleRooms />} />

            <Route path="/about" element={<About />} />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  {" "}
                  <Bookings />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/booknow/:slug"
              element={
                <ProtectedRoute>
                  <Booknow />
                </ProtectedRoute>
              }
            />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
