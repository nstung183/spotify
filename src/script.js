var jsonAudios;
$(document).ready(function () {
  $.getJSON("/public/audio/audio.json", function (data) {
    jsonAudios = data;
  });
});

$(document).ready(function () {
  function playlistMiddle() {
    let playlistBody = "";
    $.getJSON("/audio/audio.json", function (result) {
      $.each(result, function (i, audio) {
        playlistBody += `<tr>
          <td>${i}</td>
          <td>
            <div class="audio pointer js--audio-target" data-audio-stt="${i}">
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
        playlistBody += `<div class="audio pointer js--audio-target" data-audio-stt="${i}">
          <audio class="hide player_audio" src="${audio["src"]}"></audio>
          <img src="${audio["src_image"]}" alt="music">
          <div class="audio-description">
            <div class="description">
              <h3>${audio["name"]}</h3>
              <p>${audio["author"]}</p>
            </div>
             <i class="fal fa-volume hide"></i>
          </div>
        </div>`;
      });
      $("#playlist").html(playlistBody);
    });
  }
  $("#js--status-audio-control").on("click", function () {
    let audios = $(".js--audio-target");
    let audiosControl = $("#js--status-audio-control");
    if (audios.find(".playing").length == 0) {
      audios.first().find("audio")[0].play();
      audiosControl.removeClass("fa-play-circle").addClass("fa-pause-circle");
      $(".js--audio-target*[data-audio-stt=1]").find("h3").addClass("playing");
      $(".js--audio-target*[data-audio-stt=1]").find("i").removeClass("hide");
    } else {
      $("audio").each(function () {
        this.pause();
        this.currentTime = 0;
      });
      audiosControl.removeClass("fa-pause-circle").addClass("fa-play-circle");
      audios.find("h3").removeClass("playing");
      audios.find("i").addClass("hide");
    }
  });
  playlistLeft();
  playlistMiddle();
});

$(document).on("click", ".js--audio-target", function () {
  const audios = $(".js--audio-target");
  const currentAudio = $(this);
  let audio = currentAudio.find("audio")[0];
  if (audio.paused == false) {
    toggleClass(
      "fa-pause-circle",
      "fa-play-circle",
      $("#js--status-audio-control")
    );
    audio.pause();
    currentAudio.find("h3").removeClass("playing");
    currentAudio.find("i").addClass("hide");
    audio.currentTime = 0;
  } else {
    toggleClass(
      "fa-play-circle",
      "fa-pause-circle",
      $("#js--status-audio-control")
    );
    stopAllAudio();
    removeClassActive(audios);
    highlightName(currentAudio);
    changeCurrentAudioDescriptions(this.dataset.audioStt);
    changeCurrentAudioDescriptionsNext(parseInt(this.dataset.audioStt) + 1);
    audio.play();
  }

  function stopAllAudio() {
    $("audio").each(function () {
      this.pause();
      this.currentTime = 0;
    });
  }

  function removeClassActive(audios) {
    if ($(".playing").length == 0) return;
    audios.find("h3").removeClass("playing");
    audios.find("i").not(".hide").addClass("hide");
  }

  function highlightName(currentAudio) {
    currentAudio.find("h3").addClass("playing");
    currentAudio.find("i").removeClass("hide");
  }

  function changeCurrentAudioDescriptions(key) {
    $(".js--current-audio-img").attr("src", jsonAudios[key].src_image);
    $(".js--current-audio-name").html(jsonAudios[key].name);
    $(".js--current-audio-author").html(jsonAudios[key].author);
  }

  function changeCurrentAudioDescriptionsNext(key) {
    if (jsonAudios[key] == undefined) key = 1;
    $(".js--current-audio-img-next").attr("src", jsonAudios[key].src_image);
    $(".js--current-audio-name-next").html(jsonAudios[key].name);
    $(".js--current-audio-author-next").html(jsonAudios[key].author);
  }

  function toggleClass(old_class, new_class, component) {
    component.removeClass(old_class).addClass(new_class);
  }
});
