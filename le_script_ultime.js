/*Le Script Ultime (avec des majuscules), à ajouter comme postscript dans BetterBibTeX (plug-in de Zotero) pour obtenir des fichiers .bib conformes aux exigences de Bib2HAL.*/
/*Réalisé par le SCD de l'Université Paris Nanterre, avec l'aide précieuse, sympathique et efficace d'Emiliano Heyns (développeur du plug-in).
/* PLus d'infos sur : https://openaccess.parisnanterre.fr/evenements-passes/de-bibtex-a-hal/
/* Toute la documentation sur : https://openaccess.parisnanterre.fr/hal-et-la-voie-verte/formations-et-tutoriels/fonctionnalites-avancees/exporter-un-fichier-bibtex-conforme-a-hal-a-partir-de-zotero-912609.kjsp?RH=1488466094060

/* Pour les articles de magazines exclusivement, ajouter un champ "x-popularlevel = yes" */
if (this.item.itemType == 'magazineArticle') {
this.add({ name: 'x-popularlevel', value: 'yes'});
}

/* Pour tous les autres types de documents, ajouter un champ "x-popularlevel = no" */
if ((this.item.itemType == 'journalArticle' || this.item.itemType == 'book' || this.item.itemType == 'conferencePaper' || this.item.itemType == 'bookSection' || this.item.itemType == 'presentation')) {
this.add({ name: 'x-popularlevel', value: 'no'});
}

/* Exporter le champ "Archive" et le renommer en "x-onbehalfof"*/
if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ Archive: this.item.archive });
}
if (this.has.Archive) {
  this.has.Archive.name = 'x-onbehalfof';
}

/* Exporter le champ "Loc. dans l'archive" et le renommer en "x-audience"*/
if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ archiveLocation: this.item.archiveLocation });
}
if (this.has.archiveLocation) {
  this.has.archiveLocation.name = 'x-audience';
}

/* Exporter le champ "Catalogue de bibliothèque" et le renommer en "x-peerreviewing"*/
if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ libraryCatalog: this.item.libraryCatalog });
}
if (this.has.libraryCatalog) {
  this.has.libraryCatalog.name = 'x-peerreviewing';
}

/* Pour les articles de colloque et les posters exclusivement, renommer le champ "Titre abrégé" en "x-conferencestartdate"*/
if ((this.item.itemType == 'conferencePaper' || this.item.itemType =='presentation') && this.has.shorttitle) {
  this.has.shorttitle.name = 'x-conferencestartdate';
}

/* Pour les articles de colloque exclusivement, exporter le champ "Consulté le" et le renommer en "x-conferenceenddate" */

if ((Translator.BetterBibTeX) && (this.item.itemType == 'conferencePaper' || this.item.itemType =='presentation')) {
  reference.add({ name: 'x-conferenceenddate', value: item.accessDate })
}

/* Exporter le champ "Cote" et, pour les articles de colloque et posters exclusivement, le renommer en "x-invitedcommunication" */
if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ callNumber: this.item.callNumber });
}
if ((this.item.itemType == 'conferencePaper' || this.item.itemType =='presentation') && this.has.lccn) {
  this.has.lccn.name = 'x-invitedcommunication';
}

/* Exporter le champ "Autorisations" et, pour les articles de colloque et posters exclusivement, le renommer en "x-city", pour les articles de revue si le champs = "note" changer le type de document en @note */
if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ rights: this.item.rights });
}
if ((this.item.itemType == 'conferencePaper' || this.item.itemType =='presentation') && this.has.rights) {
  this.has.rights.name = 'x-city';
}
if ((this.item.itemType == 'journalArticle') && this.item.callNumber == 'note') {
  this.referencetype = 'note';
}

/* Pour les articles de colloque et les posters exclusivement, renommer le champ "Extra" en "x-country" */
if ((this.item.itemType == 'conferencePaper' || this.item.itemType =='presentation') && this.has.note) {
  this.has.note.name = 'x-country';
}

/* Pour les articles d'encyclopédie, renommer le champ "journal" en "booktitle" */
if ((this.item.itemType == 'encyclopediaArticle') && this.has.journal) {
  this.has.journal.name = 'booktitle';
}

if (Translator.BetterBibTeX && this.item.itemType == 'encyclopediaArticle') {
  this.referencetype = 'misc';
}

/*Purger le champ Booktitle s'il automatiquement généré à partir du champ "conference Name" */
if (Translator.BetterBibTeX && reference.has.booktitle && !item.publicationTitle && this.item.itemType == 'conferencePaper') {
  delete reference.has.booktitle
}

/* Pour les articles de colloques qui un champ "Intitlé des actes" (booktitle), ajouter un champ "x-proceedings = yes", si le champs est vide ajouter un champ "x-proceedings = yes"  */
if ((this.item.itemType == 'conferencePaper') && this.has.booktitle) {
  this.add({ name: 'x-proceedings', value: 'yes' });
}
if ((this.item.itemType == 'conferencePaper') && !this.has.booktitle) {
  this.add({ name: 'x-proceedings', value: 'no' });
}

/* Exporter le champ "Titre des actes" et le renommer en "x-source" (inproceedings) */
if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ booktitle: this.item.booktitle });
}
if ((this.has.booktitle) && this.item.itemType == 'conferencePaper'){
  this.has.booktitle.name = 'x-source'
}

