import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useGet';
import Cookies from 'js-cookie';

function ArticleDetails(props) {

    const articleId = useParams().articleId;

    const data = useFetch(`http://localhost:3000/articles/${articleId}`, Cookies.get('token'));
    console.log(data);

    return (
        <>
            <h1>Page de détails : {articleId}</h1>
            {
                data && (
                    <div>
                        <h1>{data[0].title} : {data[0].price}</h1>
                        <p>{data[0].content}</p>
                        <p>{data[0].user.email}</p>

                    </div>
                )
            }
        </>
    );
}

export default ArticleDetails;