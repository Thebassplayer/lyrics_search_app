const form = document.getElementById("form"),
  search = document.getElementById("search"),
  result = document.getElementById("result"),
  more = document.getElementById("more"),
  apiURL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
  console.log("request!");
  try {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    console.log(data);

    showData(data);
  } catch (err) {
    throw new Error(err);
  }
}

// Show song and artist in DOM
function showData(data) {
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

  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }
    `;
  } else {
    more.innerHTML = "";
  }
}

// Get prev and next results
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

// Get Lyrics

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  console.log(data);
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

// Get lyrics button click

result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
