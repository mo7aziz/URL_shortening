export async function shortenerURL(url) {
  const API = "https://spoo.me?url=";

  const requestHeaders = new Headers();
  requestHeaders.append("Accept", "application/json");

  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${API}${url}`, requestOptions);

    if (!response.ok) {
      swal({
        title: "Error",
        text: `${response.status}, Try again`,
        icon: "error",
      });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.text();

    return responseJson;
  } catch (error) {
    swal({
      title: "Error",
      text: "Failed to shortener the URL, Try again",
      icon: "error",
    });
    console.error(`Failed to fetch data: ${error}`);
  }
}
