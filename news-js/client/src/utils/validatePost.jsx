const validatePost = (name, value) => {
  const err = {};

  switch (name) {
    case "content":
      if (!value) {
        err[name] = "Please enter a content.";
      }
      break;
    case "category":
      if (!value) {
        err[name] = "Please select a Category.";
      }
      break;
    case "linkName":
      if (!value) {
        err[name] = "Please enter a name reference.";
      }
      break;
    case "linkUrl":
      if (!value) {
        err[name] = "Please enter a url reference.";
      } else if (!validateUrl(value)) {
        err[name] = "Url format is incorrect.";
      }
      break;

    default:
      break;
  }

  return err;
};

function validateUrl(url) {
  const regex = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  );
  return regex.test(url);
}

export default validatePost;
