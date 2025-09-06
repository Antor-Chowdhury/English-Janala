const createElements = (arr) => {
  const htmlElements = arr.map(
    (el) => `<span class="btn bg-[#edf7ff]">${el}</span>`
  );
  return htmlElements.join(" ");
};

// speak vocabularies
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// spinner function
const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// ----- calling api for lesson

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((response) => response.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons);

  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

// ----- Calling api for level-word

const loadLevelWord = (id) => {
  manageSpinner(true);
  //   console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}
  `;
  //   console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActive(); // remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);

      clickBtn.classList.add("active"); // add active class

      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);

  const response = await fetch(url);
  const details = await response.json();
  displayWordDetails(details.data);
};

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const displayWordDetails = (word) => {
  console.log(word);

  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div class="">
              <h2 class="font-semibold text-4xl">
                ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${
    word.pronunciation
  })
              </h2>
            </div>
            <div class="">
              <h2 class="font-semibold text-2xl mb-2">Meaning</h2>
              <p class="font-bangla font-medium text-2xl">${word.meaning}</p>
            </div>
            <div class="">
              <h2 class="font-semibold text-2xl mb-2">Example</h2>
              <p class="text-2xl">${word.sentence}</p>
            </div>
            <div class="">
              <h2 class="font-bangla font-medium text-2xl mb-2">
                সমার্থক শব্দ গুলো
              </h2>
              <div class="">${createElements(word.synonyms)}</div>
            </div>
  `;
  document.getElementById("word_modal").showModal();
};

// ----- displaying the level-word

const displayLevelWord = (words) => {
  //   console.log(words);

  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div
          class="text-center col-span-full py-5 space-y-3 font-bangla"
        >
        <img class="mx-auto" src="./assets/alert-error.png" alt="" />
          <p class="text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="font-medium text-3xl text-[#292524]">
            নেক্সট Lesson এ যান
          </h2>
    </div>
    `;
    manageSpinner(false);
    return;
  }

  //   {
  //     "id": 19,
  //     "level": 1,
  //     "word": "Sincere",
  //     "meaning": "সত্‍ / আন্তরিক",
  //     "pronunciation": "সিনসিয়ার"
  // }

  words.forEach((word) => {
    // console.log(word);

    const card = document.createElement("div");
    card.innerHTML = `
            <div class="bg-white rounded-lg shadow-sm text-center p-14 space-y-5">
          <h2 class="font-bold text-3xl">${
            word.word ? word.word : "শব্দ পাওয়া যায়নি"
          }</h2>
          <p class="font-medium text-xl">Meaning /Pronounciation</p>

          <div class="font-bangla font-semibold text-3xl">"${
            word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
          } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }"</div>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${
              word.id
            })"  class="btn bg-[#1a91ff1a] border-none hover:bg-[#1a91ff80]">
              <i class="fa-solid fa-circle-info text-lg"></i>
            </button>
            <button onclick="pronounceWord('${
              word.word
            }')" class="btn bg-[#1a91ff1a] border-none hover:bg-[#1a91ff80]">
              <i class="fa-solid fa-volume-high text-lg"></i>
            </button>
          </div>
        </div>
    `;
    wordContainer.append(card);
  });

  manageSpinner(false);
};

// ----- displaying the Lesson

const displayLesson = (lessons) => {
  //   1. get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  //   2. get into every lessons
  for (let lesson of lessons) {
    // console.log(lesson);
    //      3. create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
         <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
    `;

    //      4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();

// search part

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();

  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  // console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((response) => response.json())
    .then((data) => {
      const allWords = data.data;
      // console.log(allWords);

      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displayLevelWord(filterWords);
    });
});
