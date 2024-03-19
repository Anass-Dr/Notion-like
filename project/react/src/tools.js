import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "editorjs-table";
import Checklist from "@editorjs/checklist";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";

export const EDITOR_JS_TOOLS = {
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: "CNTL+SHIFT+O",
        config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
        },
    },
    header: {
        class: Header,
        inlineToolbar: ["link"],
    },
    list: {
        class: List,
        inlineToolbar: true,
    },
    table: {
        class: Table,
        inlineToolbar: true,
        config: {
            rows: 2,
            cols: 3,
        },
    },
    checklist: {
        class: Checklist,
        inlineToolbar: true,
    },
    image: {
        class: ImageTool,
        config: {
            endpoints: {
                byFile: "http://localhost:8008/uploadFile",
                byUrl: "http://localhost:8008/fetchUrl",
            },
        },
    },
    linkTool: {
        class: LinkTool,
        config: {
            endpoint: "http://localhost:8008/fetchUrl",
        },
    },
};
