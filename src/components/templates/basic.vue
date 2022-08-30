<template>
  <div class="container">
    <div id="iframeContainer" v-html="svg"></div>
    <button @click="download">Download</button>
  </div>
</template>


<script setup>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const svg = `<svg width="595" height="842" viewBox="0 0 595 842" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="595" height="842" fill="white"/>
<rect width="695" height="17" fill="#D9D9D9"/>
<rect y="726" width="695" height="116" fill="#D9D9D9"/>
<text x="0" y="0" fill="red" alignment-baseline="hanging" font-size="50">Invoice</text>
</svg>
`;

const docDefinition = {
  content: [
    {
      "svg": svg
    }
  ],
  pageSize: {
    width: 595,
    height: 842
  },
  pageMargins: [ 0, 0, 0, 0 ],
};

function download() {
  pdfMake.createPdf(docDefinition).download("invoice");
}
</script>

<style lang="css">
.container {
  display: flex;
  align-items: flex-start;
}

#iframeContainer {
  width: 595px;
  height: 842px;
}

</style>
