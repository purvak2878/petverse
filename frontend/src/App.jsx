import { BrowserRouter, Routes, Route } from "react-router-dom";

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

                <Route path="/" element={<Home />} />

                <Route path="/browse-pets" element={<BrowsePets />} />

                <Route path="/Myapplications" element={<MyApplication />} />

                <Route path="/add-pet" element={<AddPet />} />

                <Route path="/pet-tips" element={<PetTips />} />

                <Route path="/faqs" element={<FAQs />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/wishlist" element={<Wishlist />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
