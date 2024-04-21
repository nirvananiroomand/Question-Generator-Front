<template>
  <v-container class="h-screen">
    <div>Please import your source and desired features</div>
    <div>
      <v-row>
        <v-col>
          <v-sheet>
            <v-form>
              <v-select
                v-model="selected_questions_types"
                :items="question_types"
                hide-details="false"
                label="Select types of the questions"
                multiple
                persistent-hint
                bg-color="#014686"
                item-color="#457B9D"
              ></v-select>
              <v-select
                v-model="difficulty"
                :items="difficulties"
                hide-details="false"
                label="Select the difficulty"
                persistent-hint
                bg-color="#014686"
                item-color="#457B9D"
              ></v-select>
              <v-text-field
                v-if="selected_questions_types.includes('Multiple Choice')"
                v-model="multipleChoice"
                label="Number of Multiple Choice questions"
                placeholder="Number of Multiple Choice questions"
                @input="updateQuantity('Multiple Choice', multipleChoice)"
              ></v-text-field>
              <v-text-field
                v-if="selected_questions_types.includes('Multiple Response(Select all that apply)')"
                v-model="multipleResponse"
                label="Number of Multiple Response questions"
                placeholder="Number of Multiple Response questions"
              ></v-text-field>
              <v-text-field
                v-if="selected_questions_types.includes('True/False')"
                v-model="trueFalse"
                label="Number of True/False questions"
                placeholder="Number of True/False questions"
                @input="updateQuantity('True/False', trueFalse)"
              ></v-text-field>
              <v-text-field
                v-if="selected_questions_types.includes('Fill in the Blank')"
                v-model="fillInTheBlank"
                label="Number of Fill in the Blank questions"
                placeholder="Number of Fill in the Blank questions"
                @input="updateQuantity('Fill in the Blank', fillInTheBlank)"
              ></v-text-field>
              <v-text-field
                v-if="selected_questions_types.includes('Short Answer')"
                v-model="shortAnswer"
                label="Number of Short Answer questions"
                placeholder="Number of Short Answer questions"
                @input="updateQuantity('Short Answer', shortAnswer)"
              ></v-text-field>
              <v-text-field
                v-if="selected_questions_types.includes('Extended Response')"
                v-model="extendedResponse"
                label="Number of Extended Response questions"
                placeholder="Number of Extended Response questions"
                @input="updateQuantity('Extended Response', extendedResponse)"
              ></v-text-field>
            </v-form>
          </v-sheet>
          <v-btn class="mt-2" type="submit" block text="Generate Questions"></v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Generate',

  data() {
    return {
      selected_questions_types: [],
      question_types: [
        'Multiple Choice',
        'Multiple Response(Select all that apply)',
        'True/False',
        'Fill in the Blank',
        'Short Answer',
        'Extended Response'
      ],
      difficulty: '',
      difficulties: ['Very Challenging', 'Challenging', 'Moderate', 'Easy', 'Very Easy'],
      selected_types_with_quantity: {},
      multipleChoice: '',
      multipleResponse: '',
      trueFalse: '',
      fillInTheBlank: '',
      shortAnswer: '',
      extendedResponse: ''
    }
  },

  methods: {
    updateQuantity(type, value) {
      this.selected_types_with_quantity[type] = parseInt(value) || 0
      console.log(this.selected_types_with_quantity)
    }
  },

  watch: {
    selected_questions_types(newList, oldList) {
      var new_types = newList.filter((x) => !oldList.includes(x))
      var intersection = newList.filter((x) => oldList.includes(x))

      // Create a dictionary with keys made of new items added to the selected_questions_types list
      new_types.forEach((type) => {
        this.selected_types_with_quantity[type] = 0
      })

      // Remove keys from selected_types_with_quantity if they are not present anymore
      Object.keys(this.selected_types_with_quantity).forEach((type) => {
        if (!newList.includes(type)) {
          delete this.selected_types_with_quantity[type]
        }
      })

      console.log('selected_types_with_quantity:', this.selected_types_with_quantity)
      console.log('selected_questions_types:', this.selected_questions_types)
    }
  }
}
</script>

<style>
.v-container {
  background-color: #8d99ae;
  color: #2b2d42;
}
.v-form {
  background-color: #edf2f4;
  color: #2b2d42;
}
.v-btn {
  background-color: #ef233c !important;
  color: #2b2d42 !important;
}
.v-icon {
  color: #457b9d;
}
</style>
