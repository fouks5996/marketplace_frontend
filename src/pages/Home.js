import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useReducer, useState } from "react";
import { logged } from "../components/atoms/logged";
import { API } from "../utils/variables";
import Article from "../components/article/Article";
import CreateArticle from "../components/CreateArticle";

function Home(props) {
  const [data, setData] = useState();
  const [recucerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetch(API + "articles")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res);
      });
  }, [setData, recucerValue]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello Home!</h1>
      

      <div className="flex gap-2">
        {data &&
          data.map((article) => (
            <Article
              key={article.id}
              article={article}
              forceUpdate={forceUpdate}
              allowEdit={false}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
