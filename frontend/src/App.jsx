import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/home";
import BrowsePets from "./pages/BrowsePets";
import AddPet from "./pages/AddPet";
import PetTips from "./pages/PetTips";
import FAQs from "./pages/FAQs";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import MyApplication from "./pages/MyApplication";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route element={<Layout />}>

                    <Route path="/" element={<Home />} />

                    <Route
                        path="/browse-pets"
                        element={<BrowsePets />}
                    />

                    <Route
                        path="/applications"
                        element={<MyApplication />}
                    />

                    <Route
                        path="/add-pet"
                        element={<AddPet />}
                    />

                    <Route
                        path="/pet-tips"
                        element={<PetTips />}
                    />

                    <Route
                        path="/faqs"
                        element={<FAQs />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/wishlist"
                        element={<Wishlist />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;
