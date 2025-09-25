// src/pages/LandingPage.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import Slider from "react-slick";
import { X } from "lucide-react"; // Import X icon
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getLawyers, lawyerRequestAccount } from "../services/lawyerService";
import { toast } from "react-toastify";
import implement from "../assets/impliment.jpg";

export default function LandingPage() {
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [showLawyerModal, setShowLawyerModal] = useState(false);
  const [lawyers, setLawyers] = useState([]);

  const mockLawyers = [
    {
      id: 1,
      name: "John Doe",
      specialty: "Family Law",
      pic: "https://i.pravatar.cc/150?img=1",
      availability: ["Mon 10AM", "Wed 2PM"],
    },
    {
      id: 2,
      name: "Jane Smith",
      specialty: "Property Law",
      pic: "https://i.pravatar.cc/150?img=2",
      availability: ["Tue 1PM", "Thu 3PM"],
    },
    {
      id: 3,
      name: "Michael Brown",
      specialty: "Criminal Law",
      pic: "https://i.pravatar.cc/150?img=3",
      availability: ["Fri 11AM", "Mon 4PM"],
    },
    {
      id: 4,
      name: "Emily Clark",
      specialty: "Contract Law",
      pic: "https://i.pravatar.cc/150?img=4",
      availability: ["Wed 10AM", "Thu 2PM"],
    },
    {
      id: 5,
      name: "David Lee",
      specialty: "Corporate Law",
      pic: "https://i.pravatar.cc/150?img=5",
      availability: ["Tue 9AM", "Fri 1PM"],
    },
    {
      id: 6,
      name: "Sophia Turner",
      specialty: "Intellectual Property",
      pic: "https://i.pravatar.cc/150?img=6",
      availability: ["Mon 3PM", "Thu 11AM"],
    },
    {
      id: 7,
      name: "James Wilson",
      specialty: "Immigration Law",
      pic: "https://i.pravatar.cc/150?img=7",
      availability: ["Tue 10AM", "Fri 2PM"],
    },
    {
      id: 8,
      name: "Olivia Martinez",
      specialty: "Employment Law",
      pic: "https://i.pravatar.cc/150?img=8",
      availability: ["Wed 1PM", "Thu 4PM"],
    },
    {
      id: 9,
      name: "Liam Harris",
      specialty: "Tax Law",
      pic: "https://i.pravatar.cc/150?img=9",
      availability: ["Mon 9AM", "Fri 3PM"],
    },
    {
      id: 10,
      name: "Ava Scott",
      specialty: "Environmental Law",
      pic: "https://i.pravatar.cc/150?img=10",
      availability: ["Tue 11AM", "Thu 1PM"],
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    experience_years: "",
    password: "",
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData((prev) => ({ ...prev, [name]: files[0] }));
    else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await getLawyers();
        const { status, data } = await response.data;

        if (status === "OK") {
          setLawyers(data);
        } else {
          setLawyers([]);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchLawyers();
  }, [lawyers]);

  // Lawyer send account request approval
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("specialty", formData.specialty);
      data.append("experience_years", formData.experience_years);
      // data.append('documents', formData.specialty)

      const response = await lawyerRequestAccount(data);
      const resData = await response.data;

      if (resData.status === "success") {
        toast.success(
          resData.message || "Registration submitted successfully!"
        );
        setShowLawyerModal(false);
        setFormData({
          name: "",
          email: "",
          specialty: "",
          phone: "",
          password: "",
          experience_years: "",
          documents: null,
        });
      } else {
        console.log(resData.message || "Failed to submit registration.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error submitting form");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-gray-800 sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-500">LawConnect</div>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="home"
              smooth
              duration={800}
              className="cursor-pointer hover:text-blue-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="services"
              smooth
              duration={800}
              className="cursor-pointer hover:text-blue-400"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="about"
              smooth
              duration={800}
              className="cursor-pointer hover:text-blue-400"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth
              duration={800}
              className="cursor-pointer hover:text-blue-400"
            >
              Contact
            </Link>
          </li>
        </ul>
        <NavLink to="/login">
          <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-lg">
            Login
          </button>
        </NavLink>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-between p-12 md:p-24"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-5xl font-bold">
            Connecting You With Expert Lawyers
          </h1>
          <p className="text-gray-300 text-lg">
            Book appointments and communicate directly with experienced lawyers
            across all specialties.
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
              onClick={() => alert("Get Started clicked")}
            >
              Get Started
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
              onClick={() => setShowLawyerModal(true)}
            >
              Become a Lawyer
            </button>
          </div>
        </motion.div>
        <motion.img
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
          alt="Hero"
          className="mt-8 md:mt-0 md:w-1/2 h-150 rounded-xl shadow-lg"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* Lawyers Carousel */}
      <section id="services" className="p-12 md:p-24">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Lawyers</h2>
        <Slider {...sliderSettings}>
          {lawyers.map((lawyer) => (
            <div key={lawyer.id} className="p-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-xl shadow-lg text-center"
              >
                <img
                  src={lawyer.pic || implement}
                  alt={lawyer.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                <p className="text-gray-300 mb-4">{lawyer.specialty}</p>
                <p className="text-gray-300 mb-4">
                  Experince{" "}
                  {parseInt(lawyer.experience_years) > 1 ? "years" : "year"}
                </p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                  onClick={() => {
                    console.log(lawyer);
                    setSelectedLawyer(lawyer);
                  }}
                >
                  Check Availability
                </button>
              </motion.div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Lawyer Registration Modal */}
      <AnimatePresence>
        {showLawyerModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md relative"
            >
              <X
                className="absolute top-4 right-4 cursor-pointer text-gray-300"
                size={24}
                onClick={() => setShowLawyerModal(false)}
              />
              <h2 className="text-2xl font-bold mb-4">Become a Lawyer</h2>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-700 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-700 outline-none"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-700 outline-none"
                />
                <input
                  type="text"
                  name="specialty"
                  placeholder="Specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-700 outline-none"
                />
                <input
                  type="text"
                  name="experience_years"
                  placeholder="Experience Number"
                  value={formData.experience_years}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-700 outline-none"
                />
                {/* <input
                  type="text"
                  name="licenseNumber"
                  placeholder="License Number"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-700 outline-none"
                /> */}
                <input
                  type="file"
                  name="documents"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
                >
                  Submit Registration
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Availability Modal */}
      <AnimatePresence>
        {selectedLawyer && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-4">
                {selectedLawyer?.name}'s Availability
              </h3>
              <ul className="mb-6">
                {selectedLawyer?.availability &&
                  Object.entries(selectedLawyer.availability).map(
                    ([day, slots]) => (
                      <li key={day} className="mb-2">
                        <strong>{day}:</strong>
                        <ul className="ml-4 mt-1">
                          {slots.map((slot, i) => (
                            <li
                              key={i}
                              className="p-1 border-b border-gray-700"
                            >
                              {slot}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  )}
              </ul>

              <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold w-full mb-2">
                Book Appointment
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold w-full"
                onClick={() => setSelectedLawyer(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section id="about" className="p-12 md:p-24 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose LawConnect?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">Expert Lawyers</h3>
            <p>
              Connect with top-rated lawyers in all specialties for legal advice
              and case management.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">Easy Appointments</h3>
            <p>
              Book appointments directly with lawyers without admin assignment.
              Fully online and convenient.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
            <h3 className="text-2xl font-semibold mb-2">
              Secure Communication
            </h3>
            <p>
              Communicate safely with your lawyer using our built-in chat
              system.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="p-12 md:p-24 bg-gray-950 text-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 text-center">
            <h3 className="text-2xl font-semibold mb-2">Legal Consultation</h3>
            <p>Get professional advice and guidance from qualified lawyers.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 text-center">
            <h3 className="text-2xl font-semibold mb-2">Case Management</h3>
            <p>
              Manage your ongoing cases efficiently with the help of our
              lawyers.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 text-center">
            <h3 className="text-2xl font-semibold mb-2">Document Review</h3>
            <p>
              Lawyers can review contracts, agreements, and legal documents
              accurately.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 text-center">
            <h3 className="text-2xl font-semibold mb-2">Appointment Booking</h3>
            <p>Book appointments with lawyers instantly and securely online.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="p-12 md:p-24 bg-gray-900 text-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p>Email: support@lawconnect.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Legal Street, City</p>
            <p>Follow us on social media for updates and tips.</p>
          </div>
          <form className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
              rows={4}
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold w-full">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 bg-gray-950 text-gray-400">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img
              src="https://via.placeholder.com/100x50?text=LawConnect"
              alt="Logo"
              className="mb-4"
            />
            <p>Connecting clients with top lawyers easily and securely.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Services</h4>
            <ul className="space-y-1">
              <li>Legal Consultation</li>
              <li>Case Management</li>
              <li>Document Review</li>
              <li>Appointment Booking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <ul className="space-y-1">
              <li>Our Story</li>
              <li>Team</li>
              <li>Testimonials</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <ul className="space-y-1">
              <li>Email: support@lawconnect.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Legal Street, City</li>
              <li>Follow us on social media</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-6">
          &copy; 2025 LawConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
