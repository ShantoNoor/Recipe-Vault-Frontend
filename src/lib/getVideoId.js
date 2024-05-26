/**
 * examples for url
 * https://youtu.be/a8f9G8MVDSg
 * https://www.youtube.com/watch?v=a8f9G8MVDSg
 */

const getVideoId = (url) => {
  const videoId = url.split("/").at(-1);

  if (videoId.includes("watch?v=")) {
    return videoId.split("watch?v=").at(-1);
  }

  return videoId;
};

// test
// console.log(getVideoId("https://youtu.be/a8f9G8MVDSg"));
// console.log(getVideoId("https://www.youtube.com/watch?v=a8f9G8MVDSg"));

export default getVideoId;
