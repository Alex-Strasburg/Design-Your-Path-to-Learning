window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script2 = function()
{
  //Retrieve Player Variables
var player = GetPlayer();
learnerName = player.GetVar("nameField");
learnerSpacing = player.GetVar("spacingField");
learnerRetrieval = player.GetVar("retrievalField");

Constructpdf();

async function Constructpdf() {
//Dynamically load pdf-lib JavaScript module
  await loadMods();
//Call the fillForm asynch function
  await fillForm();
}
async function loadMods() {
await import("https://unpkg.com/pdf-lib/dist/pdf-lib.js");
}

async function fillForm() {
//Read pdf form
  const { PDFDocument } = PDFLib;
  const formUrl = 'NotesTemplate.pdf';
  const formPdfBytes = await fetch(formUrl).then (res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();
//Get field names
  const nameField = form.getTextField('LName');
  const titleField = form.getTextField('LTitle');
  const notesField = form.getTextField('LNotes');

//Fill in form
  nameField.setText(learnerName);
  titleField.setText(learnerSpacing);
  notesField.setText(learnerRetrieval);
  var filename = learnerName + ".pdf"
//Save form
  const pdfBytes = await pdfDoc.save();
//Download the form
await import('https://unpkg.com/tiny-save-as/dist/tiny-save-as.esm.js')
.then(({default: saveAs}) => {
  const blob = new Blob([pdfBytes], {type: 'application/octet-stream'});
  saveAs(blob, filename);
})
.catch((err) => {
  console.log(err);
});
  }
}

};