/* Exporter le champ "Intitulé du colloque" et le renommer en "booktitle" (inproceedings) car X2HAL utilise le champ "Booktitle" pour généré le champ "conferenceTitle" de HAL */
if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ conferenceName: this.item.conferenceName });
}
if (this.has.conferenceName) {
  this.has.conferenceName.name = 'booktitle';
}

/* Renommer le champ "language" en "x-language"  [à encoder sur deux lettres au format ISO] */
if (this.has.language) {
  this.has.language.name = 'x-language';
}

/* Exporter le champ "URL" et le renommer en "x-publisherlink"*/
if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ URL: this.item.url });
}
if (this.has.URL) {
  this.has.URL.name = 'x-publisherlink';
}

/* Pour les rapports exclusivement, renommer le champ "type" en "x-reporttype" [attention, choisir dans une liste prédéfinie] */
if (this.item.itemType == 'report' && this.has.type) {
  this.has.type.name = 'x-reporttype';
}

/* Pour les rapports exclusivement, renommer le champ "Numéro de rapport" par "Numéro" (Pas pris en compte pas X2HAL)
if (this.item.itemType == 'report' && this.has.reportNumber) {
  this.has.reportNumber.name = 'number';
}*/

/* Pour les présentations exclusivement, renommer le type de document "presentation" en "poster" */
if (Translator.BetterBibTeX && this.item.itemType == 'presentation') {
  this.referencetype = 'poster';
}

/* Exporter le champ "Intitulé de la réunion" et le renommer en "booktitle" (posters) */
if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ meetingName: this.item.meetingName });
}
if (this.has.meetingName) {
  this.has.meetingName.name = 'booktitle';
}

/* Si la référence n'a pas de marqueurs, ajouter un mot-clé par défaut
if (!this.item.keywords) {
  this.add({ name: 'keywords', value: '[No keyword]'});
}

/* Si la référence n'a pas de résumé, ajouter un résumé par défaut
if (!this.item.abstract) {
  this.add({ name: 'abstract', value: '[No abstract]'});
}*/

/* Pour les posters exclusivement, ajouter un champ "x-proceedings = no" */
if (this.item.itemType =='presentation') {
  this.add({ name: 'x-proceedings', value: 'no' });
}

/* Pour les présentations exclusivement (qui ne disposent pas des champs Archive, Loc. Archive, Cote et Catalogue de bibliothèque), ajouter des champs avec des valeurs par défaut */
if (this.item.itemType == 'presentation') {
  this.add({ name: 'x-audience', value: 'international' });
  this.add({ name: 'x-invitedcommunication', value: 'no' });
  this.add({ name: 'x-peerreviewing', value: 'yes' });
}

/* Pour les présentations exclusivement, renommer le type de document "presentation" en "poster" */
if (Translator.BetterBibTeX && this.item.itemType == 'presentation') {
  this.referencetype = 'poster';
}

/* Pour les ouvrages n'ayant eclusivement que des éditeurs modifier le champ "Type de document" en "proceedings" (=Direction d'ouvrage dans HAL)*/
if ((((Translator.BetterBibTeX) && this.item.itemType == 'book') && this.has.editor) && !this.has.author){
  this.referencetype = 'proceedings';
}
/* Pour exporter les champs spécifiques aux directions de dossier de revue et aux directions d'actes de colloques*/
if (((((Translator.BetterBibTeX) && this.item.itemType == 'book') && this.has.editor) && !this.has.author) && this.item.callNumber == 'actes'){
  this.has.shorttitle.name = 'x-conferencestartdate';
}

if (((((Translator.BetterBibTeX) && this.item.itemType == 'book') && this.has.editor) && !this.has.author) && this.item.callNumber == 'actes'){
  this.has.rights.name = 'x-city';
}

if (((((Translator.BetterBibTeX) && this.item.itemType == 'book') && this.has.editor) && !this.has.author) && this.item.callNumber == 'actes'){
  this.has.note.name = 'x-country';
}

if (((((Translator.BetterBibTeX) && this.item.itemType == 'book') && this.has.editor) && !this.has.author) && this.item.callNumber == 'actes'){
  this.has.libraryCatalog.name = 'booktitle';
}

if (((((Translator.BetterBibTeX) && this.item.itemType == 'book') && this.has.editor) && !this.has.author) && this.item.callNumber == 'actes'){
  reference.add({ name: 'x-conferenceenddate', value: item.accessDate })
}

if (((((Translator.BetterBibTeX) && this.item.itemType == 'book') && this.has.editor) && !this.has.author) && this.item.callNumber == 'revue'){
  this.has.series.name = 'journal';
}

/*Exporter l'année du champ "Date" en le champ x-wrtitingdate (obligatoire dans HAL pour les manuscrits)*/
if (this.item.itemType == 'manuscript') {
 this.has.year.name = 'x-writingdate';
}

/* Mettre la date dans un champ "date"  NE MARCHE PAS */
/*if (Translator.BetterBibTeX || Translator.BetterBibLaTeX) {
  this.add({ date: this.item.date });
}
if (this.has.date) {
  this.has.date.name = 'date';
}*/
