"use client";
import { notify } from "@/components/common/Notification";
import React, { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaEarthAfrica, FaFacebookF } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const FormContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const Contacts = [
    {
      icon: <FaPhoneAlt />,
      text: "+024 113 114 115",
    },
    {
      icon: <FaEarthAfrica />,
      text: "https://fricks.vercel.app",
    },
    {
      icon: <FaMapMarkerAlt />,
      text: "Đường D1, Đ. D1, Long Thạnh Mỹ, TP.Thủ Đức",
    },
  ];

  const ContactsIcon = [
    {
      icon: <FaFacebookF size={18} />,
      url: "https://www.linkedin.com/in/duongbao0803/",
    },
    {
      icon: <AiFillInstagram size={20} />,
      url: "https://www.instagram.com/fricks1909/",
    },
    {
      icon: <IoMdMail size={20} />,
      url: "mailto:fricks.customerservice@gmail.com",
    },
  ];

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.title && formData.message) {
      notify("success", "Gửi biểu mẫu thành công", 3);
      setFormData({
        name: "",
        email: "",
        title: "",
        message: "",
      });
    } else {
      notify("warning", "Vui lòng nhập đầy đủ thông tin", 3);
    }
  };

  return (
    <section className="grid grid-cols-1 items-center justify-center gap-3 lg:grid-cols-3">
      <div className="flex h-[500px] flex-col items-center justify-center bg-gray-100 p-8 pb-[116px] pl-[90px] pr-[30px] pt-[120px] lg:col-span-1">
        <div className="space-y-6 text-gray-700">
          {Contacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="rounded-full border border-black p-2 text-lg text-black transition-all duration-500 hover:border-primary hover:bg-primary hover:text-white">
                {contact.icon}
              </div>
              <p className="font-normal">{contact.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center pl-[30px] pr-[90px]">
          <h4 className="mb-4 text-2xl font-semibold tracking-widest">
            Theo Dõi
          </h4>
          <div className="flex space-x-4">
            {ContactsIcon.map((contact, index) => (
              <a
                key={index}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-all duration-500 hover:text-primary"
              >
                {contact.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[500px] bg-gray-100 p-8 px-[110px] py-[50px] lg:col-span-2">
        <h3 className="mb-6 text-2xl font-semibold">KẾT NỐI VỚI CHÚNG TÔI</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent px-4 py-2 ring-1 ring-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent px-4 py-2 ring-1 ring-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="my-7">
            <input
              type="text"
              name="title"
              placeholder="Tiêu đề"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent px-4 py-2 ring-1 ring-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Nội dung"
              className="w-full bg-transparent px-4 py-2 ring-1 ring-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button type="submit" className="button-hire">
            GỬI
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormContact;
