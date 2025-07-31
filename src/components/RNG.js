import { useState, useEffect, useContext } from "react";
import { AccountContext } from "./Accounts";

export default () => {
  const [number, setNumber] = useState(null);

  const { getSession } = useContext(AccountContext);

  const fetchNumber = () => {

    getSession().then(async ({ headers }) => {

      const url = "https://6bqzawd0cj.execute-api.us-east-1.amazonaws.com/test/RNG";

      console.log("headers", headers);

      try {
        const res = await fetch(url, { headers })

        if (!res.ok) {
          throw new Error("HTTP ERROR")
        }

        const data = await res.json();
        setNumber(JSON.parse(data.body).randomNumber)
      } catch (err) {
        console.error("err", err)
        setNumber(0);
      }

    })

  }

  // Fetch once when the component mounts
  useEffect(() => {
    fetchNumber();
  }, []);

  return (
    <div>
      <p>Number: {number !== null ? number : "Loading..."}</p>
      <button onClick={fetchNumber}>Get New Number</button>
    </div>
  );
};