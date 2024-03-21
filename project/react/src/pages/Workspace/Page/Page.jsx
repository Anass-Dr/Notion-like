import { useContext } from "react";
import { WorkspaceContext } from "../../../context/WorkspaceContext";
import PageImage from "../../../components/PageImage";
import Editor from "../../../Editor/Editor";
import "./page.css";

function Page() {
    const { data, saveChange } = useContext(WorkspaceContext);
    const currPage = data.filter((page) => page.active)[0];

    const handleTitleChange = (e) => {
        saveChange("title", e.currentTarget.textContent);
    };

    return (
        <main>
            {currPage.cover && <PageImage src={currPage.cover} />}
            <div className="head">
                <span
                    onKeyUp={handleTitleChange}
                    className="title"
                    contentEditable
                >
                    {currPage.title}
                </span>
            </div>
            <div id="editorjs" className="content">
                <Editor blocks={currPage.blocks} saveChange={saveChange} />
            </div>
        </main>
    );
}

export default Page;
