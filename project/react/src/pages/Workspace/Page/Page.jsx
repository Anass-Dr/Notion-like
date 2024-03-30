import { useContext } from "react";
import { WorkspaceContext } from "../../../context/WorkspaceContext";
import PageImage from "../../../components/PageImage";
import Editor from "../../../Editor/Editor";
import "./page.css";

function Page() {
    const { data, saveChange } = useContext(WorkspaceContext);
    const currPage = data.filter((page) => page.active)[0];

    const handleTitleChange = (e) => {
        const title = e.currentTarget.textContent;
        if (title !== currPage.title) saveChange("title", title);
    };

    return (
        <main>
            <PageImage src={currPage.cover} />

            <div className="head">
                <span
                    onBlur={handleTitleChange}
                    className="title"
                    contentEditable
                >
                    {currPage.title}
                </span>
            </div>
            <div id="editorjs" className="content">
                <Editor blocksData={currPage.blocks} saveChange={saveChange} />
            </div>
        </main>
    );
}

export default Page;
