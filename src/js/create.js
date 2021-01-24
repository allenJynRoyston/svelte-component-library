import Chance from "chance";

//-----------------------------------------------------------
const permissionDefaults = {
  allowView: {
    friends: true,
    anybody: false,
  },
  allowShare: {
    friends: true,
    anybody: false,
  },
  allowComments: {
    friends: true,
    anybody: false,
  },
  allowEmotes: {
    friends: true,
    anybody: false,
  },
};

const commentDefaults = {
  total: null,
  myComments: {
    count: null,
    cids: null,
  },
  allComments: {
    count: null,
    cids: null,
  },
};

const emoteDefaults = {
  myEmote: null,
  like: {
    count: null,
    userIds: [],
  },
  dislike: {
    count: null,
    userIds: [],
  },
  angry: {
    count: null,
    userIds: [],
  },
  sad: {
    count: null,
    userIds: [],
  },
  wink: {
    count: null,
    userIds: [],
  },
};

const emotionImageSrcDefault = {
  happy: null,
  anger: null,
  sad: null,
  shocked: null,
};

const metadataDefaults = {
  description: "meta details",
};
//-----------------------------------------------------------

//-----------------------------------------------------------
const CreateUser = (user, indexdb) => {
  return new Promise(async (resolve) => {
    const {
      _id = `u_${chance.fbid()}`,
      firstName = null,
      lastName = null,
      username = null,
      imageId = null,
      emotionImageSrc,
    } = user;

    const newUser = {
      _id,
      username,
      firstName,
      lastName,
      imageId,
      emotionImageSrc: !!emotionImageSrc
        ? emotionImageSrc
        : emotionImageSrcDefault,
    };

    let id = await indexdb.add("users", newUser);

    console.log(`New user created: ${id}`);

    resolve({ id, user: newUser });
  });
};
//-----------------------------------------------------------

//-----------------------------------------------------------
const CreateImage = (image, indexdb) => {
  return new Promise(async (resolve) => {
    const {
      _id = `i_${chance.fbid()}`,
      imageSrc = null,
      comments,
      metadata,
    } = user;

    const newImage = {
      _id,
      version: 0,
      imageSrc,
      comments: !!comments ? comments : commentDefaults,
      metadata: !!metadata ? metadata : metadataDefaults,
    };

    let id = await indexdb.add("images", newImage);

    console.log(`New image created: ${id}`);

    resolve({ id, image: newImage });
  });
};
//-----------------------------------------------------------

//-----------------------------------------------------------
const CreateComment = (comment, indexdb) => {
  return new Promise(async (resolve) => {
    const {
      _id = `c_${chance.fbid()}`,
      refId = null,
      authorId = null,
      content = null,
      updatedOn = new Date(),
      permissions,
      comments,
      emotes,
      currentEmotion = null,
    } = comment;

    const newComment = {
      _id,
      refId,
      authorId,
      content,
      currentEmotion,
      updatedOn,
      version: 0,
      permissions: !!permissions ? permissions : permissionDefaults,
      comments: !!comments ? comments : commentDefaults,
      emotes: !!emotes ? emotes : emoteDefaults,
    };

    let id = await indexdb.add("comments", newComment);

    console.log(`New comment created: ${id}`);

    resolve({ id, comment: newComment });
  });
};
//-----------------------------------------------------------

//-----------------------------------------------------------
const CreatePost = (post, indexdb) => {
  return new Promise(async (resolve) => {
    const {
      _id = `p_${chance.fbid()}`,
      authorId = null,
      content = null,
      updatedOn = new Date(),
      permissions,
      comments,
      emotes,
      currentEmotion = null,
    } = post;

    const newPost = {
      _id,
      version: 0,
      content,
      currentEmotion,
      authorId,
      updatedOn,
      permissions: !!permissions ? permissions : permissionDefaults,
      comments: !!comments ? comments : commentDefaults,
      emotes: !!emotes ? emotes : emoteDefaults,
    };

    let id = await indexdb.add("posts", newPost);

    console.log(`New post created: ${id}`);

    resolve({ id, post: newPost });
  });
};
//-----------------------------------------------------------

export { CreateUser, CreateComment, CreatePost, CreateImage };
