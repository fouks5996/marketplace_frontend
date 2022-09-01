import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { currentuser } from "./atoms/logged";
import { errorMessageValues, errorInput, errorMessage } from "./auth/errors";
import { API } from "../utils/variables";
import { logged } from "../components/atoms/logged";
import { Link } from "react-router-dom";

function Article({ article, allowEdit, forceUpdate }) {
  const [editing, setEditing] = useState(false);
  const current_user = useAtomValue(currentuser);
  const token = Cookies.get("token");

  const isLogged = useAtomValue(logged);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const deleteArticle = (id) => {
    fetch(`${API}/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      forceUpdate();
    });
  };

  const onSubmit = (data) => {
    fetch(`${API}/articles/${article.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ article: data }),
    })
      .then((response) => {
        forceUpdate();
        setEditing(false);
        return response.json();
      })
      .then((res) => {});
  };

  return (
    <div className="border border-black w-fit p-4 ">
      {!editing ? (
        <>
          <Link to={`/show/${article.id}`}>
            <h1> Titre : {article.title} </h1>
          </Link>
          <h1 className="max-w-[250px]">Content : {article.content}</h1>
          <h1 className="max-w-[250px]">prix : {article.price}</h1>
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[400px] flex flex-col gap-3 mb-2"
          >
            <div className="flex items-center gap-2">
              <p> Titre </p>
              <input
                defaultValue={article.title}
                className={`border h-10 pl-3 rounded-md  ${errorInput(
                  errors.titre
                )}`}
                type="text"
                {...register("title", errorMessageValues.titre)}
              />
              {errorMessage(errors.titre)}
            </div>
            <div className="flex items-center gap-2">
              <p> Content </p>
              <input
                defaultValue={article.content}
                className={`border h-10 pl-3 rounded-md  ${errorInput(
                  errors.content
                )}`}
                type="text"
                {...register("content", errorMessageValues.content)}
              />
              {errorMessage(errors.content)}
            </div>
            <div className="flex items-center gap-2">
              <p> Price </p>
              <input
                defaultValue={article.price}
                className={`border h-10 pl-3 rounded-md  ${errorInput(
                  errors.price
                )}`}
                type="number"
                {...register("price", errorMessageValues.price)}
              />
              {errorMessage(errors.price)}
            </div>
            <button
              className="py-2 px-4 rounded text-white bg-slate-800"
              type="submit"
            >
              Submit
            </button>
          </form>
        </>
      )}

      {allowEdit ? (
        current_user.id === article.user_id &&
        isLogged && (
          <>
            <p
              className="text-orange-500 cursor-pointer"
              onClick={() => setEditing(!editing)}
            >
              Editer
            </p>

            <p
              className="text-red-500 cursor-pointer"
              onClick={() => deleteArticle(article.id)}
            >
              Supprimer
            </p>
          </>
        )
      ) : (
        <h1> User : {article.user.email} </h1>
      )}
    </div>
  );
}

export default Article;
