import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { endpoint } from "../../config/fetch";
import Cover from "../../components/PublicPage/Cover";
import BlockManager from "../../components/PublicPage/BlockManager";
import "./PublicPage.css";

function PublicPage() {
    const [page, setPage] = useState({});
    const { token } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        const getPage = async () => {
            const res = await fetch(`${endpoint}/public-pages/${token}`);
            const result = await res.json();
            if (res.status == 200) setPage(result.data);
            if (res.status === 404) nav('/Not-found');
        };
        getPage();
    }, [token, nav]);

    return (
        <div id="public-page">
            <Cover src={page.cover} />
            <div id="public-page__content">
                <div id="public-page__head">
                    <span id="public-page__title">{page.title}</span>
                </div>
                {page.blocks &&
                    page.blocks.map((block, indx) => (
                        <BlockManager key={indx} block={block} />
                    ))}
            </div>
        </div>
    );
}

export default PublicPage;
