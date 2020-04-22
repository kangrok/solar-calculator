## Päeva pikkuse kalkulaator

https://kangrok.github.io/solar-calculator/

Tegu on lihtsa veebirakendusega, mis leiab päikesetõusu ja -loojangu aja kasutaja valitud kuupäeval ja kohas. Lisaks leiab kalkulaator päeva pikkuse ning võimaldab näha graafikut päeva pikkuse muutumise kohta valitud ajaperioodil.

### 1. Kalkulaator

Kalkulaatori lehel on võimalik sisestada asukoht käsitsi või valida see kaardil vastavasse kohta hiirega vajutades. Laiuskraadid on vahemikus -90 kraadi ja 90 kraadi (lõunapoolkeral negatiivne, põhjapoolkeral positiivne), pikkuskraadid on vahemikus -180 ja 180 kraadi (idapoolkeral negatiivne, läänepoolkeral positiivne).

Kui asukoha ja kuupäeva valik on tehtud, saab tulemust näha vajutades nuppu "Calculate".

Kui kasutaja on valinud ala ja kuupäeva, mil on parajasti polaarpäev või -öö, siis teavitatakse teda ning päikesetõusu ja -loojangu aega ei kuvata, kuna antud kuupäeval neid ei toimu.

### 2. Graafik

Nagu ka kalkulaatoris, saab kasutaja graafiku lehel sisestada asukoha ettenähtud väljadele või valida selle kaardilt.

Kui asukoha ja kuupäevade vahemiku valikuga ollakse rahul, tuleb vajutada nuppu "Update chart", nägemaks tulemust.

### Töö kulg

Proovitöö jaoks kulus kokku umbes 15 tundi. Sellest suurem osa kulus vigaste väljundite parandamisele ja kasutatud komponentide (suncalc, leaflet, chartjs jms) dokumentatsiooni lugemisele.

Kõige suuremaks raskuseks osutus polaarsündmustega arvestamine ja nende (eriti piirijuhtude) korrektselt määramine. Kui tuvastasin, et tegu on polaarsündmusega (päeva pikkus ei tulnud arv), proovisin sündmuse liiki määrata algul maa poolkera ja aastaaja järgi. Piirjuhtudel see sageli ebaõnnestus, seega lõpuks liigitasin sündmuse päikese kõrguse (altituudi) järgi.

Lahendamata jäi polaarsündmuste alguse ja lõpu leidmine. Hetkel öeldakse neil juhtudel lihtsalt, et tegu on polaarööga või polaarpäevaga ning päikesetõusu ja -loojangut sel päeval ei toimu, isegi kui polaarsündmust alustav või lõpetav päikesetõus või -loojang leiab aset. Tegelikult tuvastan programmis piiripäevad küll, aga täpne päeva pikkuse arvutamine ja tõusu ning loojangu väljastamine on puudu. Viimast saaks lihtsalt teha suncalc teegi abil, päeva pikkuse leidmiseks tuleb asju vastavalt 24h-st lahutada. Kahjuks jäi aega väheks.

Probleemide korral sain abi dokumentatsioonist ja foorumitest, kus inimestel olid sarnased mured. Püüdsin kasutada ideid, mitte kopeerida koodi. Kogu kopeeritud koodile (üldiselt CSS jms) peaks olema kommentaarides viidatud.
