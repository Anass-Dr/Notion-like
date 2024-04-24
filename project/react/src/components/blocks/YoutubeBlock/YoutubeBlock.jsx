function YoutubeBlock({ src }) {
    let videoId = "";
    if (src.includes("watch")) {
        videoId = src.slice(src.indexOf("v=") + 2);
    } else {
        videoId = src.split('/')[3];
    }

    return (
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    );
}

export default YoutubeBlock;
