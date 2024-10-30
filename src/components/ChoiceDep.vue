<template>
  <div class="flex gap-x-5">
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <select
        v-model="select"
        class="sm:text-md appearance-none rounded-lg bg-base px-3 py-2 text-center text-sm font-bold text-base-content shadow-numo-button hover:bg-gray-100 sm:px-6 sm:py-3"
      >
        <option value="" selected>
          未選擇
          &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
          &#xf0d7;
        </option>
        <optgroup
          v-for="(group, name) in departments"
          :label="name"
          :key="name"
        >
          <option v-for="option in group" :value="option.id" :key="option.id">
            {{ option.short }}
          </option>
        </optgroup>
      </select>
    </div>

    <div>
      <select
        v-model="select_year"
        class="sm:text-md appearance-none rounded-lg bg-base px-3 py-2 text-center text-sm font-bold text-base-content shadow-numo-button hover:bg-gray-100 sm:px-5 sm:py-3"
      >
        <option value="" selected>– – &#160;&#160; &#xf0d7;</option>
        <option
          v-for="year in schoolYear"
          :value="year.value"
          :key="year.value"
        >
          {{ year.value }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { departments, schoolYear } from "~/assets/message";

const select = ref("");
const select_year = ref("");

watch(select, (newVal, oldVal) => {
  handleChange(newVal);
});

watch(select_year, (newVal, oldVal) => {
  handleChangeYear(newVal);
});

function handleChange(val) {
  emit("handleChange", val);
}

function handleChangeYear(val) {
  emit("handleChangeYear", val);
}

const emit = defineEmits(["handleChange", "handleChangeYear"]);
</script>

<style scoped>
select {
  font-family: "FontAwesome", "Second Font name";
}
@-webkit-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}

@-moz-keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}

@keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}
:required:focus {
  box-shadow: 0 0 6px rgba(255, 0, 0, 0.5);
  border: 1px red solid;
  outline: 0;
}
</style>
