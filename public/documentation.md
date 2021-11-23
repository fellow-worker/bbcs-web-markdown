# Tekst layout voor bijbelcursussen.nl

Dit document beschrijft de [MarkDown](https://en.wikipedia.org/wiki/Markdown blank) opmaak taal zoals deze gebruikt kan worden binnen de editor van bijbelcursussen.nl. De editor ondersteunt de meeste standaard MarkDown, maar kent ook enkele specifieke uitbreidingen.

Naast deze uitleg kan het ook nuttig zijn om de [basis syntax](https://www.markdownguide.org/basic-syntax blank) en [extended syntax](https://www.markdownguide.org/extended-syntax blank) pagina's van markdownguide.org te bekijken.

## Paragraaf

Een paragraaf is niet anders dan een blok met tekst, vooraf gegaan en afgesloten door een lege regel.

Binnen MarkDown is er geen standaard die bepaalt hoe er een lijn afbreking word opgegaan.
Om het zo eenvoudig mogelijk te maken, is er voor bijbelcursussen.nl gekozen om een enter gebruiken.

Voor de leesbaarheid en de beste consistentie is het overigens **sterk** aanbevolen alleen paragraven te gebruiken.

### Uitlijnen

Om paragraven te kunnen kan er een speciaal commando aan het begin worden gegeven. Door de gebruikt de maken `[right]` of `[center]` kan rechts dan wel gecentreerd worden uitegelijnd. Om te tekst volledige uit te vullen kan `[justify]` worden gebruikt.

***let op***, Dit zijn geen standaaard opties binnen MarkDown.

#### Voorbeelden

[right]Zijn liefde deed Hem afdalen naar deze zondige aarde. Wij kunnen ons niet voorstellen wat een enorme stap omlaag dat voor Hem was. De Zoon van God kwam als Mens op deze aarde. Hij werd als baby geboren in een stal en werd te slapen gelegd in een voerbak voor de dieren. We kunnen ons totaal niet voorstellen wat het betekent om als volmaakt heilig en zuiver mens te gaan leven in een totaal door de zonde bedorven wereld. We kunnen absoluut niet begrijpen wat het Hem, die zo rijk was, kostte om zo arm te worden!

[center]Toen ging Hij er, net als de herder in het verhaal, op uit om het verloren schaap te zoeken. Regelmatig zegt Hij: ‘Ik, de Mensenzoon, ben gekomen om afgedwaalde (of verloren) mensen te zoeken en te redden’. De mensen verwerpen Hem, maar Hij gaat door met zoeken. De godsdienstige leiders vervolgen Hem, maar Hij blijft zoeken. Zelfs zijn vrienden verlaten Hem, maar Hij blijft verloren mensen zoeken. Hij wordt niet ontmoedigd. Hij geeft het niet op. Hij is vastbesloten om zijn doel te bereiken en het verloren schaap te vinden.

[justify]Nu stuurt de goede Herder het goede nieuws naar iedereen op de wereld. Als er ergens een schuldige en verloren zondaar zich wil bekeren van zijn zonden en in geloof de Here Jezus wil ontvangen als zijn Meester en Redder, dan wordt hij gered. Dan worden zijn zonden hem vergeven. Dan ontvangt hij van God eeuwig leven, als vrij kado (Romeinen 6:23).  Dat gebeurt wanneer de Here ons vindt, op het moment dat wij tot Hem roepen: ‘Here, red mij’.

## Nadruk

Om nadruk te leggen binnen een tekst kunnen **asteriks** worden gebruikt, gebruik: `**vet**` of `*cursief*`. Dit zorgt er voor dat de tekst respectievelijk **vet** of *cursief* word. **vet** en *cursief* zijn ook samen gebruik voor nog meer ***nadruk***.

Naast het gebruik van asteriks is het ook mogelijk om liggende streepjes te gebruiken voor __vet__ en _cursief_: `__vet__` of `_cursief_`. Hoewel het aanbevolen is alleen de asteriks te gebruiken vanwege compabiliteit, kunnen underscores wel gebruikt worden om *binnen cursief slecht alleen een deel __vet__ te markeren* or **binnen vet alleen een deel _cursief_ te markeren**

## Lijsten

Het is eenvoudig om lijstjes in het document te gebruiken. Een ongenummerde lijst is niets anders dan een blok waarvan elke regel begint met een -. Voor genummerde lijstje nummer ze met 1. , 2. , 3. etc.. Een sublijstje maken kan eenvoudig door in te springen met 3 spaties.

#### Voorbeeld

De meeste lessen bestaan uit de volgende indeling:

- De tekst uit het boek Seksuele Afgoderij
- Getuigenis met een vraag
- Video deel (Het zijn twee lezingen per hoofdstuk)
   - deel 1 met vragen
   - deel 2 met vragen
- Persoonlijke vragen

Als christelijke kerk hebben we onze feestdagen. Soms hebben deze dagen een ernstig karakter, soms een vreugdevol. In het Oude Testament kende men ook feestdagen. Israël had zeven hoogtijdagen. Zij worden allemaal genoemd in leviticus 23. Dit zijn de gezette hoogtijden van de Heere; niet van de Joden, maar van de Heere! ‘Mijn feestdagen’, zegt de Heere.

1. Pascha (werd gevierd in Jeruzalem)
2. Feest van de ongezuurde broden
3. Eerstelinggarven
4. Wekenfeest (werd gevierd in Jeruzalem)
5. Nieuwjaarsdag (het zgn. Feest van het geklank)
6. Grote Verzoendag
   1. Deel 1
   2. Deel 2
7. Loofhuttenfeest (werd gevierd in Jeruzalem)

## Quote

Om een tekst te qouten en daar nadruk op te leggen, dan van een zogemaande blockqoute worden gebruik gemaakt. Plaats een > (groter dan teken) aan het begin van paragraaf om een quote te krijgen.

>De vraag 'waarom gebeurd dit in mijn leven?' is een totaal irrelevante vraag. Of wij begrijpen het antwoorden niet omdat Gods wegen hoger zijn dan die van ons. Of wij raken compleet in de war van wat ons allemaal te nog wachten staat.

## Koppen

Een kop kan gebruikt word om structuur in een document aan te brengen. Een kop moet altijd vooraf gegaan worden door een lege regel (behalve aan het begin van het document) en er na moet altijd een lege regel komen.

Er zijn 6 niveau's van koppen. Hoe hoger het niveaum des te groter het van letter van kop. Niveau 1 is het hoogste niveau.

Op een kop van niveau 1 gebruiken voldoet een # dan een spatie en dan de titel van de kop.

`# Kop 1`

Voor niveau 2, gebruik ##, voor 3 ##, etc.

### Alternatieve kop

Voor niveau 1 en niveau 2 is er een alternatieve notatie. In plaats van een # gebruiken, dient er op de volgende regel de tekens = of - (voor niveau 1 en niveau 2 respectievelijk). Zie de kop van het onderwerp **links** vor een voorbeeld.

Links
-----

Links kunnen gebruikt worden om de gebruiker naar een andere pagina laten gaan. De algemene syntax is:

`[titel](url)`

#### Voorbeeld

De grote kerkhistoricus [Philip Schaff](https://en.wikipedia.org/wiki/Philip_Schaff) schrijft dat rond het begin van de christelijke jaartelling de hele bewoonde wereld was voorbereid op de komst van Christus. De Joodse godsdienst, de Griekse beschaving en de Romeinse wereldmacht maakten het mogelijk dat het evangelie zich snel verspreidde en overal werd gehoord.

### Tootlips

Door "willekeurige tekst" toevoegen na de url (scheiden door een sptatie krijgt de gebruiker een tooltip te zien als hij met zijn muis over de afbeelding gaat.

#### Voorbeeld

De andere groep zijn de [Farizeeërs](https://nl.wikipedia.org/wiki/Farizeeën "Lees meer op Wikipedia") (de meest strenge Joodse godsdienstige sekte) en de Bijbelgeleerden (de makers en uitleggers van de Joodse wetten). Deze mensen zullen nooit erkennen dat zij zondaars zijn. Het schaap, wat verdwaald is, staat voor de tolontvangers en de zondaars.

### Open op andere tabblad

Soms is het wenselijk dat de link word geopend op een ander tab, bijvoorbeeld omdat naar een andere website te verwijzen. Dit kan eenvoudig door na de url of de tooltip de term  `blank` toe toevoegen:

#### Voorbeeld

In zijn toespraak tot koning [Agrippa](https://nl.wikipedia.org/wiki/Herodes_Agrippa_I blank) noemt hij de al vervulde profetieën uit het Oude Testament als het bewijs dat Jezus de beloofde Messias is (Handelingen 26:22-27).

***let op,*** er dient altijd een spatie zitten de url, blank en tooltop! Deze optie is geen standaaard binnen MarkDown.

### Linken binnen de pagina

Behalve linken naar andere pagina's is het ook mogelijk een link te maken naar een kop binnen het document zelf. Om dit te laten werken moet een kop een speciale identifier bevatten. Zie de uitleg over de [koppen](#koppen) voor meer informatie.

#### Voorbeeld

Het christelijk geloof is volledig gebaseerd op historische feiten. Zij staan daarin zelfs centraal. Voor een kort overizcht kun je kijken bij [Feiten](#fieten)

## Afbeeldingen {#afbeeldingen}

Afbeeldingen werken een beetje hetzelfde als hyperlinks. De algemene syntax is:

`![alt-text](bron van de afbeelding)`

De *bron van de afbeelding* dient een url te zijn bijvoorbeeld [https://api.bijbelcursussen.com/content/download/public/een-God-een-weg/natuur.jpg](https://api.bijbelcursussen.com/content/download/public/een-God-een-weg/natuur.jpg). De editor zal ondersteuning geven bij het invoegen van afbeelding die opgeslagen zijn binnen het system.

De *alt-text* zal worden weergeven door de browser als de afbeeldingen niet geladen kan worden

#### Voorbeeld

Dit is een van de meest geliefde verhalen voor christenen - Het verloren schaap. Een herder heeft honderd schapen. ![Kude met schapen](https://api.bijbelcursussen.com/content/download/public/geboren-om-te-winnen/lost-sheep1.jpg)

Als er geen extra informatie word opgegeven dan zal de afbeelding altijd de volledige grote van de pagina beslaan. Deze manier heeft de voorkeur zodat het op alle schermen goed gaat.

### Tooltip

Net als bij de links is het mogelijk een tooltip te gebruiken. Deze tooltip is niet verplicht en hoeft ook niet het zelfde te zijn als de alt-text.

#### Voorbeeld

 Zo laat de wereld en alles wat daarin is, de scheppende en ordenende kracht van God zien.. ![Berglandschap](https://api.bijbelcursussen.com/content/download/public/een-God-een-weg/natuur.jpg "De scheppende en ordenende kracht van God")

### Breedte van de afbeelding

De standaard **breedte** van de afbdeelding 100%, maar elk percentage tussen 0 en 100 mag. Voeg gewoon een getal in en afbeelding word geschaald.

#### Voorbeeld

![Hedder met schaap](https://api.bijbelcursussen.com/content/download/public/geboren-om-te-winnen/lost-sheep3.jpg 25)

***let op***, er dient altijd een spatie zitten de url, blank en tooltop! Dit is geen standaaard optie binnen MarkDown.

### Uitlijning

Bij een breedte anders dan 100% is het ook mogelijk de uitlijning te bepalen. Gebruik **left**, of **right** om de afbeelding uit te lijnen en de tekst er om heen te laten lopen.

Soms is het voor de leesbaarheid nodig om een harde break te forceren, bijvoorbeeld bij een kop, of omdat de volgende paragraaf niet op de afbeelding slaat. In deze gevallen kan het commando `[clear]` gebruiken.

#### Voorbeeld

![Hedder met schaap](https://api.bijbelcursussen.com/content/download/public/geboren-om-te-winnen/lost-sheep3.jpg "De Hedder draagt zijn schaap" right 25)

Als Jezus dit verhaal vertelt, heeft hij twee groepen in gedachten. De tolontvangers (of belastingontvangers) en zondaars (oftewel: slechte mensen). Deze mensen weten dat ze verloren zijn. De andere groep zijn de Farizeeërs (de meest strenge Joodse godsdienstige sekte) en de Bijbelgeleerden (de makers en uitleggers van de Joodse wetten).

[clear]

## Links & afbeeldingen

Het is mogelijk om Links en afbeelding te combineren. Voeg eenvoudigweg op de plek van de title in de link de afbeelding in. Ook de verschillende opties die link en afbeelding kennen zijn te gebruiken.

#### Voorbeeld

[![Hedder met schaap](https://api.bijbelcursussen.com/content/download/public/geboren-om-te-winnen/lost-sheep3.jpg 25)](https://nl.wikipedia.org/wiki/Gelijkenis_van_de_verloren_zoon)

## Video's

Het is heel eenvoudig om een video's in te voegen. Gebruik dezelfde syntax als voor links en voeg na de url het woord video toe:

`[titel](url video)`

Er zal automatisch gedetecteerd worden of het video van Youtube, Vimeo of een andere bron (mp4) betreft. Voor youtube en vimeo gebruik de gewone link, het gebruik van de embedded link of code is niet nodig.

***let op***, Dit is geen standaaard optie binnen MarkDown.

#### Voorbeeld - Youtube

[Een waarheid die ons leven verandert](https://youtu.be/QXdmxl1RWZo video)

#### Voorbeeld - MP4

[Dit is een MP4 Video](http://clips.vorwaerts-gmbh.de/VfE_html5.mp4 video)

## Voetnoten

Het is ook mogelijk met voetnoten te werken. voor elke voetnoot is een uniek label nodig. Elke voetnoot bestaat uit twee delen. In de tekst kan een referentie worden opgenomen en de voetnoot zelf kan op een andere plek in het document getoond worden.

`referentie: [^label]`

`voetnoot: [^label]:`

De label mag elke waarde hebben zolangs er alleen maar gebruik gemaakt worden van letters (a-z), cijfers (0-9), de undescore (_) of het strepjes (-). Labels voor voetnoten moeten uniek zijn, maar er mag wel vaker naar verwezen worden.

***let op***, Dit is geen standaaard optie binnen MarkDown.

#### Voorbeeld

Alle mensen op de wereld stellen deze vraag[^vraag]. Ze vroegen[^vraag] het toen Hij op aarde[^aarde] was. Ze vroegen[^vraag] het alle eeuwen erna. Ze vragen[^vraag] het nog steeds. Het is inderdaad de belangrijkste vraag[^vraag], die een mens kan stellen.

----

[^label]: Voetnoten in code worden op dit moment nog meegesteld. In de praktijk zal dit echter niet gebruikt worden.

[^vraag]: dat is wel veel gevraagd zeg.

[^aarde]: Voetnoten kunnen over meerdere alinea's verdeelt worden

    Zolang de volgende alinea met 4 spaties word uitgelijnd.

    Zal dit netjes worden weergeven.

En dit is de afsluitende regel.

## Verzen

Net zoals in de huidige website worden verzen automatisch herkent. Met zelfde regels en opties. In dit voorbeeld zijn alleen de teksten gehighlight, in de website versie worden ze klikbaar.

***let op***, Dit is geen standaaard optie binnen MarkDown.

#### Voorbeeld

Alle mensen op de wereld stellen deze vraag. Ze vroegen het toen Hij op aarde was. Ze vroegen het alle eeuwen erna. Ze vragen het nog steeds. Het is inderdaad de belangrijkste vraag, die een mens kan stellen.

Toen Zijn eerste volgelingen zagen wat Jezus deed, vroegen ze zich onder elkaar af, wie Hij wel kon zijn. ‘Wie is Deze toch, dat zelfs de wind en de zee Hem gehoorzaam zijn?’ (Markus 4:41). De religieuze leiders van die tijd, die Hem haatten, vroegen zich hardop af: ‘Wie is deze Man, die godslastering spreekt? Wie kan zonden vergeven dan God alleen?’ (Lukas 5:21). Zelfs nadat Hij drie en een half jaar door het land gereisd en overal gepredikt had, vroegen de mensen nog: ‘Wie is Dat?’ (Mattheüs 21:10).

Wie is Jezus? Hoe we de vraag voor onszelf beantwoorden, bepaalt ons leven. Vier evangeliebeschrijvingen beantwoorden deze vraag. Als jij die verslagen aandachtig doorleest, erover nadenkt en je door de waarheid en betrouwbaarheid ervan laat overtuigen, verandert je leven. ‘Jezus nu heeft in aanwezigheid van Zijn discipelen nog wel veel andere tekenen gedaan, die niet beschreven zijn in dit boek, maar deze zijn beschreven, opdat u gelooft dat Jezus de Christus is, de Zoon van God, en opdat u, door te geloven, het leven zult hebben in Zijn Naam’ (Johannes 20:30,31).
In deze cursus bestuderen we wat de Bijbel zegt over Jezus.

## Tabellen

Om eem tabel toe te voegen, gebruik 3 of meer streepjes (---) om voor elke kolom een kop te maken en maak gebruik van pipes (|) om kolommen te maken. Voor compabilitiet sluit een kolom weer af met een pipe.

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

De cell breedte is variable, zoals getoond hier onder, maar hoe het er uit ziet blijft gelijk.

| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |

Om dat het werken met tabellen soms omslachtig kan zijn, is er een tabellen generator beschikbaar in editor.

### Uitlijnen

Je kunt de tekst in een kolom, links, recht of in het midden uitlijnen door een dubbele punt toe voegen (:) aan de linker, rechter on beide zijdes van de streepjes in de kop regel.

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |


### Volledige kop

Tot slot is het mogelijk om kop de volledige breedte van table te laten gebruiken door voor de kop slechts 1 kolom te gebruiken

| Hebreuwse titel                      |
| :------: | :----------: | :--------: |
| Algemeen | Omschrijvend | Specifiek  |
| Elhomin  | Adonai       | Jahweh     |
| 2250     | 340          | 6832       |