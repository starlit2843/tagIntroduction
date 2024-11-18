<template>
    <div>
        <Button v-if="amount === 1"
                :type="button_list[0].type"
                :content="button_list[0].content"
                :function="button_list[0].function"
                :changeto="button_list[0].changeto"
                @next_step="nextStep"/>

        <div v-else>
            <Button v-if="prerequisite"
                    :type="button_list[1].type"
                    :content="button_list[1].content"
                    :function="button_list[1].function"
                    :changeto="button_list[1].changeto"
                    @next_step="nextStep"/>
            <Button v-else
                    :type="button_list[0].type"
                    :content="button_list[0].content"
                    :function="button_list[0].function"
                    :changeto="button_list[0].changeto"
                    @next_step="nextStep"/>
        </div>
    </div>

    
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import Button from '@/components/tag_introduction/button.vue';
  
  const emit = defineEmits();
  
  const props = defineProps({
    amount: {
      type: Number,
      required: false,
      default: 1
    },
    button_list: {
      type: Array,
      required: true,
    },
    prerequisite: {
        type: Boolean,
        required: false,
        default: false
    }
  });
  
  const nextStep = () => {
    emit('next_step');
  };
  </script>
  