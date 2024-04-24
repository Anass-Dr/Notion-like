import PageImage from "../../../components/PageImage";
import Editor from "../../../Editor/Editor";
import "./page.css";

function Page({ currPage, saveChange }) {
    const handleTitleChange = (e) => {
        const title = e.currentTarget.textContent;
        if (title !== currPage.title) saveChange("title", title);
    };

    const handleBlocks = (blocks) => saveChange("blocks", blocks);

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
                <Editor
                    blocksData={currPage.blocks}
                    handleBlocks={handleBlocks}
                />
            </div>
        </main>
    );
}

export default Page;
