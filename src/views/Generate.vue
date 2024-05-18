<template>
  <v-container class="h-screen">
    <v-app-bar app color="#1565C0" class="px-4">
    <v-toolbar-title class="font-weight-medium">Generate New Questions</v-toolbar-title>
    </v-app-bar>
    <v-row>
      <v-col cols="12">
        <v-sheet>
          <v-form @submit.prevent="generateQuestions">
            <v-text-field v-model="title" label="Title"></v-text-field>
            <v-textarea v-model="content" label="Content"></v-textarea>
            <v-select v-model="selected_difficulty" :items="Object.values(difficulties)" label="Select the difficulty"></v-select>
            <v-btn @click="addQuestionRow" color="#1565C0" dark class="font-weight-black mb-5" rounded="lg" >+</v-btn>
            <v-row v-for="(row, index) in questionRows" :key="index">
              <v-col cols="5">
                <v-select v-model="row.type" :items="availableQuestionTypes" label="Select question type"></v-select>
              </v-col>
              <v-col cols="5">
                <v-text-field v-model="row.quantity" label="Quantity" type="number"></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn @click="removeQuestionRow(index)" color="#D81B60"  class="font-weight-black" dark rounded="lg">-</v-btn>
              </v-col>
            </v-row>
            <v-btn class="mt-2" type="submit" block color="#1565C0" :disabled="isGenerating">
              {{ isGenerating ? 'Generating...' : 'Generate Questions' }}
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

const QuestionTypes = {
  MULTIPLE_CHOICE: 'Multiple Choice',
  MULTIPLE_RESPONSE: 'Multiple Response',
  TRUE_FALSE: 'True/False',
  FILL_IN_THE_BLANK: 'Fill in the Blank',
  SHORT_ANSWER: 'Short Answer',
  EXTENDED_RESPONSE: 'Extended Response'
}

const QuestionDifficulties = {
  VERY_EASY: 'Very Easy',
  EASY: 'Easy',
  MODERATE: 'Moderate',
  CHALLENGING: 'Challenging',
  VERY_CHALLENGING: 'Very Challenging'
}

const MAX_QUESTIONS = 10

export default {
  name: 'GeneratePage',
  data() {
    return {
      question_types: QuestionTypes,
      difficulties: QuestionDifficulties,
      selected_difficulty: '',
      title: '',
      content: '',
      questionRows: [{ type: '', quantity: 0 }],
      isGenerating: false
    }
  },
  computed: {
    availableQuestionTypes() {
      // Get the types already selected
      const selectedTypes = this.questionRows.map(row => row.type);
      // Filter out the types already selected
      return Object.values(QuestionTypes).filter(type => !selectedTypes.includes(type));
    }
  },
  methods: {
    addQuestionRow() {
      if (this.questionRows.length < MAX_QUESTIONS) {
        this.questionRows.push({ type: '', quantity: 0 });
      }
    },
    removeQuestionRow(index) {
      this.questionRows.splice(index, 1);
    },
    async generateQuestions() {
      this.isGenerating = true;

      const requestData = {
        title: this.title,
        content: this.content,
        difficulty: this.selected_difficulty,
        chat_questions: this.questionRows.map(row => ({
          question_type: row.type,
          quantity: row.quantity
        }))
      };

      try {
        const response = await axios.post('http://127.0.0.1:8000/conversations/chats/', requestData);

        // Handle the response if needed
        const responseData = response.data
        console.log('Generated questions:', responseData);
        const newChatId = responseData.id
        this.$router.push(`/chat/${newChatId}`);

        this.isGenerating = false;
      } catch (error) {
        console.error('Error generating questions:', error.message);
        this.isGenerating = false;
      }
    }
  }
}
</script>

<style>
</style>
