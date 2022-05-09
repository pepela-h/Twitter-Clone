import React, { useEffect, useState } from "react";
import Credentials from "./Credentials";
import Experience from "./Experience";
import AccountVerify from "./AccountVerify";
import Verification from "./Verification";
import Password from "./Password";
import ProfilePic from "./ProfilePic";
import Bio from "./Bio";
import Username from "./Username";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.username) {
      navigate("/");
    }
  }, [navigate, user?.username]);

  const [level, setLevel] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    DOB: "",
    password: "",
    avatar: "",
    bio: "",
    username: "",
  });
  return (
    <>
      {level === 1 ? (
        <Credentials
          setLevel={setLevel}
          formData={formData}
          setFormData={setFormData}
        />
      ) : level === 2 ? (
        <Experience setLevel={setLevel} />
      ) : level === 3 ? (
        <AccountVerify
          setLevel={setLevel}
          formData={formData}
          setFormData={setFormData}
        />
      ) : level === 4 ? (
        <Verification setLevel={setLevel} />
      ) : level === 5 ? (
        <Password
          setLevel={setLevel}
          formData={formData}
          setFormData={setFormData}
        />
      ) : level === 6 ? (
        <ProfilePic
          level={level}
          setLevel={setLevel}
          formData={formData}
          setFormData={setFormData}
        />
      ) : level === 7 ? (
        <Username
          level={level}
          setLevel={setLevel}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <Bio
          setLevel={setLevel}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default Index;
