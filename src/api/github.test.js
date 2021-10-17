const rewire = require("rewire")
const github = rewire("./github")
const getUsersState = github.__get__("getUsersState")
// @ponicode
describe("github.fetchUser", () => {
    test("0", async () => {
        await github.fetchUser("username")
    })

    test("1", async () => {
        await github.fetchUser(123)
    })

    test("2", async () => {
        await github.fetchUser("user_name")
    })

    test("3", async () => {
        await github.fetchUser("user123")
    })

    test("4", async () => {
        await github.fetchUser("user-name")
    })

    test("5", async () => {
        await github.fetchUser(undefined)
    })
})

// @ponicode
describe("github.fetchRepository", () => {
    test("0", async () => {
        await github.fetchRepository("commit d3f6bf9bcee016096098e88aced2d5afdc68c424\r\nAuthor: Edna Rice <Shanie.Pagac@yahoo.com>\r\nDate: Wed Jul 28 2021 22:05:49 GMT+0200 (Central European Summer Time)\r\n\r\n    bypass cross-platform hard drive\r\n", "Jean-Philippe")
    })

    test("1", async () => {
        await github.fetchRepository("commit e6d1117d97e7cc250166120d2eee1c2662c58150\r\nAuthor: Keagan Cole <Crystal69@gmail.com>\r\nDate: Thu Jul 29 2021 05:36:16 GMT+0200 (Central European Summer Time)\r\n\r\n    override wireless alarm\r\n", "Edmond")
    })

    test("2", async () => {
        await github.fetchRepository("commit e6d1117d97e7cc250166120d2eee1c2662c58150\r\nAuthor: Keagan Cole <Crystal69@gmail.com>\r\nDate: Thu Jul 29 2021 05:36:16 GMT+0200 (Central European Summer Time)\r\n\r\n    override wireless alarm\r\n", "Pierre Edouard")
    })

    test("3", async () => {
        await github.fetchRepository("commit 380428b6b61b64631d941b27db3e91df27bfff8e\r\nAuthor: Lera Swift <Lela.Lubowitz@yahoo.com>\r\nDate: Wed Jul 28 2021 23:21:29 GMT+0200 (Central European Summer Time)\r\n\r\n    reboot digital application\r\n", "Pierre Edouard")
    })

    test("4", async () => {
        await github.fetchRepository("commit d3f6bf9bcee016096098e88aced2d5afdc68c424\r\nAuthor: Edna Rice <Shanie.Pagac@yahoo.com>\r\nDate: Wed Jul 28 2021 22:05:49 GMT+0200 (Central European Summer Time)\r\n\r\n    bypass cross-platform hard drive\r\n", "George")
    })

    test("5", async () => {
        await github.fetchRepository(undefined, undefined)
    })
})

// @ponicode
describe("getUsersState", () => {
    test("0", async () => {
        await getUsersState(["username", "user123", "user name"])
    })

    test("1", async () => {
        await getUsersState(["user123", "username", "user_name"])
    })

    test("2", async () => {
        await getUsersState(["user name", "username", "user123"])
    })

    test("3", async () => {
        await getUsersState(["user-name", "username", "user name"])
    })

    test("4", async () => {
        await getUsersState(["user_name", 123, "user-name"])
    })

    test("5", async () => {
        await getUsersState(undefined)
    })
})

// @ponicode
describe("github.fetchUserRepositories", () => {
    test("0", async () => {
        await github.fetchUserRepositories("http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
    })

    test("1", async () => {
        await github.fetchUserRepositories("https://accounts.google.com/o/oauth2/revoke?token=%s")
    })

    test("2", async () => {
        await github.fetchUserRepositories("ponicode.com")
    })

    test("3", async () => {
        await github.fetchUserRepositories("www.google.com")
    })

    test("4", async () => {
        await github.fetchUserRepositories("https://croplands.org/app/a/reset?token=")
    })

    test("5", async () => {
        await github.fetchUserRepositories(undefined)
    })
})

// @ponicode
describe("github.fetchUserRepository", () => {
    test("0", async () => {
        await github.fetchUserRepository("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
    })

    test("1", async () => {
        await github.fetchUserRepository(undefined)
    })
})
