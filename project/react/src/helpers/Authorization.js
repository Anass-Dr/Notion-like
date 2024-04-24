export default class Authorize {
    constructor(auth, params, pages, nav, changeActivePage) {
        this.auth = auth;
        this.params = params;
        this.pages = pages;
        this.redirect = nav;
        this.changePage = changeActivePage;
    }

    handle() {
        if (!this.auth.user) return this.redirect("/login");

        const userName = this.auth.user.username.toLowerCase();
        let currPage = this.pages.filter((page) => page.active)[0];

        if (!this.params.username && !this.params.pageName) {
            this.changeURI(userName, currPage);
        } else {
            if (this.params.username) {
                if (this.params.username !== userName) return this.redirect("/login");
            }
            if (this.params.pageName) {
                const result = this.pages.filter(
                    (page) =>
                        page.title.toLowerCase().split(" ").join("-") ===
                        this.params.pageName
                );
                if (result.length == 0) return this.redirect("/Not-found");
                else if (!result[0].active) this.changePage(result[0].id);
            }
            this.changeURI(userName, currPage);
        }
    }

    changeURI(userName, currPage) {
        const pageURI = currPage.title.toLowerCase().split(" ").join("-");
        window.history.pushState({}, "", `/${userName}/${pageURI}`);
    }
}
