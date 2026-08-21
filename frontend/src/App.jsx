import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/home";
import BrowsePets from "./pages/BrowsePets";
import AddPet from "./pages/AddPet";
import PetDetails from "./pages/PetDetails";
import EditPet from "./pages/EditPet";
import PetTips from "./pages/PetTips";
import FAQs from "./pages/FAQs";
import Profile from "./pages/profile";
import Wishlist from "./pages/Wishlist";
import MyApplication from "./pages/MyApplication";
import Login from "./pages/Login";
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationDetails from "./pages/ApplicationDetails";
import EditApplication from "./pages/EditApplication";
import ProtectedRoute from "./components/ProtectedRoute";
import PetTipDetails from "./pages/PetTipDetails";
import Notifications from "./pages/Notifications.jsx";
import AdoptionProcess from "./pages/AdoptionProcess";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* MAIN PETVERSE LAYOUT */}

                <Route element={<Layout />}>

                    {/* HOME */}

                    <Route
                        path="/"
                        element={<Home />}
                    />


                    {/* BROWSE PETS */}

                    <Route
                        path="/browse-pets"
                        element={<BrowsePets />}
                    />


                    {/* PET DETAILS */}

                    <Route
                        path="/pet/:id"
                        element={
                            <ProtectedRoute>
                                <PetDetails />
                            </ProtectedRoute>
                        }
                    />


                    {/* EDIT PET */}

                    <Route
                        path="/pet/:id/edit"
                        element={<EditPet />}
                    />

                    {/* ADOPTION PROCESS */}

                    <Route
                        path="/adoption-process"
                        element={<AdoptionProcess />}
                    />

                    {/* APPLICATION */}

                    <Route
                        path="/apply"
                        element={
                            <ProtectedRoute>
                                <ApplicationForm />
                            </ProtectedRoute>
                        }
                    />


                    {/* MY APPLICATIONS */}

                    <Route
                        path="/applications"
                        element={<MyApplication />}
                    />

                    {/* Notifications */}

                    <Route
                        path="/notifications"
                        element={<Notifications />}
                    />


                    {/* APPLICATION DETAILS */}

                    <Route
                        path="/applications/:id"
                        element={<ApplicationDetails />}
                    />


                    {/* EDIT APPLICATION */}

                    <Route
                        path="/applications/:id/edit"
                        element={<EditApplication />}
                    />

                    {/* ADD PET */}

                    <Route
                        path="/add-pet"
                        element={<AddPet />}
                    />


                    {/* PET TIPS */}

                    <Route
                        path="/pet-tips"
                        element={<PetTips />}
                    />

                    <Route
                        path="/pet-tips/:id"
                        element={<PetTipDetails />}
                    />

                    {/* FAQ */}

                    <Route
                        path="/faqs"
                        element={<FAQs />}
                    />


                    {/* PROFILE */}

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />


                    {/* WISHLIST */}

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
