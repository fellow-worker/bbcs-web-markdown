# Tekst layout voor bijbelcursussen.nl

## Koppen



## Links

Met een link kun je de gebruiker naar een andere pagina laten gaan. De algemene syntax is:

`[titel](url)`

#### Voorbeeld

De grote kerkhistoricus [Philip Schaff](https://en.wikipedia.org/wiki/Philip_Schaff) schrijft dat rond het begin van de christelijke jaartelling de hele bewoonde wereld was voorbereid op de komst van Christus. De Joodse godsdienst, de Griekse beschaving en de Romeinse wereldmacht maakten het mogelijk dat het evangelie zich snel verspreidde en overal werd gehoord.

### Tootlips

Door "willekeurige tekst" toevoegen na de url (scheiden door een sptatie krijgt de gebruiker een tooltip te zien als hij met zijn muis over de afbeelding gaat.

#### Voorbeeld

De andere groep zijn de [Farizeeërs](https://nl.wikipedia.org/wiki/Farizeeën "Lees meer op Wikipedia") (de meest strenge Joodse godsdienstige sekte) en de Bijbelgeleerden (de makers en uitleggers van de Joodse wetten). Deze mensen zullen nooit erkennen dat zij zondaars zijn. Het schaap, wat verdwaald is, staat voor de tolontvangers en de zondaars.

### Open op andere tabblad

Soms is het wenselijk dat de link word geopend op een ander tab, bijvoorbeeld omdat je naar een andere website wilt verwijzen. Dit kan eenvoudig door na de url of de tooltip het woordje blank toe toevoegen:

#### Voorbeeld

In zijn toespraak tot koning [Agrippa](https://nl.wikipedia.org/wiki/Herodes_Agrippa_I blank) noemt hij de al vervulde profetieën uit het Oude Testament als het bewijs dat Jezus de beloofde Messias is (Handelingen 26:22-27).

***let op***, er dient altijd een spatie zitten de url, blank en tooltop! Deze optie is geen standaaard binnen MarkDown.

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

![Hedder met schaap](https://api.bijbelcursussen.com/content/download/public/geboren-om-te-winnen/lost-sheep3.jpg 50)

***let op***, er dient altijd een spatie zitten de url, blank en tooltop! Dit is geen standaaard optie binnen MarkDown.

### Uitlijning

Bij een breedte anders dan 100% kun je ook nog de uitlijning bepalen. Gebruik **left**, of **right** om de afbeelding uit te lijnen en de tekst er om heen te laten lopen.

Soms is het voor de leesbaarheid nodig om een harde break te forceren, bijvoorbeeld bij een kop, of omdat de volgende paragraaf niet op de afbeelding slaat. In deze gevallen kun je commando `[clear]` gebruiken.

#### Voorbeeld

![Hedder met schaap](https://api.bijbelcursussen.com/content/download/public/geboren-om-te-winnen/lost-sheep3.jpg "De Hedder draagt zijn schaap" right 50)

Als Jezus dit verhaal vertelt, heeft hij twee groepen in gedachten. De tolontvangers (of belastingontvangers) en zondaars (oftewel: slechte mensen). Deze mensen weten dat ze verloren zijn. De andere groep zijn de Farizeeërs (de meest strenge Joodse godsdienstige sekte) en de Bijbelgeleerden (de makers en uitleggers van de Joodse wetten).

[clear]

## Links & afbeeldingen

Het is mogelijk om Links en afbeelding te combineren.