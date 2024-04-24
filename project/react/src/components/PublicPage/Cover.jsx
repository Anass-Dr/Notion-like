function Cover({ src }) {
    const styles = src
        ? { backgroundImage: `url(${src})` }
        : {
              backgroundColor: "#FFE53B",
              backgroundImage:
                  "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)",
          };
    return <div style={styles} id="public-page__cover"></div>;
}

export default Cover;
