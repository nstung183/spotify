$(document).ready(function () {
  $(".audio").on("click", function () {
    let audio = $(this).find("audio")[0];
    if (audio.paused == false) {
      audio.pause();
    } else {
      audio.play();
    }
  });
  function playlistMiddle() {
    let playlistBody = "";
    $.getJSON("/audio/audio.json", function (result) {
      $.each(result, function (i, audio) {
        playlistBody += `<tr>
          <td>${i}</td>
          <td>
            <div class="audio">
              <audio class="hide player_audio" src="${audio["src"]}"></audio>
              <img src="${audio["src_image"]}" alt="music">
              <div class="description">
                <h3 class="playing">${audio["name"]}</h3>
                <p>${audio["author"]}</p>
              </div>
            </div>
          </td>
          <td><p>${audio["author"]}</p></td>
          <td>${audio["duration"]}</td>
        </tr>`;
      });
      $("#playlist-middle-body").html(playlistBody);
    });
  }
  function playlistLeft() {
    let playlistBody = "";
    $.getJSON("/audio/audio.json", function (result) {
      $.each(result, function (i, audio) {
        playlistBody += `<div class="audio playing">
          <audio class="hide player_audio" src="${audio["src"]}"></audio>
          <img src="/img/music.png" alt="music">
          <div class="audio-description">
            <div class="description">
              <h3 class="playing">${audio["author"]}</h3>
              <p>${audio["author"]}</p>
            </div>
             <i class="fal fa-volume hide"></i>
          </div>
        </div>`;
      });
      $("#playlist").html(playlistBody);
    });
    $.getJSON("/audio/audio.json");
  }
  playlistLeft();
  playlistMiddle();
});
