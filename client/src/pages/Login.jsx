import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import loginImage from "../assets/login.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { fetchUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

      if (data.success) {
        toast.success("Login Successful");

        await fetchUser();

        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/client/dashboard");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-6">VaultPay</h1>

          <p className="text-xl">Secure Financial Core Platform</p>

          <div className="mt-12">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="w-96 mx-auto"
            />
          </div>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-slate-800">Welcome Back </h2>

          <p className="mt-2 text-slate-500">Login to continue</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold">Email</label>

              <div className="flex items-center rounded-xl border bg-slate-50 px-4">
                <Mail size={18} className="text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <div className="flex items-center rounded-xl border bg-slate-50 px-4">
                <Lock size={18} className="text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 text-white"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
