<template>
  <div class="container">
    <div class="button-theme" @click="resetIndex">Back to Home</div>
    <h2>You where better then 60% of all quizzer</h2>
    <h4>You got {{ count }} out of {{ questions.length }} questions</h4>
    <h4>Notes*: Your choices are in red and correct answer in green</h4>
    <div class="box" v-for="(question, index) in questions" :key="index">
      <h2>{{ question.text }}</h2>
      <div v-for="(answers, index) in question.answers" :key="index">
        <p
          class="options"
          :class="[
            answers.userChoice ? 'user-choice' : '',
            answers.correct ? 'correct' : '',
          ]"
        >
          {{ answers.answerText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Results",
  methods: {
    // it resets the index and goes back to the home page
    resetIndex: function () {
      this.$router.push({ path: "/" });
      this.$store.dispatch("resetIndex");
    },
  },
  computed: {
    //it gets the state from the store
    questions() {
      return this.$store.state.questions;
    },

    //it counts the amount of questions gotten correct
    count() {
      let accumulator = 0;
      Array.prototype.forEach.call(
        this.$store.state.questions,
        (currentValue) => {
          Array.prototype.forEach.call(currentValue.answers, (child) => {
            if (child.correct && child.userChoice) accumulator++;
          });
        }
      );
      return accumulator;
    },
  },
};
</script>

<style scoped lang="less">
.container {
  width: 90%;
  margin: 100px auto;
  text-align: center;

  .options {
    background: lightblue;
    padding: 10px;
    font-size: 18px;
    margin: 5px;
    color: black;
    border-radius: 30px;
    transition: background 0.8s;
  }

  .button-theme {
    color: white;
    background: green;
    padding: 10px;
    width: 60px;
    cursor: pointer;
    margin: 20px auto;
  }

  .user-choice {
    color: white;
    background: red;
    padding: 10px;
  }
  .correct {
    color: white;
    background: green;
    padding: 10px;
  }
  .box {
    border: 1px solid gray;
    margin: 20px auto;
    padding: 10px;
    width: 90%;
  }
}
</style>
