import React, { useState } from "react";
import { supabase } from '@/pages/superbase';

const Wishes = () => {
  const [wish, setWish] = useState({
    Name: '',
    Relation: '',
    Wishis: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWish((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Name, Relation, Wishis } = wish;

    const { data, error } = await supabase
      .from('users')
      .insert([{ name: Name, relation: Relation, wish: Wishis }]);

    if (error) {
      console.error(error);
      setStatus('Error adding wish.');
    } else {
      setStatus('Wish added successfully!');
      setWish({
        Name: '',
        Relation: '',
        Wishis: ''
      });
    }
  };

  return (
    <div className="w-full justify-center items-center">
      <div className="flex md:w-1/2 w-full pt-10 mb-20">
        <form className="px-4 pb-5 border-2 border-[#C8AF6B] rounded text-center w-full m-4" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold">Want to add your wish</h2>
          <input
            type="text"
            name="Name"
            value={wish.Name}
            onChange={handleChange}
            placeholder="Your Name"
            className="form-control my-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            name="Relation"
            value={wish.Relation}
            onChange={handleChange}
            placeholder="Relation"
            className="form-control my-2 p-2 border border-gray-300 rounded w-full"
          />
          <textarea
            name="Wishis"
            value={wish.Wishis}
            onChange={handleChange}
            placeholder="Your Message"
            className="form-control my-2 p-2 border border-gray-300 rounded w-full"
          ></textarea>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-[#C8AF6B] py-2 px-3 rounded-[10px_0px] text-white flex items-center text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Wishes;
