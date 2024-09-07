// src/components/Signup.tsx
import React, {useState} from "react";
import axiosInstance from "../utils/axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const Signup = () => {
  const {login} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/auth/signup`, {
        email,
        password,
        firstName,
        lastName,
      });
      login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
