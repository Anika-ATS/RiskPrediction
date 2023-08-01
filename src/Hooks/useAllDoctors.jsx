import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Providers/AuthProvider";
const useAllDoctors = () => {
  const [AllDoc, setAllDoc] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDoctor, setIsDoctor] = useState(null);
  const {user} = useContext(AuthContext);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://glycemist-server.onrender.com/doctors?email=${user?.email}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setAllDoc(data.alldoctorsapproved);
        setIsDoctor(data.isDoctor.doctor);
        // console.log(AllDoc, data.isDoctor.doctor);
      })
      .catch(error => {
        console.log("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return {AllDoc, isLoading, isDoctor};
};

export default useAllDoctors;
