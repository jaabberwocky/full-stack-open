const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("totalLikes", () => {
  test("when list has only one blog, return likes of that blog", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("return 0 when no blogs are provided", () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test("return correct value with multiple blogs", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "asddasd123123",
        title: "Go To Statement Considered Harmful 2",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 15,
        __v: 0,
      },
      {
        _id: "91209dlasd9adsl;",
        title: "Go To Statement Considered Harmful 3",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(30);
  });
});

describe("favouriteBlog", () => {
  test("empty returns empty object", () => {
    const blogs = [];

    const result = listHelper.favouriteBlog(blogs);
    expect(result).toEqual({});
  });

  test("single blog returns single blog", () => {
    const blogs = [
      {
        _id: "91209dlasd9adsl;",
        title: "Go To Statement Considered Harmful 3",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        __v: 0,
      },
    ];

    const result = listHelper.favouriteBlog(blogs);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful 3",
      author: "Edsger W. Dijkstra",
      likes: 10,
    });
  });
  test("return correct blog with multiple blogs", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "asddasd123123",
        title: "Go To Statement Considered Harmful 2",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 15,
        __v: 0,
      },
      {
        _id: "91209dlasd9adsl;",
        title: "Go To Statement Considered Harmful 3",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        __v: 0,
      },
    ];

    const favBlog = {
      title: "Go To Statement Considered Harmful 2",
      author: "Edsger W. Dijkstra",
      likes: 15,
    };

    const result = listHelper.favouriteBlog(blogs);
    expect(result).toEqual(favBlog);
  });
});

describe("mostBlogs", () => {
  test("correct author is returned with multiple blogs", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "asddasd123123",
        title: "Go To Statement Considered Harmful 2",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 15,
        __v: 0,
      },
      {
        _id: "91209dlasd9adsl;",
        title: "Go To Statement Considered Harmful 3",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        __v: 0,
      },
    ];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 3,
    });
  });

  test("empty obj is returned with zero blogs", () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({});
  });

  test("right obj is returned with multiple blogs with different authors", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "ASDF",
        author: "James Arthur",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "asddasd123123",
        title: "Go To Statement Considered Harmful 2",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 15,
        __v: 0,
      },
      {
        _id: "91209dlasd9adsl;",
        title: "Go To Statement Considered Harmful 3",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        __v: 0,
      },
    ];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 2 });
  });
});

describe("mostLikes", () => {
  test("correct author and likes is returned with multiple blogs", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "asddasd123123",
        title: "Go To Statement Considered Harmful 2",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 15,
        __v: 0,
      },
      {
        _id: "91209dlasd9adsl;",
        title: "Go To Statement Considered Harmful 3",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        __v: 0,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 30,
    });
  });

  test("empty obj is returned with zero blogs", () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({});
  });

  test("right obj is returned with multiple blogs with different authors", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "ASDF",
        author: "James Arthur",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "asddasd123123",
        title: "Go To Statement Considered Harmful 2",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 15,
        __v: 0,
      },
      {
        _id: "91209dlasd9adsl;",
        title: "Go To Statement Considered Harmful 3",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        __v: 0,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 25 });
  });
});
