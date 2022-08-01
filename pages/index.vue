<template>
  <div class="container">
    <div>
      <h2>Quizzes</h2>
      <h2 class="error">{{ getError }}</h2>
      <p class="title">
        {{ getIndex + 1 }} out of {{ countQuestions }} questions
      </p>
      <div>
        <h2>{{ getQuestions[getIndex].text }}</h2>
        <div
          v-for="(question, index) in getQuestions[getIndex].answers"
          :key="index"
        >
          <p
            class="item"
            @click="
              handleSelect(question.answerText, getQuestions[getIndex].id)
            "
            :class="[question.userChoice ? 'theme' : '']"
          >
            {{ question.answerText }}
          </p>
        </div>
        <div v-if="finish" class="button-container">
          <div @click="nextQuestion" class="button-theme">Next</div>
          <div
            v-if="this.$store.state.localIndex > 0"
            @click="previousQuestion"
            class="button-theme"
          >
            Previous
          </div>
        </div>
        <div v-else class="button-theme">
          <nuxt-link style="text-decoration: none; color: inherit" to="/results"
            >Submit</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    //it goes to the next page
    nextQuestion: function () {
      this.$store.dispatch("nextQuestion");
    },
    //it goes to the previous page
    previousQuestion: function () {
      this.$store.dispatch("previousQuestion");
    },
    //it adds user selection to the store
    handleSelect(selected, id) {
      this.$store.dispatch("addChoose", { id, selected });
    },
  },
  computed: {
    //gets index from the store
    getIndex() {
      return this.$store.state.localIndex;
    },
    //gets error message from the store
    getError() {
      return this.$store.state.error;
    },
    //counts the number of questions
    countQuestions() {
      return this.$store.state.questions.length;
    },
    getQuestions() {
      return this.$store.state.questions;
    },
    //conditional rendering which shows the submit button
    finish() {
      return this.$store.state.localIndex ===
        this.$store.state.questions.length - 1 && this.$store.state.selected
        ? false
        : true;
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 90%;
  margin: 100px auto;
  text-align: center;

  .title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
  }

  .error {
    color: red;
    margin-bottom: 10px;
  }

  .item {
    background: lightblue;
    cursor: pointer;
    padding: 10px;
    font-size: 18px;
    margin: 5px;
    color: black;
    border-radius: 30px;
    transition: background 0.8s;
  }

  .item:hover {
    background: lightgray;
  }

  .button-theme {
    color: white;
    background: green;
    padding: 10px;
    width: 60px;
    cursor: pointer;
  }

  .theme {
    color: white;
    background: green;
    padding: 10px;
    cursor: pointer;
  }
}
</style>
