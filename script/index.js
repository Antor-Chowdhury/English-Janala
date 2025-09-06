// ----- calling api for lesson

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((response) => response.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};

// ----- Calling api for level-word

const loadLevelWord = (id) => {
  //   console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}
  `;
  //   console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLevelWord(data.data));
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
    console.log(word);

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
            <button class="btn bg-[#1a91ff1a] border-none hover:bg-[#1a91ff80]">
              <i class="fa-solid fa-circle-info text-lg"></i>
            </button>
            <button class="btn bg-[#1a91ff1a] border-none hover:bg-[#1a91ff80]">
              <i class="fa-solid fa-volume-high text-lg"></i>
            </button>
          </div>
        </div>
    `;
    wordContainer.append(card);
  });
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
         <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
    `;

    //      4. append into container
    levelContainer.append(btnDiv);
  }
};

loadLessons();
