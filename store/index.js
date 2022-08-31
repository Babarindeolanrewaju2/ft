export const state = () => ({
  questions: [
    {
      id: "1",
      text: "What is the name for the Jewish New Year?",
      answers: [
        { answerText: "a) Hanukkah" },
        { answerText: "b) Yom Kippur" },
        { answerText: "c) Kwanza", correct: true },
        { answerText: "d) Rosh Hashanah" },
      ],
    },
    {
      id: "2",
      text: "How many blue stripes are there on the U.S. flag?",
      answers: [
        { answerText: "a) 6" },
        { answerText: "b) 7" },
        { answerText: "c) 13", correct: true },
        { answerText: "d) 0" },
      ],
    },
    {
      id: "3",
      text: "Who's the richest in the world?",
      answers: [
        { answerText: "a) Jeff Bezos" },
        { answerText: "b) Elon Musk", correct: true },
        { answerText: "c) Evan You" },
        { answerText: "d) Tony Stark" },
      ],
    },
    {
      id: "4",
      text: "Which one of these characters is not friends with Harry Potter?",
      answers: [
        { answerText: "a) Ron Weasley" },
        { answerText: "b) Neville Longbottom" },
        { answerText: "c) Draco Malfoy", correct: true },
        { answerText: "d) Hermione Granger" },
      ],
    },
    {
      id: "5",
      text: "What is the color of Donald Duck's bowtie?",
      answers: [
        { answerText: "a) Red" },
        { answerText: "b) Yellow" },
        { answerText: "c) Blue", correct: true },
        { answerText: "d) White" },
      ],
    },
    {
      id: "6",
      text: "What was the name of the band Lionel Richie was a part of?",
      answers: [
        { answerText: "a) King Harvest" },
        { answerText: "b) Spectrums" },
        { answerText: "c) Commodores", correct: true },
        { answerText: "d) The Marshall Tucker Band" },
      ],
    },
  ],
  questionsCopy: [
    {
      id: "1",
      text: "What is the name for the Jewish New Year?",
      answers: [
        { answerText: "a) Hanukkah" },
        { answerText: "b) Yom Kippur" },
        { answerText: "c) Kwanza", correct: true },
        { answerText: "d) Rosh Hashanah" },
      ],
    },
    {
      id: "2",
      text: "How many blue stripes are there on the U.S. flag?",
      answers: [
        { answerText: "a) 6" },
        { answerText: "b) 7" },
        { answerText: "c) 13", correct: true },
        { answerText: "d) 0" },
      ],
    },
    {
      id: "3",
      text: "Who's the richest in the world?",
      answers: [
        { answerText: "a) Jeff Bezos" },
        { answerText: "b) Elon Musk", correct: true },
        { answerText: "c) Evan You" },
        { answerText: "d) Tony Stark" },
      ],
    },
    {
      id: "4",
      text: "Which one of these characters is not friends with Harry Potter?",
      answers: [
        { answerText: "a) Ron Weasley" },
        { answerText: "b) Neville Longbottom" },
        { answerText: "c) Draco Malfoy", correct: true },
        { answerText: "d) Hermione Granger" },
      ],
    },
    {
      id: "5",
      text: "What is the color of Donald Duck's bowtie?",
      answers: [
        { answerText: "a) Red" },
        { answerText: "b) Yellow" },
        { answerText: "c) Blue", correct: true },
        { answerText: "d) White" },
      ],
    },
    {
      id: "6",
      text: "What was the name of the band Lionel Richie was a part of?",
      answers: [
        { answerText: "a) King Harvest" },
        { answerText: "b) Spectrums" },
        { answerText: "c) Commodores", correct: true },
        { answerText: "d) The Marshall Tucker Band" },
      ],
    },
  ],
  localIndex: 0,
  selected: "",
  error: "",
  results: [],
});

export const mutations = {
  NEXT_QUESTION(state) {
    let userChoice;
    userChoice = state.questions[state.localIndex].answers.some((answer) => {
      // eslint-disable-next-line no-prototype-builtins
      return "userChoice" in answer;
    });

    if (userChoice) {
      state.localIndex++;
      state.selected = "";
      state.error = "";
    } else {
      state.error = "Please select an option";
    }
  },
  PREVIOUS_QUESTION(state) {
    //goes to next question
    state.localIndex !== 0 ? state.localIndex-- : state.localIndex;
  },
  DEFAULT_INDEX(state) {
    //reset index
    state.localIndex = 0;
    state.questions = state.questionsCopy;
  },

  //adds user selection
  ADD_CHOOSE(state, payload) {
    state.selected = payload.selected;
    state.error = "";
    // let choose = state.questions.map((question) => {
    //   if (payload.id !== question.id) {
    //     return question;
    //   } else {
    //     question.answers.forEach((object) => {
    //       delete object["userChoice"];
    //     });
    //     let answer = question.answers.map((answer) => {
    //       if (payload.selected == answer.answerText)
    //         return {
    //           ...answer,
    //           userChoice: true,
    //         };
    //       return answer;
    //     });

    //     return { ...question, answers: [...answer] };
    //   }
    // });

    let index = state.questions.findIndex(
      (question) => question.id === payload.id
    );
    state.questions[index].answers.forEach((object) => {
      delete object["userChoice"];
    });
    state.questions[index].answers = state.questions[index].answers.map(
      (answer) => {
        if (payload.selected == answer.answerText)
          return {
            ...answer,
            userChoice: true,
          };
        return answer;
      }
    );

    // state.questions = choose;
  },
};

export const actions = {
  nextQuestion(context) {
    context.commit("NEXT_QUESTION");
  },
  previousQuestion(context) {
    context.commit("PREVIOUS_QUESTION");
  },
  addChoose(context, payload) {
    context.commit("ADD_CHOOSE", payload);
  },
  resetIndex(context) {
    context.commit("DEFAULT_INDEX");
  },
};
