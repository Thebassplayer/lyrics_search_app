const form = document.getElementById("form"),
  search = document.getElementById("search"),
  result = document.getElementById("result"),
  more = document.getElementById("more"),
  apiURL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  console.log(data);

  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  //! Option 1
  // let output = "";

  // data.data.forEach((song) => {
  //   output += `
  //   <li>
  //   <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //   <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //   </li>
  //   `;
  // });

  // result.innerHTML = `
  // <ul class="songs">
  // ${output}
  // </ul>
  // `;

  //! Option 2
  result.innerHTML = `
  <ul class="songs">
  ${data.data
    .map(
      (song) => `
  <li>
  <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  </li>
  `
    )
    .join("")}
  </ul>
  `;
}

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTearm = search.value.trim();

  if (!searchTearm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTearm);
  }
});
