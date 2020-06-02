// I'm sorry about the quality of this code, I just wanted it to work and
// quickly. Feel free to contribute!

TAGS_TO_ADD = 8
// Source: http://best-hashtags.com/hashtag/conservative/
TAGS = [
  "2ndamendment",
  "alllivesmatter",
  "america",
  "americafirst",
  "armedforces ",
  "backtheblue",
  "benshapiro",
  "bhfyp",
  "blueline",
  "bluelinebeasts",
  "bluelinefamily",
  "bluelinesstrong",
  "buildthewall",
  "communitypolicing",
  "conservative",
  "conservativememes",
  "conservatives",
  "constitution",
  "deputysheriff",
  "donaldtrump",
  "draintheswamp",
  "fakenews",
  "fitcops",
  "foxnews",
  "freedom",
  "gop",
  "guns",
  "kag",
  "kagkag2020",
  "keepamericagreat",
  "lawenforcementfamily",
  "lawenforcementofficer",
  "liberalismisamentaldisorder",
  "libtards",
  "maga",
  "makeamericagreatagain",
  "merica",
  "murica",
  "nra",
  "policecar",
  "policedepartment",
  "policefamily",
  "policelife",
  "policeofficer",
  "policepics",
  "policetraining",
  "policeweek",
  "potus",
  "presidenttrump",
  "progun",
  "prolife",
  "qanon",
  "redpill",
  "republican",
  "republicans",
  "rightwing",
  "secondamendment",
  "serveandprotect",
  "sheriffdeputy",
  "sheriffsoffice",
  "socialismsucks",
  "thegreatawakening",
  "trump",
  "trumpmemes",
  "trumptrain",
  "walkaway",
  "wga",
  "womenfortrump",
];

// Source: https://www.robinhowlett.com/blog/2016/11/12/building-a-google-chrome-extension-including-keyboard-shortcuts-and-copying-to-the-clipboard/
function copyToClipboard(contents) {
    const input = document.createElement("input");
    input.style.position = "fixed";
    input.style.opacity = 0;
    input.value = contents;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
};
// Source: https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSample(array, count) {
    var indices = [];
    var result = new Array(count);
    for (let i = 0; i < count; i++ ) {
        let j = Math.floor(Math.random() * (array.length - i) + i);
        result[i] = array[indices[j] === undefined ? j : indices[j]];
        indices[j] = indices[i] === undefined ? i : indices[i];
    }
    return result;
};

function randomTags() {
  return getRandomSample(TAGS, TAGS_TO_ADD);
}

function notify(message) {
  const opt = {
    type: "basic",
    title: "Hashtags copied!",
    message,
    contextMessage: "",
    iconUrl: "icon.png"
  };

  chrome.notifications.create(null, opt, function (notifId) {
    setTimeout(function () {
      chrome.notifications.clear(notifId);
    }, 3000);
  });
}

// when the extension is triggered
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'copy-tags') {
    const hashtags = randomTags().map(t => `#${t}`).join(' ');
    console.log(`Copying tags: ${hashtags}`);
    notify(hashtags);
    copyToClipboard(hashtags);
  }
});
