import React from 'react';

function ArticleTags({bgColor, article, ifTrue, ifFalse}) {
    return (
        <p className={`flex items-center justify-center px-2 py-1 rounded-xl ${bgColor} w-fit text-xs text-white font-bold`}>
            {article ? ifTrue : ifFalse}
        </p>

    );
}

export default ArticleTags;