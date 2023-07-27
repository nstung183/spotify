$(document).ready(function () {
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
                <h3>${audio["name"]}</h3>
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
          <img src="${audio["src_image"]}" alt="music">
          <div class="audio-description">
            <div class="description">
              <h3>${audio["author"]}</h3>
              <p>${audio["author"]}</p>
            </div>
             <i class="fal fa-volume hide"></i>
          </div>
        </div>`;
      });
      $("#playlist").html(playlistBody);
    });
  }
  playlistLeft();
  playlistMiddle();
});

$(document).on("click", ".audio", function () {
  let audio = $(this).find("audio")[0];
  let audioImg = $(this).find("img")[0].src;
  if (audio.paused == false) {
    audio.pause();
    audio.currentTime = 0;
  } else {
    changeCurrentAudioImage(audioImg);
    stopAllAudio();
    highlightName($(this));;
    audio.play();
  }

  function stopAllAudio(){
    $("audio").each(function () {
      this.pause();
      this.currentTime = 0;
    });
  }

  function changeCurrentAudioImage(audioImg) {
    $("#current-audio").find("img")[0].src = audioImg;
  }

  function highlightName(component) {
    component.find("h3").addClass("playing");
    component.find("i").removeClass("hide");
  }
});
