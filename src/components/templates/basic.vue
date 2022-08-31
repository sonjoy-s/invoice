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
<text x="20" y="120" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">INVOICE NUMBER</text>
<text x="20" y="135" fill="#000" alignment-baseline="hanging" font-size="10">XX2022XX</text>
<text x="200" y="120" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">INVOICE DATE</text>
<text x="200" y="135" fill="#000" alignment-baseline="hanging" font-size="10">31/08/2022</text>
<text x="20" y="170" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">BILLED TO</text>
<text x="0" y="180" fill="#000" alignment-baseline="hanging" font-size="10">
  <tspan x="20" dy="1.3em">Demon Ltd.</tspan>
  <tspan x="20" dy="1.3em">Akshya Nagar 1st Block 1st Cross,</tspan>
  <tspan x="20" dy="1.3em">Rammurthy nagar, Bangalore-560016</tspan>
</text>
<text x="200" y="170" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">BILLED FROM</text>
<text x="0" y="180" fill="#000" alignment-baseline="hanging" font-size="10">
  <tspan x="200" dy="1.3em">Alex Doe</tspan>
  <tspan x="200" dy="1.3em">2633 Camden Street</tspan>
  <tspan x="200" dy="1.3em">Las Vegas</tspan>
  <tspan x="200" dy="1.3em">Phone: 775-253-1659</tspan>
</text>

<text x="20" y="270" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold">DESCRIPTION</text>
<text x="20" y="290" fill="#000" alignment-baseline="hanging" font-size="10">Fixing services, August 2022</text>
<text x="575" y="270" fill="#000" alignment-baseline="hanging" font-size="10" font-weight="bold" text-anchor="end">AMOUNT</text>
<text x="575" y="290" fill="#000" alignment-baseline="hanging" font-size="10" text-anchor="end">$500.00</text>

<rect x="20" y="545" width="555" height="1" fill="#D9D9D9"/>
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
