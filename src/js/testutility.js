import Chance from "chance";
import { CreateComment, CreatePost, CreateUser } from "./create";

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const returnRandomNumber = (dataset) => {
  const random = chance.integer({ min: 0, max: dataset.length - 1 });
  return random;
};

const returnRandom = (dataset) => {
  const random = chance.integer({ min: 0, max: dataset.length - 1 });
  return dataset[random];
};

const returnRandomData = ({ type, amount }) => {
  let data = [];

  for (let i = 0; i < amount; i++) {
    switch (type) {
      case "users":
        data.push({
          _id: `u_${chance.fbid()}`,
          name: chance.name(),
        });
        break;
      case "images":
        data.push({
          _id: `i_${chance.fbid()}`,
          imageSrc: `https://picsum.photos/50/50?random=${chance.integer({
            min: 1,
            max: 155,
          })}`,
        });
        break;
      case "posts":
        data.push({
          _id: `p_${chance.fbid()}`,
          content: chance.paragraph({ sentences: 2 }),
          updatedOn: randomDate(new Date(2012, 0, 1), new Date()),
        });
        break;
      case "comments":
        data.push({
          _id: `c_${chance.fbid()}`,
          content: chance.paragraph({ sentences: 1 }),
          updatedOn: new Date(),
        });
        break;
    }
  }

  return data;
};

export const createTestData = () => {
  return new Promise(async (resolved) => {
    let userData = returnRandomData({ type: "users", amount: 10 });
    let postData = returnRandomData({ type: "posts", amount: 10 });
    let imageData = returnRandomData({ type: "images", amount: 10 });
    let commentData = returnRandomData({ type: "comments", amount: 10 });

    const users = [];
    const images = [];
    const comments = [];
    const posts = [];

    // assign author to comments
    commentData = commentData.map((x) => {
      x.refId =
        chance.coin() > "heads"
          ? returnRandom(postData)._id
          : returnRandom(commentData)._id;
      x.authorId = returnRandom(userData)._id;
      return x;
    });

    //--------------------------------------------
    userData.forEach((x) => {
      const { name } = x;
      const user = {
        ...x,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "Smith",
        username: name.replace(/\s+/g, "_").toLowerCase(),
        imageId: returnRandom(imageData)._id,
        emotionImageSrc:
          chance.coin() > "heads"
            ? {
                happy: "/images/emotions/happy-test.png",
                anger: "/images/emotions/anger-test.png",
                sad: "/images/emotions/sad-test.png",
                shocked: "/images/emotions/shocked-test.png",
              }
            : null,
      };

      users.push(user);
    });
    //--------------------------------------------

    //--------------------------------------------
    imageData.forEach((x) => {
      const { _id, imageSrc } = x;
      const authorId = returnRandom(userData)._id;
      const comments = commentData.filter((x) => x.refId === _id);

      const image = {
        _id,
        version: 0,
        imageSrc,
        comments: {
          total: comments.length,
          myComments: {
            count: comments
              .filter((x) => x.authorId === authorId)
              .map((x) => x._id).length,
            cids: comments
              .filter((x) => x.authorId === authorId)
              .map((x) => x._id),
          },
          allComments: {
            count: comments
              .filter((x) => x.authorId !== authorId)
              .map((x) => x._id).length,
            cids: comments
              .filter((x) => x.authorId !== authorId)
              .map((x) => x._id),
          },
        },
        metadata: {},
      };

      images.push(image);
    });
    //--------------------------------------------

    //--------------------------------------------
    commentData.forEach((x) => {
      const { _id, authorId } = x;
      const _comments = commentData.filter((x) => x.refId === _id);

      const comment = {
        ...x,
        comments: {
          total: _comments.length,
          myComments: {
            count: 0,
            cids: [],
          },
          allComments: {
            count: _comments
              .filter((x) => x.authorId !== authorId)
              .map((x) => x._id).length,
            cids: _comments
              .filter((x) => x.authorId !== authorId)
              .map((x) => x._id),
          },
        },
        emotes: {
          myEmote: chance.coin() > "heads" ? "like" : "dislike",
          like: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          dislike: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          angry: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          sad: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          wink: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
        },
        metadata: {},
      };

      comments.push(comment);
    });
    //--------------------------------------------

    //--------------------------------------------
    postData.forEach((x) => {
      const { _id } = x;
      const authorId = returnRandom(userData)._id;
      const _comments = commentData.filter((x) => x.refId === _id);

      const post = {
        ...x,
        authorId,
        comments: {
          total: _comments.length,
          myComments: {
            count: _comments
              .filter((x) => x.authorId === authorId)
              .map((x) => x._id).length,
            cids: _comments
              .filter((x) => x.authorId === authorId)
              .map((x) => x._id),
          },
          allComments: {
            count: _comments
              .filter((x) => x.authorId !== authorId)
              .map((x) => x._id).length,
            cids: _comments
              .filter((x) => x.authorId !== authorId)
              .map((x) => x._id),
          },
        },
        emotes: {
          myEmote: chance.coin() > "heads" ? "plus" : "minus",
          plus: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          minus: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          like: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          dislike: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          angry: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          sad: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
          wink: {
            count: returnRandomNumber(userData),
            userIds: [],
          },
        },
      };

      posts.push(post);
    });
    //--------------------------------------------

    resolved({ users, images, comments, posts });
  });
};
