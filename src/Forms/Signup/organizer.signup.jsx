import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function OrganizerSignup() {

      const [organizer, setHOrganizer] = useState({
            contact: "",
            password: ""
      })

      // const token = localStorage.getItem("access-token")

      const navigateTo = useNavigate();

      const handleChange = (e) => {
            e.preventDefault();
            setHOrganizer({ ...organizer, [e.target.name]: e.target.value });
            console.log(organizer);
      }


      const handleSubmit = (e) => {
            e.preventDefault();

            axios({
                  url: "http://localhost:5050/organizer/signup",
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  data: {
                        contact: organizer.contact,
                        password: organizer.password
                  }
            })
                  .then(res => {
                        const data = res.data.data;

                        setHOrganizer({ ...organizer, data });
                        console.log({ hall_after_update: organizer });
                        navigateTo("/organizer/signin");

                  })
                  .catch(error => {
                        alert("there was a problem please try again");
                        console.log({ error: error });
                        navigateTo("/organizer/signup");
                  });
            console.log(organizer);

            return () => {

            }
      }


      return (
            <div>
                
                  <form className=" flex flex-col transform translate-x-full translate-y-20 mb-8 p-4 w-1/3" onSubmit={handleSubmit} autoComplete="off">

                        <div className="bg-grey-lighter flex flex-col">
                              <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                                          <h1 className="mb-8 text-3xl text-center">Create Account</h1>
                                          <input
                                                type="number"
                                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                                name="contact"
                                                onChange={handleChange}
                                                value={organizer.contact}
                                                required
                                                placeholder="contact: 6********" />

                                          <input
                                                type="password"
                                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                                name="password"
                                                onChange={handleChange}
                                                value={organizer.password}
                                                required
                                                placeholder="Password" />


                                          <button
                                                type="submit"
                                                className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1"
                                          >Let's Go</button>


                                    </div>
                              </div>
                        </div>
                  </form>

            </div>
      )
}

export default OrganizerSignup
