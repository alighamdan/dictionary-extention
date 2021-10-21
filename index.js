const result = document.getElementById("result");
const button = document.getElementById("btn");
const text = document.getElementById("sentence");

button.addEventListener("click", async (event) => {
  if (!text.value) {
    return;
  }
  fetch(
    `https://makeitsupportapi.aligame360.repl.co/urban?text=${text.value}`,
    {
      method: "GET",
    }
  )
    .then(async (response) => {
      return response.json();
    })
    .then(async function (data) {
      if (!data.list) {
        result.value = `No Result Found Try With Another Sentence`;
      }
      let random = data.list[Math.floor(Math.random() * data.list.length)];
      result.innerHTML = `<b><a href="${
        random.permalink
      }">Definition:</a></b><br />${random.definition}${
        random.example
          ? `<br /><br /><b>Example:</b><br /> ${random.example}`
          : ""
      }${
        (random.sound_urls.length > 0 && random.sound_urls.toString().includes(`api.twilio.com`))
          ? `<br /> <br /> Audios:${random.sound_urls.filter(e=>e.includes(`api.twilio.com`)).map(e=>{
            return `<audio src="${e}" controls></audio>`
          }).join("<br />")}`
          : ""
      }`;
    })
    .catch((error) => {
      result.value = `Your Country Not Supported!`;
    });
});