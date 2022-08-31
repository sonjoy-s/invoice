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

const svg = `
<svg width="595" height="842" viewBox="0 0 595 842" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="595" height="842" fill="white"/>
<rect width="695" height="100" fill="#D9D9D9"/>
<rect y="726" width="695" height="116" fill="#D9D9D9"/>
<text x="20" y="50" fill="#000" alignment-baseline="hanging" font-size="50">Invoice</text>
<text x="20" y="120" fill="#000" alignment-baseline="hanging" font-size="10">INVOICE NUMBER</text>
<text x="20" y="135" fill="#000" alignment-baseline="hanging" font-size="10">SS202209</text>
<text x="200" y="120" fill="#000" alignment-baseline="hanging" font-size="10">INVOICE DATE</text>
<text x="200" y="135" fill="#000" alignment-baseline="hanging" font-size="10">31/08/2022</text>
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
  pageMargins: [0, 0, 0, 0],
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
