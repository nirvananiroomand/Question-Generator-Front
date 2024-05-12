<template>
  <v-container class="h-screen">
    <div>Please import your source and desired features</div>
    <v-row>
      <v-col>
        <v-sheet>
          <v-form @submit.prevent="generateQuestions">
            <v-select
              v-model="selected_types"
              :items="Object.values(question_types)"
              hide-details="false"
              label="Select types of the questions"
              multiple
              persistent-hint
              bg-color="#014686"
              item-color="#457B9D"
            ></v-select>
            <v-select
              v-model="selected_difficulty"
              :items="Object.values(difficulties)"
              hide-details="false"
              label="Select the difficulty"
              persistent-hint
              bg-color="#014686"
              item-color="#457B9D"
            ></v-select>
            <v-text-field
              v-if="Object.keys(selected_types_with_quantity).includes(question_types.MULTIPLE_CHOICE)"
              v-model="multipleChoice"
              label="Number of Multiple Choice questions"
              placeholder="Number of Multiple Choice questions"
              type="number"
              :rules="rules"
              @input="updateQuantity(question_types.MULTIPLE_CHOICE, multipleChoice)"
            ></v-text-field>
            <v-text-field
              v-if="Object.keys(selected_types_with_quantity).includes(question_types.MULTIPLE_RESPONSE)"
              v-model="multipleResponse"
              label="Number of Multiple Response questions"
              placeholder="Number of Multiple Response questions"
              type="number"
              :rules="rules"
              @input="updateQuantity(question_types.MULTIPLE_RESPONSE, multipleResponse)"
            ></v-text-field>
            <v-text-field
              v-if="Object.keys(selected_types_with_quantity).includes(question_types.TRUE_FALSE)"
              v-model="trueFalse"
              label="Number of True/False questions"
              placeholder="Number of True/False questions"
              type="number"
              :rules="rules"
              @input="updateQuantity(question_types.TRUE_FALSE, trueFalse)"
            ></v-text-field>
            <v-text-field
              v-if="Object.keys(selected_types_with_quantity).includes(question_types.FILL_IN_THE_BLANK)"
              v-model="fillInTheBlank"
              label="Number of Fill in the Blank questions"
              placeholder="Number of Fill in the Blank questions"
              type="number"
              :rules="rules"
              @input="updateQuantity(question_types.FILL_IN_THE_BLANK, fillInTheBlank)"
            ></v-text-field>
            <v-text-field
              v-if="Object.keys(selected_types_with_quantity).includes(question_types.SHORT_ANSWER)"
              v-model="shortAnswer"
              label="Number of Short Answer questions"
              placeholder="Number of Short Answer questions"
              type="number"
              :rules="rules"
              @input="updateQuantity(question_types.SHORT_ANSWER, shortAnswer)"
            ></v-text-field>
            <v-text-field
              v-if="Object.keys(selected_types_with_quantity).includes(question_types.EXTENDED_RESPONSE)"
              v-model="extendedResponse"
              label="Number of Extended Response questions"
              placeholder="Number of Extended Response questions"
              type="number"
              :rules="rules"
              @input="updateQuantity(question_types.EXTENDED_RESPONSE, extendedResponse)"
            ></v-text-field>
            <v-btn class="mt-2" type="submit" block
                   :text="isGenerating ? 'Generating...' : 'Generate Questions'"></v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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

const MIN_QUESTIONS = 1
const MAX_QUESTIONS = 10

export default {
  name: 'Generate',
  data() {
    return {
      question_types: QuestionTypes,
      difficulties: QuestionDifficulties,
      selected_difficulty: '',
      selected_types_with_quantity: {},
      selected_types: [],
      multipleChoice: '',
      multipleResponse: '',
      trueFalse: '',
      fillInTheBlank: '',
      shortAnswer: '',
      extendedResponse: '',
      content: '', // Add a data property to hold the content
      responseQuestions: [], // Add a data property to store the response questions
      isGenerating: false,

      rules: [
        value => {
          if (value < MIN_QUESTIONS) {
            return `Number of questions must be at least ${MIN_QUESTIONS}`
          } else if (value > MAX_QUESTIONS) {
            return `The maximum number of questions you can request is ${MAX_QUESTIONS}`
          }
          return true
        }
      ]
    }
  },
  watch: {
    selected_types(newList, oldList) {
      const new_types = newList.filter((x) => !oldList.includes(x))

      // Create a dictionary with keys made of new items added to the selected_types_with_quantity list
      new_types.forEach((type) => {
        this.selected_types_with_quantity[type] = 0
      })

      // Remove keys from selected_types_with_quantity if they are not present anymore
      Object.keys(this.selected_types_with_quantity).forEach((type) => {
        if (!newList.includes(type)) {
          delete this.selected_types_with_quantity[type]
        }
      })

      console.log(`selected types: ${this.selected_types}`)
      console.log('selected_types_with_quantity:', this.selected_types_with_quantity)
    }
  },
  methods: {
    updateQuantity(q_type, value) {
      this.selected_types_with_quantity[q_type] = parseInt(value) || 0
      console.log(this.selected_types_with_quantity)
    },

    async generateQuestions() {
      console.log('in generate Question func')
      this.isGenerating = true

      const requestData = {
        content: 'water is blue, so as the sky', //content goes here
        difficulty: this.difficulty,
        typesWithQuantities: this.selected_types_with_quantity
      }


      try {
        const response = await fetch('http://127.0.0.1:8000/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        })

        if (!response.ok) {
          throw new Error('Failed to generate questions')
        }

        this.responseQuestions = await response.json()
        console.log(this.responseQuestions)
        this.isGenerating = false
      } catch (error) {
        this.isGenerating = false
        console.error('Error:', error.message)
      }
    }
  }
}
</script>

<style>
</style>
