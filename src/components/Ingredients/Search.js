import React, { useEffect, useState, useRef } from "react";
import { useFetch } from "../../hooks/http";
import { Card } from "../UI/Card";
import { ErrorModal } from "../UI/ErrorModal";
import "./Search.css";

export const Search = React.memo(({ onLoadIngredient }) => {
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  const { isLoading, errorMsg, sendRequest, data, clear } = useFetch();

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        // dispatchHttp({ type: "SEND" });
        // const query =
        //   enteredFilter.length === 0
        //     ? ""
        //     : `?orderBy="ingredient/title"&equalTo="${enteredFilter}"`;
        if (enteredFilter.trim() === inputRef.current.value.trim()) {
          sendRequest(
            "https://react-hooks-practice-d10b5-default-rtdb.firebaseio.com/ingredient.json",
            "GET"
          );
          console.log("RESPONSEDATA:");
          // const response = await fetch(
          //   "https://react-hooks-practice-d10b5-default-rtdb.firebaseio.com/ingredient.json"
          // );
          // if (!response.ok) {
          //   throw new Error("Failed to fetch!");
          // }

          // const responseData = await response.json();

          // const loadedData = Object.entries(data).map((entry) => {
          //   return {
          //     id: entry[0],
          //     title: entry[1].title,
          //     amount: entry[1].amount,
          //   };
          // });

          // if (enteredFilter.trim()) {
          //   const filteredData = loadedData.filter((data) =>
          //     data.title
          //       .toLowerCase()
          //       .includes(enteredFilter.trim().toLowerCase())
          //   );

          //   onLoadIngredient(filteredData);
          // } else {
          //   onLoadIngredient(loadedData);
          // }
        }
      };

      fetchData();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !errorMsg && data) {
      const loadedData = Object.entries(data).map((res) => {
        return {
          id: res[0],
          title: res[1].title,
          amount: res[1].amount,
        };
      });

      if (enteredFilter.trim()) {
        const filteredData = loadedData.filter((data) =>
          data.title.toLowerCase().includes(enteredFilter.trim().toLowerCase())
        );

        onLoadIngredient(filteredData);
      } else {
        onLoadIngredient(loadedData);
      }
    }
  }, [data, isLoading, errorMsg, enteredFilter, onLoadIngredient]);

  return (
    <section className="search">
      {errorMsg && <ErrorModal onClose={clear}>{errorMsg}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
            ref={inputRef}
          />
        </div>
      </Card>
    </section>
  );
});
