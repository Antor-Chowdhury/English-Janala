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

  words.forEach((word) => {
    console.log(word);

    const card = document.createElement("div");
    card.innerHTML = `
    <p>Cat</p>
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
