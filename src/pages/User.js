import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect, useReducer, useState } from "react";
import Article from "../components/Article";
import { logged } from "../components/atoms/logged";
import CreateArticle from "../components/CreateArticle";
import { API } from "../utils/variables";

function User(props) {
  const token = Cookies.get("token");
  const [data, setData] = useState();
  const loggedd = useAtomValue(logged);
  const [recucerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const isLogged = useAtomValue(logged);

  useEffect(() => {
    loggedd &&
      fetch(API + "member-data", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          setData(res.user);
        });
  }, [loggedd, setData, token, recucerValue]);

  // console.log(data)
  return (
    <div className="flex flex-col justify-center gap-2">
		  {isLogged && <CreateArticle forceUpdate={forceUpdate} />}
      {data && (
        <>
          <h1 className="text-2xl font-bold text-center mt-5">{data.email}</h1>

			

          <ul>
            {data.articles.map((item) => (
              <Article
                key={item.id}
                article={item}
                allowEdit={true}
                forceUpdate={forceUpdate}
              />
            ))}
          </ul>
          <h1 className="text-center mt-2"> user_id = {data.id} </h1>
        </>
      )}
    </div>
  );
}

export default User;
