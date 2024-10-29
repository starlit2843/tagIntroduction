<template>
  <div class="flex gap-x-5">
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <select
        class="appearance-none rounded-lg bg-base px-6 py-3 text-center text-lg font-bold text-gray-600 shadow-lg hover:bg-gray-100"
      >
        <option value="" selected>未選擇 &#xf0d7;</option>
        <optgroup label="文學院">
          <option>中文系</option>
          <option>歷史系</option>
          <option>哲學系</option>
        </optgroup>
        <optgroup label="社會科學學院">
          <option>政治系</option>
          <option>社會系</option>
          <option>財政系</option>
          <option>政治系</option>
          <option>公行系</option>
          <option>地政系</option>
          <option>經濟系</option>
          <option>民族系</option>
        </optgroup>
        <optgroup label="商學院"></optgroup>
      </select>
    </div>
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <select
        class="appearance-none rounded-lg bg-base px-5 py-3 text-center text-lg font-bold text-gray-600 shadow-lg hover:bg-gray-100"
      >
        <option value="" selected>未選擇 &#xf0d7;</option>
        <optgroup label="主修年份">
          <option>111</option>
          <option>110</option>
          <option>109</option>
          <option>108</option>
          <option>107</option>
          <option>106</option>
        </optgroup>
      </select>
    </div>
  </div>
</template>

<script></script>

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
</style>
